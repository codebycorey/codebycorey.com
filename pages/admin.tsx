import { FC, useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { useAuth } from '@hooks/use-auth';
// import { SupabaseClient } from '@lib/supabase-client';
import { fetcherWithToken } from '@lib/fetcher';
import { AMAQuestion } from '@models/AMAQuestions';
import Date from '@components/Date';
import EditQuestion from '@components/admin/EditQuestion';

const Admin: FC = () => {
  const [edit, setEdit] = useState<AMAQuestion | null>(null);
  const { session, signIn, signOut } = useAuth();
  const { data } = useSWR(
    session ? ['/api/ama/admin', session.access_token] : null,
    fetcherWithToken
  );

  function handleSubmit(updated: AMAQuestion) {
    fetch('/api/ama/admin/update-question', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        token: session.access_token,
      }),
      body: JSON.stringify({ ...updated }),
    }).then(() => {
      setEdit(null);
    });
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="flex flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <button
                className="flex-shrink-0 w-full group block"
                onClick={() => (session ? signOut() : signIn())}
              >
                <div className="flex items-center text-left">
                  {session ? (
                    <>
                      <div>
                        <Image
                          className="inline-block h-9 w-9 rounded-full"
                          src={session?.user.user_metadata.avatar_url}
                          alt="Avatar"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-white">
                          {session?.user.user_metadata.full_name}
                        </p>
                        <p className="text-xs text-gray-300 group-hover:text-gray-200 w-full">
                          Sign Out
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-gray-300 group-hover:text-gray-200 w-full">
                      Sign In
                    </p>
                  )}
                </div>
              </button>
            </div>
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                <a
                  href="#"
                  className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm rounded-md"
                >
                  <svg
                    className="text-gray-300 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Questions
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          <div className="mt-8">
            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 text-gray-900 sm:px-6 lg:px-8">
              Questions
            </h2>

            <div className="block">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                            Submitted
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                            Question
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                            Answer
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                            Published
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data &&
                          data.map((amaQuestion: AMAQuestion) => (
                            <tr key={amaQuestion.id} className="bg-white">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <p className="text-gray-500 truncate group-hover:text-gray-900">
                                  <Date dateString={amaQuestion.created} />
                                </p>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                <p>{amaQuestion.question}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                <p>{amaQuestion.answer}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                <p>{amaQuestion.published.toString()}</p>
                              </td>
                              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => setEdit(amaQuestion)}
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                  Edit
                                </button>
                                {/* <button
                                  type="button"
                                  className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                >
                                  Delete
                                </button> */}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {edit && (
            <EditQuestion
              amaQuestion={edit}
              onSubmit={handleSubmit}
              onCancel={() => setEdit(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
