import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

const AddPageView = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({
      error: 'Missing "slug" query parameter'
    });
  }

  const { data, error } = await SupabaseAdmin.from('page-views').insert({
    slug
  });

  return res.status(200).json({
    success: true
  });
};

export default AddPageView;
