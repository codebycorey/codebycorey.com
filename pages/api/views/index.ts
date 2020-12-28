import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await SupabaseAdmin.from('pages').select();

  const total = data?.reduce((acc, row) => acc + row.view_count, 0);
  console.log('DATA', total);
  return res.status(200).json({
    total
  });
};
