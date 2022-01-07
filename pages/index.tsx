import { FC } from 'react';

import Layout from '@components/layout/Layout';
import ThemeSwitcher from '@components/ThemeSwitcher';
import Link from 'next/link';
import { MdxFrontMatter } from '@models/MdxFrontMatter';
import { getAllFilesFrontMatter } from '@lib/mdx';
import { GetStaticProps } from 'next';
import { Sidebar } from '@components/layout/intrinsic/sidebar';

interface HomeProps {
  posts: MdxFrontMatter[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const files: MdxFrontMatter[] = await getAllFilesFrontMatter('blog');
  const posts = files.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return { props: { posts } };
};

const Home: FC<HomeProps> = ({ posts }) => {
  const postsOrdered = posts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return (
    <Layout home>
      <Sidebar side="right">
        <div className="md:h-screen text-lg bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 h-full flex flex-wrap content-between justify-between items-between p-10">
          <div className="w-full flex justify-between">
            <div className="text-2xl md:text-3xl font-light">codebycorey</div>
            <div>
              <ThemeSwitcher />
            </div>
          </div>
          <div className="w-full">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-blue-700 dark:from-blue-500 to-green-500 text-4xl lg:text-8xl my-10 md:my-0 py-2 font-bold ">
              {"Corey O'Donnell"}
            </h1>
            <p className="text-xl md:text-3xl my-10 md:mb-0 md:mt-6 leading-tight tracking-wider">
              Web Developer
            </p>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full flex flex-wrap justify-between">
              <div className="w-full md:w-1/2 mb-10 md:mb-0 ">
                <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-blue-700 dark:from-blue-500 to-green-500">
                  About
                </h2>
                <p className="leading-snug">
                  My name is {"Corey O'Donnell"} and I am a full-stack web
                  developer. The tech stack I primarily work with is TypeScript,
                  React.js, Node.js. I love spending my free time learning new
                  things and improving myself. My son and my wife are my
                  everything.
                </p>
              </div>
              <div className="mr-24">
                <ul className="list-none p-0 flex flex-col text-left">
                  <li className="font-bold bg-clip-text text-transparent bg-gradient-to-l from-blue-700 dark:from-blue-500 to-green-500 ">
                    <h2>Links</h2>
                  </li>
                  <li>
                    <Link href="/blog">
                      <a className="inline-block text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 no-underline">
                        Blog
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/ama">
                      <a className="inline-block text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 no-underline">
                        AMA
                      </a>
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
                </ul>
              </div>
            </div>
            <div className="w-full mt-10 font-light hidden md:block">
              © 2021 {"Corey O'Donnell"}. All Rights Reserved.
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/12 md:h-screen bg-gray-900 text-gray-100 md:border-l-2 border-gray-100 dark:border-gray-700 p-5 md:overflow-y-scroll">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-l from-blue-500 to-green-400 m-5 text-4xl font-bold">
            Recent Blog Posts
          </h2>
          {postsOrdered.map((post: MdxFrontMatter) => (
            <Link key={post.title} href={`/blog/${post.slug}`}>
              <a className="mx-5 my-12 pb-10 block">
                <h3 className="text-2xl font-bold mb-5 leading-snug">
                  {post.title}
                </h3>
                <p className="leading-snug">{post.brief}</p>
              </a>
            </Link>
          ))}
          <div className="w-full text-center font-light md:hidden">
            © 2021 {"Corey O'Donnell"}. All Rights Reserved.
          </div>
        </div>
      </Sidebar>
    </Layout>
  );
};

export default Home;
