import Layout from '../../components/layout';
// import { getAllPostIds, getPostData } from '../../lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Date from '../../components/date';

interface Props {
    postData: any; // @todo type
}

export default function post({ postData }: Props) {
    return (
        <Layout>
            {/* <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1>{postData.title}</h1>
                <div>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
            </article> */}
        </Layout>
    )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     const paths = getAllPostIds();

//     return {
//         paths,
//         fallback: false
//     }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const postData = await getPostData(params!.id as string);

//     return {
//         props: {
//             postData
//         }
//     }
// }
