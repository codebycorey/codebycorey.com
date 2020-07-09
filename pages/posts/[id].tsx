import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
    postData: any; // @todo type
}

export default function post({ postData }: Props) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = getPostData(params!.id as string);
    return {
        props: {
            postData
        }
    }
}