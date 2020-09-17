import Head from 'next/head'

import Layout, { siteTitle } from '../components/layout'
import { fetchMultiplePagesOfPosts } from '../lib/posts';

export default function Home({ posts }: any) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <meta name="title" content="Corey O'Donnell | Full-Stack Web Developer" />
        <meta property="og:title" content="Corey O'Donnell | Full-Stack Web Developer" />
        <meta
          property="og:description"
          content="My name is Corey O'Donnell and I am a full-stack web development. The tech stack I primarily work with is TypeScript, React.js, Node.js, and Python."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CodeByCorey" />
        <meta property="og:image" content="https://coreyodonnell.tech/og/website_og.png" />
      </Head>
      <div className="w-full bg-gray-900 md:h-screen flex flex-wrap text-gray-100">
        <div className="w-full md:w-7/12 h-full flex flex-wrap content-between justify-between items-between p-10">
          <div className="w-full">
            <div className="text-2xl md:text-4xl font-light">COREY O'DONNELL</div>
          </div>
          <div className="w-full">
            <h1 className="text-4xl md:text-6xl my-10 md:my-0 font-light">
              FULL-STACK
              <br />
              WEB DEVELOPER
            </h1>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full flex flex-wrap justify-between">
              <div className="w-full md:w-1/2 mb-10 md:mb-0 font-light">
                <h3 className="inline-block py-1 uppercase font-medium tracking-tight">About</h3>
                <p>
                  My name is Corey O'Donnell and I am a full-stack web developer. The tech stack I primarily work with is TypeScript, React.js,
                  Node.js, and Python. I love spending my free time learn new things and improving myself. I have a weird obsession for houseplants
                  and always looking to increase my collection.
                </p>
              </div>
              <div className="mr-24 font-light">
                <ul className="list-none p-0 flex flex-col text-left">
                  <li className="inline-block py-1 uppercase font-medium tracking-tight">
                    <h3>Links</h3>
                  </li>
                  <li>
                    <a
                      href="https://blog.coreyodonnell.tech"
                      className="inline-block py-1 text-gray-100 hover:text-gray-200 no-underline"
                      target="_blank"
                    >
                      BLOG
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/CodeByCorey"
                      className="inline-block py-1 text-gray-100 hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      TWITTER
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/CodeByCorey"
                      className="inline-block py-1 text-gray-100 hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      GITHUB
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/CodeByCorey"
                      className="inline-block py-1 text-gray-100 hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      LINKEDIN
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dev.to/codebycorey"
                      className="inline-block py-1 text-gray-100 hover:text-gray-200 no-underline"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      DEV.TO
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full mt-10 font-thin hidden md:block">© 2020 Corey O'Donnell. All Rights Reserved.</div>
          </div>
        </div>
        <div className="w-full md:w-5/12 h-full bg-gray-900 border-l-2 border-gray-700 p-5 md:overflow-y-scroll">
          <h3 className="m-5 text-4xl font-light">Recent Blog Posts</h3>
          {posts.map((post: any) => (
            <a
              key={post.slug}
              href={`https://blog.coreyodonnell.tech/${post.slug}`}
              target="_blank"
              className="mx-5 my-10 pb-10 border-b-2 border-gray-700 block"
            >
              <h4 className="text-2xl font-medium uppercase">{post.title}</h4>
              <p className="font-light">{post.brief}</p>
            </a>
          ))}
          <div className="w-full text-center font-thin md:hidden">© 2020 Corey O'Donnell. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await fetchMultiplePagesOfPosts();
  return {
    props: {
      posts
    },
    revalidate: 60
  };
}
