import { parseISO, format } from 'date-fns';

interface Props {
  dateString: string;
}

export default function Date({ dateString }: Props) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLL d, yyyy')}</time>
}
