'use server';

import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

import readingTime from 'reading-time';
import { fuzzySearch } from './search';
import {
  BlogFile,
  BlogMetadata,
  MdxContentType,
  MdxFile,
  MdxFrontmatter,
  OrderType,
} from '@/types/mdx.types';

const root = process.cwd();
const contentPath = path.join(root, '_content');

function getFiles(type: MdxContentType): string[] {
  return fs.readdirSync(path.join(contentPath, type));
}

function getFile(type: string, fileName: string): string {
  return fs.readFileSync(path.join(contentPath, type, fileName), 'utf8');
}

function parseFrontmatter(source: string): {
  content: string;
  frontmatter: MdxFrontmatter;
} {
  const frontMatterPattern = /^---\n([\s\S]*?)\n---\n/;

  const frontmatterMatch = frontMatterPattern.exec(source)![1].trim();
  const content = source.replace(frontMatterPattern, '').trim();

  const frontmatter = frontmatterMatch
    .split('\n')
    .reduce((acc: Partial<MdxFrontmatter>, line) => {
      const [key, ...value] = line.split(': ').map((x) => x.trim());
      acc[key.trim() as keyof MdxFrontmatter] = value
        .join(': ')
        .replace(/^['"](.*)['"]$/, '$1');
      return acc;
    }, {}) as MdxFrontmatter;

  return {
    content,
    frontmatter,
  };
}

function getFileBySlug(type: MdxContentType, slug: string): MdxFile {
  const source = getFile(type, `${slug}.mdx`);

  const { content, frontmatter } = parseFrontmatter(source);

  return {
    content,
    metadata: {
      ...frontmatter,
      slug,
    },
  };
}

function getAllFilesByType(type: MdxContentType): MdxFile[] {
  const files = getFiles(type);

  return files.map((fileName) =>
    getFileBySlug(type, fileName.replace('.mdx', ''))
  );
}

export async function getBlogPostMetadata(
  file: MdxFile
): Promise<BlogMetadata> {
  const readingStats = readingTime(file.content);
  const date = format(file.metadata.date, 'MMMM dd, yyyy');
  return {
    ...file.metadata,
    readingTime: readingStats,
    viewCount: 0,
    formattedDate: date,
  };
}

export async function getAllBlogPosts(): Promise<BlogFile[]> {
  const files = getAllFilesByType(MdxContentType.BLOG);
  return Promise.all(
    files.map(async (file) => {
      const metadata = await getBlogPostMetadata(file);
      return {
        ...file,
        metadata,
      };
    })
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogFile | undefined> {
  const file = getFileBySlug(MdxContentType.BLOG, slug);
  if (file) {
    const metadata = await getBlogPostMetadata(file);
    return {
      ...file,
      metadata,
    };
  }
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
