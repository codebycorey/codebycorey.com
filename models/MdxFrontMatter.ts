export interface MdxFrontMatter {
  slug: string | null;
  title: string;
  date: string;
  brief: string;
  readingTime: {
    text: string;
    time: number;
    words: number;
    minutes: number;
  };
}
