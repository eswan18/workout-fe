// Returns the top N most common elements in the array, starting with the most common.
// Ignores undefined and null values.
export function nMostCommon<T>(n: number, arr: T[]): T[] {
  const freqMap: Map<T, number> = new Map();

  arr.forEach(item => {
      if (item !== undefined && item !== null) {
          freqMap.set(item, (freqMap.get(item) || 0) + 1);
      }
  });

  // Sort the keys by frequency
  const sortedKeys = Array.from(freqMap.keys()).sort((a, b) => {
      return freqMap.get(b)! - freqMap.get(a)!;
  });

  // Return the top n keys
  return sortedKeys.slice(0, n);
}