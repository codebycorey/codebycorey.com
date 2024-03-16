import fs from 'fs';
import path from 'path';

import readingTime, { ReadTimeResults } from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ReactElement } from 'react';

const root = process.cwd();
const contentPath = path.join(root, '_content');

export type MdxCompiledFrontMatter = {
  title: string;
  brief: string;
  date: string;
};

export type MdxFrontMatter = MdxCompiledFrontMatter & {
  slug: string;
  readingTime: ReadTimeResults;
};

export type MdxFile = {
  content: ReactElement;
  frontmatter: MdxFrontMatter;
};

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

  const { content, frontmatter } = await compileMDX<MdxCompiledFrontMatter>({
    source,
    options: { parseFrontmatter: true },
  });

  const readingStats = readingTime(source);

  return {
    content,
    frontmatter: {
      ...frontmatter,
      readingTime: readingStats,
      slug,
    },
  };
}

export async function getAllFilesByType(
  type: MdxContentType
): Promise<MdxFile[]> {
  const files = getFiles(type);

  return Promise.all(
    files.slice(0, 1).map((fileName) => {
      return getFileBySlug(type, fileName.replace('.mdx', ''));
    })
  );
}

export function getAllBlogPosts(): Promise<MdxFile[]> {
  return getAllFilesByType(MdxContentType.BLOG);
}
