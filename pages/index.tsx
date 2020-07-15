import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ allPostsData }: any) {
  return (
    <div className="bg-gray-800 flex justify-center content-end h-screen">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header className="flex justify-center content-center">
        <div>
          <img className="w-48 h-48" src="/images/profile.png" alt="Corey O'Donnell"/>
          <h1>Corey O'Donnell</h1>
          <h2>Full Stack Developer | Continuous Learner</h2>
          <a href="">Blog</a>
          <a href="">Uses</a>
        </div>
        <div>
          <a href="">Github</a>
          <a href="">Twitter</a>
          <a href="">Linkdin</a>
          <a href="">Email</a>
        </div>
      </header>
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

const colors = {
  darkgrey: '2a2b2f',
  mediumgrey: '4f4f57',
  lightgrey: '9499a5',
  lightgreen: '9bb26c',
  darkgreen: '48582d'
}