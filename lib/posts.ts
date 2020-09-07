import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import BlogPost, { defaultBlogPost } from '../models/BlogPost';

const query: string = `
{
  user(username:"CodeByCorey") {
    publication {
      posts(page:0) {
        title
        brief
        slug
        coverImage
        replyCount
        totalReactions
      }
    }
  }
}
`

export const fetchPosts = async (): Promise<any> => {
  const resp = await fetch('https://api.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const respJson = await resp.json();
  return respJson.data.user.publication.posts.slice(0, 3);
}

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
