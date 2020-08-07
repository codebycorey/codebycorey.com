import BlogPost from '../models/BlogPost';
import ReadTime from './read-time';

interface Props {
  post: BlogPost;
}

export default function BlogPreview({ post }: Props) {
  return (
    <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
      <img className="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400" alt="blog" />
      <div className="p-6">
        <div className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY</div>
        <h2 className="title-font text-lg font-medium text-gray-900 mb-3">{post.title}</h2>
        <p className="leading-relaxed mb-3">{post.description}</p>
        <div className="flex items-center flex-wrap ">
          <a className="text-green-700 inline-flex items-center md:mb-2 lg:mb-0">Learn More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <span className="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1">
            <ReadTime content={post.content} />
          </span>
        </div>
      </div>
    </div>
  );
}
