import Layout from '@components/layout/Layout';
import { FC } from 'react';
import SubmitQuestion from '@components/ama/submit-question';
import Question from '@components/ama/question';
import { AMAQuestion } from '@models/AMAQuestions';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';
import { Stack } from '@components/composition';

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
              alt: title,
            },
          ],
        }}
      />
      <Stack className="ama">
        <h1>Ask Me Anything</h1>
        <p>
          Lets have some fun! Ask me anything you want. Questions will be shown
          after I answer.
        </p>
        <SubmitQuestion />
        <div>
          {amaQuestions &&
            amaQuestions.map((amaQuestion) => (
              <Question key={amaQuestion.id} {...amaQuestion} />
            ))}
        </div>
      </Stack>
    </Layout>
  );
};

export default AMA;

export const getStaticProps: GetStaticProps = async () => {
  const { data: amaQuestions } = await SupabaseAdmin.from('ama')
    .select()
    .is('published', true);
  return {
    props: {
      amaQuestions,
    },
    revalidate: 60,
  };
};
