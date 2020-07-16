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
    <div className="bg-gray-900 h-screen w-full">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header className="flex flex-col justify-center items-center h-full w-full">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="">
            <img className="w-48 h-48 rounded-full border-2 border-green-500 mx-auto" src="/images/profile.png" alt="Corey O'Donnell"/>
            <div className="text-center mt-3">
              <h1 className="text-gray-100 text-2xl">Corey O'Donnell</h1>
              <h2 className="text-gray-500">Full Stack Developer</h2>
              <h3 className="text-gray-500">Constant Learner | Coder | Plant lover</h3>
            </div>
          </div>
          {/* <div className="w-100 flex justify-center text-xl">
            <a className="m-2 border-b-2 border-green-500">Blog</a>
            <a className="m-2 border-b-2 border-green-500">Uses</a>
          </div> */}
          <div className="w-100 flex justify-center text-2xl text-center text-white">
            <a className="m-2 w-10 h-10 rounded-full border-2 border-green-500" href="https://github.com/CodeByCorey">
              <FontAwesomeIcon icon={faGithub} color="white"></FontAwesomeIcon>
            </a>
            <a className="m-2 w-10 h-10 rounded-full border-2 border-green-500" href="https://twitter.com/codewithcorey">
              <FontAwesomeIcon icon={faTwitter} color="white"></FontAwesomeIcon>
            </a>
            <a className="m-2 w-10 h-10 rounded-full border-2 border-green-500" href="https://www.linkedin.com/in/rcodonnell/">
              <FontAwesomeIcon icon={faLinkedin} color="white"></FontAwesomeIcon>
            </a>
            <a className="m-2 w-10 h-10 rounded-full border-2 border-green-500" href="mailto:me@coreyodonnell.com">
              <FontAwesomeIcon icon={faEnvelope} color="white"></FontAwesomeIcon>
            </a>
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