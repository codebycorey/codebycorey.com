/**
 * Returns true if every word in the query appears somewhere in the text (case-insensitive).
 */
export const searchMatch = (query: string, text: string): boolean => {
  const normalizedText = text.toLowerCase();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return words.length > 0 && words.every((word) => normalizedText.includes(word));
};
