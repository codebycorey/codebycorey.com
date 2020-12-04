import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@lib/supabase';

const PageViews = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({
      error: 'Missing "slug" query parameter'
    });
  }

  const { data, error } = await supabase.from('page-views').select().filter('slug', 'eq', slug);
  console.log('PageViews', data);
  return res.status(200).json({
    total: data?.length || null
  });
};

export default PageViews;
