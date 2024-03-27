import { ReadTimeResults } from 'reading-time';

export type MdxFrontmatter = {
  title: string;
  date: string;
  brief: string;
};

export type MdxCompiledMetadata = {
  slug: string;
} & MdxFrontmatter;

export type BlogMetadata = MdxCompiledMetadata & {
  readingTime: ReadTimeResults;
  viewCount: number;
  formattedDate: string;
};

export type MdxFile<
  Metadata extends MdxCompiledMetadata = MdxCompiledMetadata,
> = {
  content: string;
  metadata: Metadata;
};

export type BlogFile = MdxFile<BlogMetadata>;

export enum MdxContentType {
  BLOG = 'blog',
}

export enum OrderType {
  DATE = 'date',
  VIEW_COUNT = 'viewCount',
}
