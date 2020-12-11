import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

const AMA = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await SupabaseAdmin.from('ama').select().is('published', true);
  return res.status(200).json(data);
};

export default AMA;
