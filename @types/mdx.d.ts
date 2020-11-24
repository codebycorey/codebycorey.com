// import { FrontMatter } from '../types/mdx';

declare module '*.mdx' {
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;

  export interface FrontMatter {
    layout?: string;
    title: string;
    date: string;
    brief: string;
    by?: string;
    __resourcePath: string;
  }

  export const frontMatter: FrontMatter[];
}
