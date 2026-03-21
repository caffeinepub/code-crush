import { useRef } from "react";

/**
 * Returns a function that picks a response from an array without
 * repeating the same item consecutively. When all items have been
 * used it resets so the cycle can start again.
 */
export function useResponseQueue() {
  // Map from array reference identity to shuffled queue
  const queuesRef = useRef<Map<string, number[]>>(new Map());
  const lastPickedRef = useRef<Map<string, number>>(new Map());

  const pick = (arr: string[], key: string): string => {
    if (!arr.length) return "";
    if (arr.length === 1) return arr[0];

    let queue = queuesRef.current.get(key);
    if (!queue || queue.length === 0) {
      // Build a shuffled index list, excluding the last picked index
      // to prevent the same item appearing at the seam of two cycles.
      const lastIdx = lastPickedRef.current.get(key) ?? -1;
      const indices = arr
        .map((_, i) => i)
        .filter((i) => i !== lastIdx)
        .sort(() => Math.random() - 0.5);
      // Append the excluded index at the end so it gets used eventually
      if (lastIdx >= 0 && lastIdx < arr.length) {
        indices.push(lastIdx);
      }
      queue = indices;
    }

    const idx = queue.shift()!;
    queuesRef.current.set(key, queue);
    lastPickedRef.current.set(key, idx);
    return arr[idx];
  };

  return pick;
}
