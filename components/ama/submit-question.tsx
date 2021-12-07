import { FC, FormEvent, useState } from 'react';

const SubmitQuestion: FC = () => {
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch('/api/ama/submit-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, name: name || null })
    }).then(() => {
      setQuestion('');
      setName('');
    });
  }
  return (
    <form className="w-full flex flex-col justify-end" onSubmit={handleSubmit}>
      <textarea
        className="w-full focus:ring-gray-500 focus:border-gray-500 block w-full p-4 text-xl border-gray-300 rounded-md"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={2}
      ></textarea>
      <div className="w-full my-6 flex flex-col md:flex-row">
        <input
          className="focus:ring-gray-500 focus:border-gray-500 w-full text-xl border-gray-300 rounded-md"
          placeholder="Optional: Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <button
          type="submit"
          disabled={question.length === 0}
          className="flex-shrink disabled:opacity-50 whitespace-nowrap mt-6 md:mt-0 md:ml-6 p-4 border border-transparent shadow-sm text-xl rounded-md text-gray-100 bg-gray-900 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Ask the question!
        </button>
      </div>
    </form>
  );
};

export default SubmitQuestion;
