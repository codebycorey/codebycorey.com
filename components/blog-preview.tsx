import BlogPost from '../models/BlogPost';
import ReadTime from './read-time';

interface Props {
  post: BlogPost;
}

export default function BlogPreview({ post }: Props) {
  return (
    <div className="p-4 h-full">
      <div className="h-full bg-gray-100 px-8 pt-16 pb-12 rounded-lg overflow-hidden text-center flex flex-col justify-between">
        <div>
          {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY</h2> */}
          <h2 className="title-font sm:text-2xl text-xl font-medium text-gray-800 mb-3">{post.title}</h2>
          <p className="leading-relaxed mb-3 text-gray-700">{post.description}</p>
        </div>
        <div className="flex items-center flex-wrap pt-4">
          <span className="text-gray-600 mr-3 inline-flex items-center leading-none text-sm py-1">
            <ReadTime content={post.content} />
          </span>
          <span className="text-green-700 inline-flex items-center md:mb-2 lg:mb-0 ml-auto">
            Learn More
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>

        </div>
      </div>
    </div>
  );
}
