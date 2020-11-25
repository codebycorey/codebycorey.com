import { FC } from 'react';

import Layout from '@components/layout';
import BlogLink from '@components/blog-link';

import { frontMatter as blogPosts } from './blog/**/*.mdx';
// console.log('frontMatter', blogPosts);
const BlogIndex: FC = () => {
  const sorted = blogPosts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  return (
    <Layout>
      <div className="max-w-screen-md mx-auto flex flex-col justify-center align-middle p-6">
        <h1 className="text-8xl mb-6">Blog</h1>
        <p className="my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quidem veritatis earum, iure adipisci asperiores voluptatem ipsum doloribus
          odio doloremque beatae praesentium excepturi repudiandae neque fugit autem corporis laborum aut.
        </p>
        <div>
          <div className="my-2 relative rounded-md shadow-sm">
            <input
              type="text"
              id="account_number"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search Articles"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-5xl my-6">All Posts</h2>
        {sorted.map((post) => (
          <BlogLink key={post.title} blog={post} />
        ))}
      </div>
    </Layout>
  );
};

export default BlogIndex;
