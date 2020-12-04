import useSWR from 'swr';
import fetcher from '@lib/fetcher';
import { FC } from 'react';

interface PageViewsProps {
  slug: string;
}

const PageViews: FC<PageViewsProps> = ({ slug }) => {
  const { data } = useSWR(`/api/page-views?slug=${encodeURIComponent(slug)}`, fetcher);

  return <span>{data?.total ? `${data.total} views` : `–––`}</span>;
};

export default PageViews;
