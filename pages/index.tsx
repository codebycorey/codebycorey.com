import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
          <a href="https://github.com/CodeByCorey"><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a>
          <a href="https://twitter.com/codewithcorey"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
          <a href="https://www.linkedin.com/in/rcodonnell/"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
          <a href="mailto:me@coreyodonnell.com"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></a>
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