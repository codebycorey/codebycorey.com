import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

const UpdateQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.token as string;
  const { error: authError } = await SupabaseAdmin.auth.api.getUser(token);

  if (authError) return res.status(401).json({ error: authError.message });

  const { data } = await SupabaseAdmin.from('ama')
    .update({
      ...req.body,
      updated: new Date()
    })
    .match({ id: req.body.id });

  return res.status(200).json(data);
};

export default UpdateQuestion;
