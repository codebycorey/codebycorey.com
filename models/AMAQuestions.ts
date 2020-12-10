export interface AMAQuestion {
  id: number;
  question: string;
  name: string | null;
  answer: string | null;
  created: string;
  updated: string;
  published: boolean;
}
