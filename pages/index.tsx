import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ allPostsData }: any) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>Web Developer</p>
        <div>
          <a href="">Github</a>
          <a href="">Twitter</a>
          <a href="">Linkdin</a>
          <a href="">Email</a>
        </div>
      </section>
    </Layout>
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

const colors = {
  darkgrey: '2a2b2f',
  mediumgrey: '4f4f57',
  lightgrey: '9499a5',
  lightgreen: '9bb26c',
  darkgreen: '48582d'
}