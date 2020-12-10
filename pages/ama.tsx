import Layout from '@components/layout';
import { FC, FormEvent, useState } from 'react';
import useSWR from 'swr';
import SubmitQuestion from '@components/ama/submit-question';
import Question from '@components/ama/question';
import { AMAQuestion } from '@models/AMAQuestions';
import { NextSeo } from 'next-seo';

const AMA: FC = () => {
  const { data, error } = useSWR<AMAQuestion[]>('/api/ama');
  console.log('DATA', data);
  // @todo use variables for NextSeo
  return (
    <Layout>
      <NextSeo
        title="AMA - Corey O'Donnell"
        description="Lets have some fun! Ask me anything you want."
        canonical="https://codebycorey.com/ama"
        openGraph={{
          url: 'https://codebycorey.com/ama',
          title: "AMA - Corey O'Donnell",
          description: 'Lets have some fun! Ask me anything you want.',
          images: [
            {
              url: 'https://codebycorey.com/static/images/ama-og.png',
              alt: "AMA- Corey O'Donnell"
            }
          ]
        }}
      />
      <div className="max-w-screen-lg flex flex-col mx-auto px-4 pb-12 min-h-screen">
        <h1 className="my-10 text-4xl md:text-8xl w-full font-bold leading-snug">Ask Me Anything</h1>
        <p className="w-full text-2xl md:text-4xl mb-10">Lets have some fun! Ask me anything you want. Questions will be shown after I answer.</p>
        <SubmitQuestion />
        <div className="mt-2">{data && data.map((amaQuestion) => <Question key={amaQuestion.id} {...amaQuestion} />)}</div>
      </div>
    </Layout>
  );
};

export default AMA;
