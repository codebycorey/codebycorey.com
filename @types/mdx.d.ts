export type FrontMatter = {
  layout?: string;
  title: string;
  publishedAt: string;
  by?: string;
  __resourcePath: string;
};

declare module '*.mdx' {
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontMatter: FrontMatter[];
}
