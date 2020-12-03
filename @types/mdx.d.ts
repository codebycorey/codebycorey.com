// import { FrontMatter } from '../types/mdx';

declare module '*.mdx' {
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;

  export interface FrontMatter {
    layout?: string;
    title: string;
    date: string;
    brief: string;
    readingTime: {
      text: string;
      time: number;
      words: number;
      minutes: number;
    };
    __resourcePath: string;
  }

  export const frontMatter: FrontMatter[];
}
