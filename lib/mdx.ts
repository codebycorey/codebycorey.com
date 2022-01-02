import fs from 'fs';
import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import path from 'path';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import { MdxFile } from '@models/MdxFile';
import { MdxFrontMatter } from '@models/MdxFrontMatter';

const root = process.cwd();
const contentPath = path.join(root, '_content');

export async function getFiles(type: string) {
  return fs.readdirSync(path.join(contentPath, type));
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<MdxFile> {
  const source = slug
    ? fs.readFileSync(path.join(contentPath, type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(contentPath, `${type}.mdx`), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    // components: MdxComponents,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      ...data,
      readingTime: readingTime(content),
      slug: slug || null,
    } as MdxFrontMatter,
  };
}

export async function getAllFilesFrontMatter(type: string): Promise<any[]> {
  const files = fs.readdirSync(path.join(contentPath, type));

  return files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const source = fs.readFileSync(
      path.join(contentPath, type, fileName),
      'utf8'
    );
    const { data, content } = matter(source);

    return {
      ...data,
      readingTime: readingTime(content),
      slug,
    };
  });
}
