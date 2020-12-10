import { AMAQuestion } from '@models/AMAQuestions';
import { FC, useEffect, useState } from 'react';

interface EditQuestionProps {
  amaQuestion: AMAQuestion;
  onSubmit: (updated: AMAQuestion) => void;
  onCancel: () => void;
}

const EditQuestion: FC<EditQuestionProps> = ({ amaQuestion, onSubmit, onCancel }) => {
  const [question, setQuestion] = useState<string>(amaQuestion.question);
  const [answer, setAnswer] = useState<string>(amaQuestion.answer || '');
  const [published, setPublished] = useState<boolean>(amaQuestion.published);

  function handleSubmit() {
    const updated: AMAQuestion = {
      ...amaQuestion,
      question,
      answer,
      published
    };
    onSubmit(updated);
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <div className="mt-1">
                <textarea
                  id="question"
                  name="question"
                  rows={3}
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                Answer
              </label>
              <div className="mt-1">
                <textarea
                  id="answer"
                  name="answer"
                  rows={3}
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Answer the AMA Question"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-5 flex items-start">
                <div className="h-5 flex items-center">
                  <input
                    id="published"
                    name="published"
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="published" className="font-medium text-gray-700">
                    Published
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-end">
            <button
              onClick={() => onCancel()}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              type="button"
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
