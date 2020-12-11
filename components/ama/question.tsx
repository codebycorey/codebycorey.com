import Date from '@components/date';
import { AMAQuestion } from '@models/AMAQuestions';
import { FC } from 'react';

interface QuestionProps extends AMAQuestion {}

const question: FC<QuestionProps> = ({ question, name, answer, updated }) => {
  return (
    <div className="w-full my-6">
      <p className="text-gray-500 w-full">{name}</p>
      <h3 className="text-2xl font-bold w-full">{question}</h3>
      <p className="text-2xl text-gray-700 my-2">{answer}</p>
      <p className="text-gray-500 text-right">
        <Date dateString={updated} />
      </p>
    </div>
  );
};

export default question;
