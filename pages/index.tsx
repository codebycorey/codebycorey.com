import { useState } from 'react';

import Layout from '@components/layout';
import { fetchMultiplePagesOfPosts } from '@lib/posts';
import { frontMatter as blogPosts } from './blog/**/*.mdx';
import Link from 'next/link';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const posts = blogPosts;

  return (
    <Layout home>
      <div className={`w-full md:h-screen flex flex-wrap text-lg ${darkMode ? 'dark' : ''}`}>
        <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 w-full md:w-7/12 h-full flex flex-wrap content-between justify-between items-between p-10">
          <div className="w-full flex justify-between">
            <div className="text-2xl md:text-4xl font-light">Corey O'Donnell</div>
            <div>
              {darkMode ? (
                <button onClick={() => setDarkMode(!darkMode)} aria-label="Dark mode toggle">
                  <svg className="w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
              ) : (
                <button onClick={() => setDarkMode(!darkMode)} aria-label="Dark mode toggle">
                  <svg className="w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-4xl lg:text-8xl my-10 md:my-0 font-light leading-tight tracking-wider uppercase">
              Full-Stack <br />
              Web Developer
            </h1>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full flex flex-wrap justify-between">
              <div className="w-full md:w-1/2 mb-10 md:mb-0 font-light">
                <h2 className="font-bold">About</h2>
                <p className="leading-snug">
                  My name is Corey O'Donnell and I am a full-stack web developer. The tech stack I primarily work with is TypeScript, React.js,
                  Node.js, and Python. I love spending my free time learning new things and improving myself. My son and my wife are my everything. I
                  have a weird obsession for houseplants and always looking to increase my collection.
                </p>
              </div>
              <div className="mr-24 font-light">
                <ul className="list-none p-0 flex flex-col text-left">
                  <li className="font-bold">
                    <h2>Links</h2>
                  </li>
                  <li>
                    <Link href="/blog">
                      <a className="inline-block text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 no-underline">Blog</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/CodeByCorey"
                      className="inline-block text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/CodeByCorey"
                      className="inline-block text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/CodeByCorey"
                      className="inline-block text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dev.to/codebycorey"
                      className="inline-block text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Dev.to
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full mt-10 font-thin hidden md:block">© 2020 Corey O'Donnell. All Rights Reserved.</div>
          </div>
        </div>
        <div className="w-full md:w-5/12 h-full bg-gray-900 text-gray-100 md:border-l-2 border-gray-100 dark:border-gray-700 p-5 md:overflow-y-scroll">
          <h2 className="m-5 text-4xl font-light">Recent Blog Posts</h2>
          {posts.map((post: any) => (
            <Link key={post.title} href={`blog/${post.__resourcePath.replace('blog/', '').replace('.mdx', '')}`}>
              <a className="mx-5 my-12 pb-10 block">
                <h3 className="text-2xl font-bold mb-5 leading-snug">{post.title}</h3>
                <p className="font-light leading-snug">{post.brief}</p>
              </a>
            </Link>
          ))}
          <div className="w-full text-center font-thin md:hidden">© 2020 Corey O'Donnell. All Rights Reserved.</div>
        </div>
      </div>
    </Layout>
  );
}
