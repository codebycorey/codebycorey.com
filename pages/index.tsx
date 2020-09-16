import Head from 'next/head'
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import { fetchThreeMostRecentPosts } from '../lib/posts';
import BlogPost from '../models/BlogPost';
import LandingBlog from '../components/landing-blog';

export default function Home({ posts }: any) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="w-full bg-gray-900 h-screen flex text-gray-100">
        <div className="w-2/3 h-full flex flex-wrap content-between justify-between items-between">
          <div className="w-full">
            <div className="text-2xl">COREY O'DONNELL</div>
          </div>
          <div className="w-full">
            <h1 className="text-6xl font-serif">
              FULL-STACK
              <br />
              WEB DEVELOPER
            </h1>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full flex">
              <div className="w-1/2">
                <h3>About</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore maiores voluptates suscipit vitae nesciunt ullam, ea iusto natus
                  nemo aspernatur blanditiis quidem doloribus quod odio similique voluptatum quae ducimus! Magni.
                </p>
              </div>
              <div className="w-1/2">
                <h3>Social</h3>
                <a href="">Twitter</a>
                <a href="">Github</a>
                <a href="">LinkedIn</a>
                <a href="">DEV.to</a>
              </div>
            </div>
            <div className="w-full">© 2020 Corey O'Donnell. All Rights Reserved.</div>
          </div>
        </div>
        <div className="w-1/3 h-full bg-gray-800"></div>
      </div>
    </div>
  );
}

export async function getStaticProps() {

  const posts = await fetchThreeMostRecentPosts();
  return {
    props: {
      posts
    },
    revalidate: 60
  };
}
