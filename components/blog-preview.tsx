import BlogPost from '../models/BlogPost';
import ReadTime from './read-time';

interface Props {
  post: any;
}

export default function BlogPreview({ post }: Props) {
  return (
    <div className="h-full border-2 border-gray-200 rounded-lg flex flex-col justify-between">
      <div className="w-full">
        <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={post.coverImage} alt="blog" />
        <div className="p-6">
          {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY</h2> */}
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{post.title}</h1>
          <p className="leading-relaxed mb-3 text-gray-600">{post.brief}</p>
        </div>
      </div>
      <div className="flex items-center flex-wrap p-6">
        <span className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
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
        <span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {post.totalReactions}
        </span>
        <span className="text-gray-600 inline-flex items-center leading-none text-sm">
          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          {post.replyCount}
        </span>
      </div>
    </div>
  );
}
