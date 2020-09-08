// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

// import BlogPost, { defaultBlogPost } from '../models/BlogPost';

const query: string = `
{
  user(username: "CodeByCorey") {
    publication {
      posts(page: 0) {
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

export const fetchPosts = async () => {
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

