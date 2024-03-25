import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import Image, { ImageProps } from 'next/image';
import WrappedLink from './WrappedLink';
import { highlight } from 'sugar-high';

const CustomImage: FC<ImageProps> = (props) => {
  return <Image {...props} alt={props.alt} />;
};

const slugify = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

const createHeader = (level: number) => {
  const header = ({ children }: PropsWithChildren<{}>) => {
    const Header = `h${level}` as keyof JSX.IntrinsicElements;
    const slug = slugify(children?.toString() || '');
    return (
      <Header id={slug}>
        <a className="no-underline" href={`#${slug}`}>
          {children}
        </a>
      </Header>
    );
  };
  return header;
};

const CodeBlock = ({
  children,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
>) => {
  const code = highlight(children?.toString() || '');
  return <code {...props} dangerouslySetInnerHTML={{ __html: code }} />;
};

const components: MDXRemoteProps['components'] = {
  h1: createHeader(1),
  h2: createHeader(2),
  h3: createHeader(3),
  h4: createHeader(4),
  h5: createHeader(5),
  h6: createHeader(6),
  Image: CustomImage,
  a: WrappedLink,
  code: CodeBlock,
};

const CustomMdx: FC<MDXRemoteProps> = (params) => {
  return <MDXRemote {...params} components={{ ...components }} />;
};

export default CustomMdx;
