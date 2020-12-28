import { FC, ReactNode, useEffect } from 'react';
import Layout from '@components/layout/Layout';
import Image from 'next/image';
import Date from '@components/Date';
import PageViews from '@components/PageViews';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { MdxFrontMatter } from '@models/MdxFrontMatter';

interface BlogLayoutProps {
  children: ReactNode;
  frontMatter: MdxFrontMatter;
}

const BlogLayout: FC<BlogLayoutProps> = ({ children, frontMatter }) => {
  const { title, brief, date, slug } = frontMatter;
  const url = `https://codebycorey.com/blog/${slug}`;
  const image = {
    url: `https://codebycorey.com/static/images/${slug}/header.png`,
    alt: title
  };

  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: 'POST'
    });
  }, [slug]);

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
      <article className="max-w-screen-lg flex flex-col justify-center items-center mx-auto px-4 pb-12">
        <header className="border-gray-400 mb-12">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-blue-700 dark:from-blue-500 to-green-500 my-10 text-4xl md:text-8xl w-full font-bold md:leading-snug py-8">
            {frontMatter.title}
          </h1>
          <div className="w-full flex md:text-xl border-b-2 border-t-2 p-4">
            <a target="_blank" rel="noopener noreferrer nofollow" href="https://twitter.com/CodeByCorey" className="flex m-1">
              <span className="sr-only">Twitter</span>
              <Image className="rounded-full" src={`/static/images/profile.png`} width={64} height={64} alt="Corey O'Donnell Avatar" />
            </a>
            <div className="flex-grow flex flex-col justify-between px-2">
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://twitter.com/CodeByCorey"
                className="font-bold text-lg md:text-2xl text-gray-800"
              >
                Corey O'Donnell
              </a>
              <p className="text-gray-500">
                <Date dateString={frontMatter.date} />
              </p>
            </div>
            <div className="flex flex-col justify-between text-right">
              <p className="text-gray-500">{frontMatter.readingTime.text}</p>
              <p className="text-gray-500">
                <PageViews slug={slug || ''} />
              </p>
            </div>
          </div>
        </header>
        <div className="prose md:prose-2xl w-full md:max-w-none">{children}</div>
      </article>
    </Layout>
  );
};

export default BlogLayout;
