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
          <div className="md:flex md:p-5">
            <img className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-green-500 mx-auto" src="/images/profile.png" alt="Corey O'Donnell"/>
            <div className="text-center mt-3 md:mt-0 md:pl-5">
              <h1 className="text-gray-100 text-2xl md:text-5xl">Corey O'Donnell</h1>
              <h2 className="text-gray-500 md:text-3xl">Full Stack Developer</h2>
              <p className="text-gray-500 py-2">Constant Learner | Coder | Plant lover | Husband | Father</p>
              <div className="w-100 flex justify-center text-3xl text-center text-white">
                <a className="m-2" href="https://github.com/CodeByCorey">
                  <FontAwesomeIcon icon={faGithub} color="#7aa77a"></FontAwesomeIcon>
                </a>
                <a className="m-2" href="https://twitter.com/codewithcorey">
                  <FontAwesomeIcon icon={faTwitter} color="#7aa77a"></FontAwesomeIcon>
                </a>
                <a className="m-2" href="https://www.linkedin.com/in/rcodonnell/">
                  <FontAwesomeIcon icon={faLinkedin} color="#7aa77a"></FontAwesomeIcon>
                </a>
                <a className="m-2" href="mailto:me@coreyodonnell.com">
                  <FontAwesomeIcon icon={faEnvelope} color="#7aa77a"></FontAwesomeIcon>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="w-100 flex justify-center text-xl">
            <a className="m-2 border-b-2 border-green-500">Blog</a>
            <a className="m-2 border-b-2 border-green-500">Uses</a>
          </div> */}

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