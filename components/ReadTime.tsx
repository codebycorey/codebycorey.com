
interface Props {
  content: string;
}

export default function ReadTime({ content }: Props) {
  const wordsPerMinute: number = 200;
  const noOfWords: number = content.split(/\s/g).length;
  const readTime: number = Math.ceil(noOfWords / wordsPerMinute);
  return <>{readTime} min read</>
}
