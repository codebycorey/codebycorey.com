import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Navbar from '../components/navbar';
import Hero from '../components/hero';

export default function Home({ allPostsData }: any) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Navbar />
      <Hero />
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  }
}
