import { FC, ReactNode } from 'react';
import { FrontMatter } from '../@types/*.mdx';
import Layout from '@components/layout';
import Image from 'next/image';
import Date from '@components/date';
import { NextSeo, ArticleJsonLd } from 'next-seo';

interface BlogLayoutProps {
  children: ReactNode;
  frontMatter: FrontMatter;
}

const BlogLayout: FC<BlogLayoutProps> = ({ children, frontMatter }) => {
  const { title, brief, date, __resourcePath } = frontMatter;
  const slug = __resourcePath.replace('blog/', '').replace('.mdx', '');
  const url = `https://codebycorey.com/blog/${slug}`;
  const image = {
    url: `https://codebycorey.com/static/images/${slug}/header.png`,
    alt: title
  };

  return (
    <Layout>
      <NextSeo
        title={`${title} – Corey O'Donnell`}
        description={brief}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: date
          },
          url,
          title,
          description: brief,
          images: [image]
        }}
      />
      <ArticleJsonLd
        authorName="Corey O'Donnell"
        dateModified={date}
        datePublished={date}
        description={brief}
        images={[image.url]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Corey O'Donnell"
        title={title}
        url={url}
      />
      <article className="max-w-screen-lg flex flex-col justify-center items-center mx-auto pb-12">
        <header className="border-gray-400 mb-12">
          <h1 className="my-10 text-8xl w-full font-bold leading-snug">{frontMatter.title}</h1>
          <div className="w-full flex text-xl border-b-2 border-t-2 py-4">
            <a target="_blank" rel="noopener noreferrer nofollow" href="https://twitter.com/CodeByCorey" className="flex m-1">
              <Image className="rounded-full" src={`/static/images/profile.png`} width={64} height={64} />
            </a>
            <div className="flex-grow flex flex-col justify-between px-2">
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://twitter.com/CodeByCorey"
                className="font-bold text-2xl text-gray-800"
              >
                Corey O'Donnell
              </a>
              <p className="text-gray-500">
                <Date dateString={frontMatter.date} />
              </p>
            </div>
            <div className="flex flex-col justify-between text-right">
              <p className="text-gray-500">{frontMatter.readingTime.text}</p>
              {/* <p className="text-gray-500">12314</p> */}
            </div>
          </div>
        </header>
        <div className="prose prose-2xl max-w-none">{children}</div>
      </article>
    </Layout>
  );
};

export default BlogLayout;
