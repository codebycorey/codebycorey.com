import { MdxSource } from 'next-mdx-remote/hydrate';
import { MdxFrontMatter } from './MdxFrontMatter';

export interface MdxFile {
  mdxSource: MdxSource;
  frontMatter: MdxFrontMatter;
}
