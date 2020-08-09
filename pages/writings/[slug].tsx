import Layout from '../../components/layout';
import { getAllPostSlugs, getPostBySlug } from '../../lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Date from '../../components/date';
import BlogPost from '../../models/BlogPost';
import ReactMarkdown from 'react-markdown';

interface Props {
  post: BlogPost; // @todo type
}

export default function post({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1>{post.title}</h1>
        <div>
            <Date dateString={post.date} />
        </div>
        <ReactMarkdown source={post.content}/>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: string[] = getAllPostSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug }})),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post: BlogPost = await getPostBySlug(params!.slug as string);

  return {
    props: {
      post
    }
  };
}
