import remark from 'remark';
import html from 'remark-html';
import { VFile } from 'vfile';

export default async function markdownToHtml(markdown: string): Promise<string> {
    const result: VFile = await remark().use(html).process(markdown);
    return result.toString();
}