import CustomMdx from '@/components/CustomMdx';
import { BlogViewCount } from '@/components/ViewCount';
import WrappedLink from '@/components/WrappedLink';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map(({ metadata }) => ({
    slug: metadata.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  const image = {
    url: `https://codebycorey.com/og?title=${post.metadata.title}`,
    alt: post.metadata.title,
  };

  return {
    title: post.metadata.title,
    description: post.metadata.brief,
    alternates: {
      canonical: `/blog/${post.metadata.slug}`,
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.brief,
      type: 'article',
      url: `https://codebycorey.com/blog/${post.metadata.slug}`,
      publishedTime: post.metadata.date,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.brief,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.brief,
            image: `https://codebycorey.com/og?title=${post.metadata.title}`,
            url: `https://codebycorey.com/blog/${post.metadata.slug}`,
            author: {
              '@type': 'Person',
              name: "Corey O'Donnell",
            },
          }),
        }}
      />
      <section className="mx-auto  my-12 px-4 max-w-2xl space-y-6">
        <h1 className="not-prose text-4xl">{post.metadata.title}</h1>
        <div>
          <div className="flex justify-between">
            <time>{post.metadata.formattedDate}</time>
            <Suspense fallback={null}>
              <BlogViewCount slug={params.slug} />
            </Suspense>
          </div>
          <p className="text-zinc-400 my-1">
            Affiliate links may earn commissions.
          </p>
        </div>
        <div className="prose prose-neutral">
          <CustomMdx source={post.content} />
        </div>
        <WrappedLink
          href={`https://github.com/codebycorey/codebycorey.com/blob/main/_content/blog/${params.slug}.mdx`}
        >
          Edit this page on GitHub
        </WrappedLink>
      </section>
    </>
  );
}
