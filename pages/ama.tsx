import Layout from '@components/layout/Layout';
import { FC } from 'react';
import SubmitQuestion from '@components/ama/submit-question';
import Question from '@components/ama/question';
import { AMAQuestion } from '@models/AMAQuestions';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

interface AMAProps {
  amaQuestions: AMAQuestion[];
}

const AMA: FC<AMAProps> = ({ amaQuestions }) => {
  const url: string = 'https://codebycorey.com/ama';
  const title: string = "AMA - Corey O'Donnell";
  const description: string = 'Lets have some fun! Ask me anything you want.';
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: 'https://codebycorey.com/static/images/ama-og.png',
              alt: title
            }
          ]
        }}
      />
      <div className="max-w-screen-lg flex flex-col mx-auto px-4 pb-12 min-h-screen">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-blue-700 dark:from-blue-500 to-green-500 my-10 text-4xl md:text-8xl w-full font-bold leading-snug py-2">
          Ask Me Anything
        </h1>
        <p className="w-full text-2xl md:text-4xl mb-10 dark:text-gray-100">
          Lets have some fun! Ask me anything you want. Questions will be shown after I answer.
        </p>
        <SubmitQuestion />
        <div className="mt-2">{amaQuestions && amaQuestions.map((amaQuestion) => <Question key={amaQuestion.id} {...amaQuestion} />)}</div>
      </div>
    </Layout>
  );
};

export default AMA;

export const getStaticProps: GetStaticProps = async () => {
  const { data: amaQuestions } = await SupabaseAdmin.from('ama').select().is('published', true);
  return {
    props: {
      amaQuestions
    },
    revalidate: 60
  };
};
