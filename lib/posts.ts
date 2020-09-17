// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

// import BlogPost, { defaultBlogPost } from '../models/BlogPost';

const queryTemplate: string = `
{
  user(username: "CodeByCorey") {
    publication {
      posts(page: { PAGE_NUMBER }) {
        slug
        title
        brief
        coverImage
        replyCount
        totalReactions
      }
    }
  }
}
`

export const fetchThreeMostRecentPosts = async() => {
  const posts = await fetchPosts();
  return posts.slice(0, 3);
}

export const fetchMultiplePagesOfPosts = async() => {
  let posts: any[] = [];
  for (let i = 0; i < 2; i++) {
    const fetched = await fetchPosts(i);
    posts = [...posts, ...fetched];
  }
  return posts;
}

export const fetchPosts = async (page: number = 0) => {
  const query: string = queryTemplate.replace('{ PAGE_NUMBER }', page.toString());
  const resp: Response = await fetch('https://api.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
  const hashnodeResponse = await resp.json();
  return hashnodeResponse.data.user.publication.posts;
}

