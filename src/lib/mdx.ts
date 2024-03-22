import fs from 'fs';
import path from 'path';

import readingTime, { ReadTimeResults } from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ReactElement } from 'react';
import { fuzzySearch } from './search';

const root = process.cwd();
const contentPath = path.join(root, '_content');

export type MdxCompiledMetadata = {
  title: string;
  brief: string;
  date: string;
  slug: string;
};

export type BlogMetadata = MdxCompiledMetadata & {
  readingTime: ReadTimeResults;
  viewCount: number;
};

export type MdxFile<
  Metadata extends MdxCompiledMetadata = MdxCompiledMetadata,
> = {
  source: string;
  content: ReactElement;
  metadata: Metadata;
};

export type BlogFile = MdxFile<BlogMetadata>;

export enum MdxContentType {
  BLOG = 'blog',
}

export function getFiles(type: MdxContentType) {
  return fs.readdirSync(path.join(contentPath, type));
}

export function getFile(type: string, fileName: string) {
  return fs.readFileSync(path.join(contentPath, type, fileName), 'utf8');
}

export async function getFileBySlug(
  type: MdxContentType,
  slug: string
): Promise<MdxFile> {
  const source = getFile(type, `${slug}.mdx`);

  const { content, frontmatter } = await compileMDX<MdxCompiledMetadata>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    source,
    content,
    metadata: {
      ...frontmatter,
      slug,
    },
  };
}

export async function getAllFilesByType(
  type: MdxContentType
): Promise<MdxFile[]> {
  const files = getFiles(type);

  return Promise.all(
    files.map((fileName) => {
      return getFileBySlug(type, fileName.replace('.mdx', ''));
    })
  );
}

export async function getAllBlogPosts(): Promise<BlogFile[]> {
  const files = await getAllFilesByType(MdxContentType.BLOG);
  return Promise.all(
    files.map((file) => {
      const readingStats = readingTime(file.source);
      return {
        ...file,
        metadata: {
          ...file.metadata,
          readingTime: readingStats,
          viewCount: 0,
        },
      };
    })
  );
}

export enum OrderType {
  DATE = 'date',
  VIEW_COUNT = 'viewCount',
}

const sortPostsBy = (orderType: OrderType) => {
  return (a: BlogFile, b: BlogFile) => {
    if (orderType === OrderType.DATE) {
      return (
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
      );
    }
    return b.metadata.viewCount - a.metadata.viewCount;
  };
};

export async function getOrderedBlogPosts(
  orderType: OrderType = OrderType.DATE
): Promise<BlogFile[]> {
  const posts = await getAllBlogPosts();
  return posts.sort(sortPostsBy(orderType));
}

export async function getOrderedAndFilteredBlogPosts({
  orderType = OrderType.DATE,
  query,
}: {
  orderType?: OrderType;
  query?: string;
}): Promise<BlogFile[]> {
  let posts = await getAllBlogPosts();

  if (query) {
    posts = posts.filter((post) => {
      return fuzzySearch(query, post.metadata.title);
    });
  }
  return posts.sort(sortPostsBy(orderType));
}
