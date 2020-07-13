import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownToHtml from './markdownToHtml';

const postsDir = path.join(process.cwd(), '_posts');

export function getSortedPostsData(): any {
    const fileNames: string[] = fs.readdirSync(postsDir);
    const allPostsData = fileNames.map(fileName => {
        const id: string = fileName.replace(/\.md$/, '');
        const fullPath: string = path.join(postsDir, fileName);
        const fileContents: string = fs.readFileSync(fullPath, 'utf-8');
        const matterResult: matter.GrayMatterFile<string> = matter(fileContents);
        return {
            id,
            ...matterResult.data
        }
    });

    return allPostsData.sort((a: any, b: any) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}

export function getAllPostIds() {
    const fileNames: string[] = fs.readdirSync(postsDir);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        };
    })
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDir, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const contentHtml: string = await markdownToHtml(matterResult.content);

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}