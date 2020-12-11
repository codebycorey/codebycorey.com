declare module 'next-mdx-remote/hydrate' {
  import * as React from 'react';

  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope?: Record<string, unknown>;
  }

  export default function hydrate(
    source: MdxSource,
    options?: {
      components: { [key: string]: React.FunctionComponent | React.Component };
    }
  );
}

declare module 'next-mdx-remote/render-to-string' {
  import * as React from 'react';

  export interface MdxSource {
    compiledSource: string;
    renderedOutput: string;
    scope?: Record<string, unknown>;
  }

  export default function renderToString(
    source: string,
    options: {
      components?: { [key: string]: React.FunctionComponent | React.Component };
      mdxOptions?: any;
    }
  );
}
