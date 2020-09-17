// import Layout from '../../components/layout';
// import { getAllPostSlugs, getPostBySlug } from '../../lib/posts';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import Head from 'next/head';
// import Date from '../../components/date';
import BlogPost from '../../models/BlogPost';
// import ReactMarkdown from 'react-markdown';
// import CodeBlock from '../../components/code-block';
// import ReadTime from '../../components/read-time';
// import MarkdownLink from '../../components/markdown-link';
// import Footer from '../../components/footer';
// import Link from 'next/link';

interface Props {
  post: BlogPost;
}

export default function post({ post }: Props) {
  return (
    <div className="bg-gray-800 h-full p-2 md:py-16">
      {/* <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:site_name" content={`Corey's Writings | ${post.title}`} />
        <meta property="og:description" content={post.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CodeByCorey" />
        <meta property="og:image" content={`https://coreyodonnell.dev/og/${post.slug}.png`} />
      </Head>
      <article className="container bg-gray-100 mx-auto py-12">
        <div className="mx-auto w-4/5">
          <Link href="/">
            <a className="text-gray-500">Back</a>
          </Link>
          <h1 className="text-3xl font-bold md:text-6xl">{post.title}</h1>
          <div className="flex items-center justify-between my-6">
            <div className="flex items-center">
              <a className="flex items-center" target="_blank" rel="noopener noreferrer nofollow" href="https://twitter.com/CodeByCorey">
                <img className="w-10 md:w-16 h10 md:h-16 rounded-full mr-2" src="/svg/profile.svg" alt="" />
                <span className="md:text-xl text-gray-700">Corey O'Donnell</span>
              </a>
              <span className="text-gray-500 ml-2">
                <Date dateString={post.date} />
              </span>
            </div>
            <span className="text-gray-500">
              <ReadTime content={post.content} />
            </span>
          </div>
        </div>
        <ReactMarkdown
          className="prose md:prose-2xl mx-auto max-w-full w-4/5"
          source={post.content}
          renderers={{
            code: CodeBlock,
            link: MarkdownLink
          }}
        />
      </article>
      <Footer /> */}
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const slugs: string[] = getAllPostSlugs();

//   return {
//     paths: slugs.map((slug) => ({ params: { slug }})),
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const post: BlogPost = await getPostBySlug(params!.slug as string);
//   return {
//     props: {
//       post
//     }
//   };
// }
