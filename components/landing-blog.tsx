import Link from 'next/link';
import BlogPost from '../models/BlogPost';
import BlogPreview from './blog-preview';

interface Props {
  posts: BlogPost[]
}

export default function LandingBlog({ posts }: Props) {
  return (
    <div className="container mx-auto py-12 text-gray-800">
      <h2 className="text-center text-2xl md:text-4xl pb-6">Blog Posts</h2>
      <div className="flex flex-wrap justify-center">
        {posts.map((post, index) => (
          <a key={index} href={`https://blog.coreyodonnell.tech/${post.slug}`} className="md:w-2/3 lg:w-1/3 px-5 my-2">
            <BlogPreview post={post} />
          </a>
        ))}
      </div>
    </div>
  );
}
