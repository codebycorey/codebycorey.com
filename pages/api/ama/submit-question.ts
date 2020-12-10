import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

const SubmitQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('req', req.body);
  const { question, name } = req.body;
  console.log('boom', question, name);
  if (!question) {
    return res.status(400).json({
      error: 'Missing "question"'
    });
  }

  const { data, error } = await SupabaseAdmin.from('ama').insert({
    question,
    name: name || null
  });

  return res.status(200).json(data);
};

export default SubmitQuestion;
