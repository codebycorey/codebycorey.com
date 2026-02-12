/**
 * Returns true if each character in query is found sequentially within text.
 */
export const sequentialFuzzySearch = (query: string, text: string): boolean => {
  if (query.length === 0 || text.length === 0) {
    return false;
  }
  let queryIndex = 0;
  let textIndex = 0;

  while (queryIndex !== query.length && textIndex !== text.length) {
    if (
      query.charAt(queryIndex).toLowerCase() ===
      text.charAt(textIndex).toLowerCase()
    ) {
      ++queryIndex;
    }
    ++textIndex;
  }
  return queryIndex === query.length;
};
