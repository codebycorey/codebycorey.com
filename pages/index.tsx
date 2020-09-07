import Head from 'next/head'
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import { getAllPosts, fetchPosts } from '../lib/posts';
import BlogPost from '../models/BlogPost';
import LandingBlog from '../components/landing-blog';

export default function Home({ posts }: any) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <Navbar home/> */}
      <Hero />
      <LandingBlog posts={posts} />
    </div>
  );
}

export async function getStaticProps() {

  const posts: BlogPost[] = await fetchPosts();
  // console.log('POSTS', posts);
  return {
    props: {
      posts
    },
    revalidate: 60
  };
}
