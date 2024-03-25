import CustomMdx from '@/components/CustomMdx';
import { getBlogPostBySlug } from '@/lib/mdx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto prose prose-neutral my-12 px-4 max-w-2xl">
      <h1>{post.metadata.title}</h1>
      <CustomMdx source={post.content} />
    </article>
  );
}
