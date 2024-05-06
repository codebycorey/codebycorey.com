import { fetchAndIncrementViewCount } from '@/lib/supabase';
import { FC } from 'react';

type Props = {
  slug: string;
};

const ViewCount: FC<Props> = async ({ slug }) => {
  const viewCount = await fetchAndIncrementViewCount(slug);
  return <p>{viewCount} views</p>;
};

export default ViewCount;
