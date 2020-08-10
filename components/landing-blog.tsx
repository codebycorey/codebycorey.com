import BlogPost from '../models/BlogPost';
import BlogPreview from './blog-preview';

interface Props {
  posts: BlogPost[]
}

export default function LandingBlog({ posts }: Props) {
  return (
    <div className="container mx-auto py-12 text-gray-800">
      <h2 className="text-center text-2xl md:text-4xl pb-6">Blog Posts</h2>
      <div className="flex flex-wrap justify-around">
        {posts.map((post, index) => (
          <div className="w-1/3 p-5" key={index}>
            <BlogPreview post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
