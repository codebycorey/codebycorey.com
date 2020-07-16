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
    <div className="bg-gray-900 flex justify-center content-end h-screen">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header className="flex justify-center content-center">
        <div className="flex flex-col justify-center content-center w-full">
          <div className="flex w-full">
            <img className="w-48 h-48 rounded-full border-2 border-green-500" src="/images/profile.png" alt="Corey O'Donnell"/>
            <div className="pl-5 text-center">
              <h1 className="text-gray-100 text-6xl">Corey O'Donnell</h1>
              <h2 className="text-gray-500 text-4xl">Full Stack Developer</h2>
              <h3 className="text-gray-500">Continuous Learner | Plant lover | Husband | Father</h3>
            </div>
          </div>
          <div className="w-100 flex justify-center text-xl">
            <a className="m-2 border-b-2 border-green-500">Blog</a>
            <a className="m-2 border-b-2 border-green-500">Uses</a>
          </div>
          <div className="w-100 flex justify-center text-xl">
            <a className="m-2 text-white" href="https://github.com/CodeByCorey"><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a>
            <a className="m-2 text-white" href="https://twitter.com/codewithcorey"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
            <a className="m-2 text-white" href="https://www.linkedin.com/in/rcodonnell/"><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></a>
            <a className="m-2 text-white" href="mailto:me@coreyodonnell.com"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></a>
          </div>
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