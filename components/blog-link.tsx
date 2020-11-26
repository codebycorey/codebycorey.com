import { FrontMatter } from '*.mdx';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Date from '@components/date';

interface BlogLinkProps {
  blog: FrontMatter;
}

const BlogLink: FC<BlogLinkProps> = ({ blog }) => {
  console.log('BLOG', blog);

  const slug = blog.__resourcePath.replace('blog/', '').replace('.mdx', '');

  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-100 flex flex-col mb-16">
        {/* <div className="w-7/12 pr-14"> */}
        <h3 className="text-4xl mb-4">{blog.title}</h3>
        <p className="text-xl text-gray-700">{blog.brief}</p>
        {/* </div> */}
        {/* <div className="w-5/12 relative">
          <Image src={`/static/images/${slug}/header.png`} width={1200} height={630} layout="responsive" />
        </div> */}
        <div className="text-gray-500 flex justify-between mt-4">
          <Date dateString={blog.date} />
          <span>2134 views</span>
        </div>
      </a>
    </Link>

    // <div className="w-100 flex my-10" key={blog.title}>
    //   <div className="w-7/12 pr-14">
    //     <h3 className="font-bold text-4xl mb-4">{blog.title}</h3>
    //     <p className="text-xl">{blog.brief}</p>
    //   </div>
    //   <div className="w-5/12 relative">
    //     <Image src={`/static/images/${slug}/header.png`} width={1200} height={630} layout="responsive" />
    //   </div>
    // </div>
  );
};

export default BlogLink;
