import BlogPost from '../models/BlogPost';
import BlogPreview from './blog-preview';

interface Props {
  posts: BlogPost[]
}

export default function LandingBlog({ posts }: Props) {
  return (
    <div className="container mx-auto py-12">
      <h2>Recent Blog Posts</h2>
      <div className="flex flex-wrap">
        {posts.map((post, index) => (
          <div className="w-1/3 p-5">
            <BlogPreview key={index} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
