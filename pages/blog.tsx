import { FC } from 'react';
import Navbar from '../components/navbar';

import { frontMatter as blogPosts } from './blog/**/*.mdx';
// console.log('frontMatter', blogPosts);
const BlogIndex: FC = () => {
  const sorted = blogPosts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  return (
    <div>
      <Navbar />
      <h1>Blog</h1>
      <p>Overview descriptions</p>
      <input type="text" placeholder="Search Articles" />
      <h2>Featured</h2>
      <h2>All Posts</h2>
      {sorted.map((post) => (
        <div key={post.title}>
          <h3>{post.title}</h3>
          <p>{post.brief}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogIndex;
