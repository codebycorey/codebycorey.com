import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

const SubmitQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  const { question, name } = req.body;
  if (!question) {
    return res.status(400).json({
      error: 'Missing "question"'
    });
  }

  const { data } = await SupabaseAdmin.from('ama').insert({
    question,
    name: name || null
  });

  return res.status(200).json(data);
};

export default SubmitQuestion;
