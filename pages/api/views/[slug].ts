import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from '@lib/supabase-admin';

// @todo: Wrap in try catch with proper error handling
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await SupabaseAdmin.rpc('increment_page_view', { page_slug: req.query.slug });
    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`
    });
  }

  if (req.method === 'GET') {
    const { data } = await SupabaseAdmin.from('pages').select('view_count').filter('slug', 'eq', req.query.slug);

    if (data) {
      return res.status(200).json({
        total: data[0]?.view_count || null
      });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request'
  });
};
