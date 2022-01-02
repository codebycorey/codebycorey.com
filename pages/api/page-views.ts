import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

const PageViews = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({
      error: 'Missing "slug" query parameter'
    });
  }

  const { data } = await SupabaseAdmin.from('page-views').select().filter('slug', 'eq', slug);

  return res.status(200).json({
    total: data?.length || null
  });
};

export default PageViews;
