/**
 * @param {Array<number>} arr
 * @description
 * Extremely optimized sum function for arrays
 */
export const sum = (arr) => {
  let sum = 0;
  for (let i = arr.length; i--; ) sum += arr[i];
  return sum;
};
