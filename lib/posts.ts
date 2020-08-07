import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import BlogPost, { defaultBlogPost } from '../models/BlogPost';

const postDirectory: string = path.join(process.cwd(), '_posts');

export const getAllPosts = (): BlogPost[] => {
  const fileNames: string[] = fs.readdirSync(postDirectory);

  const allPosts: BlogPost[] = fileNames.map((fileName) => {
    const slug: string = fileName.replace(/\.md$/, '');
    return getPostBySlug(slug);
  });
  return sortByDate(allPosts);
};

export const getAllPostSlugs = (): string[] => {
  const fileNames: string[] = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
};

export const getPostBySlug = (slug: string): BlogPost => {
  const fullPath = path.join(postDirectory, `${slug}.md`);
  const postContents: string = fs.readFileSync(fullPath, 'utf8');
  const { content, data }: matter.GrayMatterFile<string> = matter(postContents);
  return {
    ...defaultBlogPost,
    slug,
    content,
    ...data
  };
};

const sortByDate = (articles: BlogPost[]): BlogPost[] => {
  return articles.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
