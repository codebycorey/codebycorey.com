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

const SEQUENTIAL_BONUS = 15; // bonus for adjacent matches
const SEPARATOR_BONUS = 30; // bonus if match occurs after a separator
const CAMEL_BONUS = 30; // bonus if match is uppercase and prev is lower
const FIRST_LETTER_BONUS = 15; // bonus if the first letter is matched

const LEADING_LETTER_PENALTY = -5; // penalty applied for every letter in str before the first match
const MAX_LEADING_LETTER_PENALTY = -15; // maximum penalty for leading letters
const UNMATCHED_LETTER_PENALTY = -1;

/**
 * Does a fuzzy search to find pattern inside a string.
 * @param {*} query string        pattern to search for
 * @param {*} text     string        string which is being searched
 * @returns [boolean, number]       a boolean which tells if pattern was
 *                                  found or not and a search score
 */
export const fuzzyMatch = (query: string, text: string) => {
  const recursionCount = 0;
  const recursionLimit = 10;
  const maxMatches = 256;

  return fuzzyMatchRecursive({
    query,
    text,
    queryCurIndex: 0,
    textCurrIndex: 0,
    srcMatces: null,
    matches: [],
    maxMatches: 256,
    nextMatch: 0,
    recursionCount,
    recursionLimit,
  });
};

type RecursionParams = {
  query: string;
  text: string;
  queryCurIndex: number;
  textCurrIndex: number;
  srcMatces: any;
  matches: number[];
  maxMatches: number;
  nextMatch: number;
  recursionCount: number;
  recursionLimit: number;
};
const fuzzyMatchRecursive = ({
  query,
  text,
  queryCurIndex,
  textCurrIndex,
  srcMatces,
  matches,
  maxMatches,
  nextMatch,
  recursionCount,
  recursionLimit,
}: RecursionParams): [boolean, number] => {
  console.log('query', query);
  console.log('text', text);

  let outScore = 0;

  while (queryCurIndex < query.length && textCurrIndex < text.length) {
    if (
      query[queryCurIndex].toLowerCase() === text[textCurrIndex].toLowerCase()
    ) {
      if (nextMatch >= maxMatches) {
        return [false, outScore];
      }

      // matches[nextMatch++] = textCurrIndex;
      ++queryCurIndex;
    }
    ++textCurrIndex;
  }

  return [false, outScore];
};

// function fuzzyMatchRecursiveOld(
//   query: string,
//   text: string,
//   queryCurIndex: number,
//   textCurrIndex: number,
//   srcMatces: any,
//   matches: any,
//   maxMatches: number,
//   nextMatch: any,
//   recursionCount: number,
//   recursionLimit: number
// ) {
//   let outScore = 0;
//
//   // Return if recursion limit is reached.
//   if (++recursionCount >= recursionLimit) {
//     return [false, outScore];
//   }
//
//   // Return if we reached ends of strings.
//   if (queryCurIndex === query.length || textCurrIndex === text.length) {
//     return [false, outScore];
//   }
//
//   // Recursion params
//   let recursiveMatch = false;
//   let bestRecursiveMatches: any = [];
//   let bestRecursiveScore = 0;
//
//   // Loop through pattern and str looking for a match.
//   let firstMatch = true;
//   while (queryCurIndex < query.length && textCurrIndex < text.length) {
//     // Match found.
//     if (
//       query[queryCurIndex].toLowerCase() === text[textCurrIndex].toLowerCase()
//     ) {
//       if (nextMatch >= maxMatches) {
//         return [false, outScore];
//       }
//
//       if (firstMatch && srcMatces) {
//         matches = [...srcMatces];
//         firstMatch = false;
//       }
//
//       recursiveMatches = [];
//       const [matched, recursiveScore] = fuzzyMatchRecursive(
//         query,
//         text,
//         queryCurIndex,
//         textCurrIndex + 1,
//         matches,
//         recursiveMatches,
//         maxMatches,
//         nextMatch,
//         recursionCount,
//         recursionLimit
//       );
//
//       if (matched) {
//         // Pick best recursive score.
//         if (!recursiveMatch || recursiveScore > bestRecursiveScore) {
//           bestRecursiveMatches = [...recursiveMatches];
//           bestRecursiveScore = recursiveScore;
//         }
//         recursiveMatch = true;
//       }
//
//       matches[nextMatch++] = textCurrIndex;
//       ++queryCurIndex;
//     }
//     ++textCurrIndex;
//   }
//
//   const matched = queryCurIndex === query.length;
//
//   if (matched) {
//     outScore = 100;
//
//     // Apply leading letter penalty
//     let penalty = LEADING_LETTER_PENALTY * matches[0];
//     penalty =
//       penalty < MAX_LEADING_LETTER_PENALTY
//         ? MAX_LEADING_LETTER_PENALTY
//         : penalty;
//     outScore += penalty;
//
//     //Apply unmatched penalty
//     const unmatched = text.length - nextMatch;
//     outScore += UNMATCHED_LETTER_PENALTY * unmatched;
//
//     // Apply ordering bonuses
//     for (let i = 0; i < nextMatch; i++) {
//       const currIdx = matches[i];
//
//       if (i > 0) {
//         const prevIdx = matches[i - 1];
//         if (currIdx == prevIdx + 1) {
//           outScore += SEQUENTIAL_BONUS;
//         }
//       }
//
//       // Check for bonuses based on neighbor character value.
//       if (currIdx > 0) {
//         // Camel case
//         const neighbor = text[currIdx - 1];
//         const curr = text[currIdx];
//         if (
//           neighbor === neighbor.toLowerCase() &&
//           curr === curr.toUpperCase()
//         ) {
//           outScore += CAMEL_BONUS;
//         }
//         const isNeighbourSeparator = neighbor == '_' || neighbor == ' ';
//         if (isNeighbourSeparator) {
//           outScore += SEPARATOR_BONUS;
//         }
//       } else {
//         // First letter
//         outScore += FIRST_LETTER_BONUS;
//       }
//     }
//
//     // Return best result
//     if (recursiveMatch && (!matched || bestRecursiveScore > outScore)) {
//       // Recursive score is better than "this"
//       matches = [...bestRecursiveMatches];
//       outScore = bestRecursiveScore;
//       return [true, outScore];
//     } else if (matched) {
//       // "this" score is better than recursive
//       return [true, outScore];
//     } else {
//       return [false, outScore];
//     }
//   }
//   return [false, outScore];
// }
