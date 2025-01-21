/**
 * @description Gauss formula to calculate the sum of integers from 1 to n
 * @param n - The upper limit of the sum (inclusive)
 * @returns The sum of integers from 1 to n
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 *
 * Advantages:
 * - Most efficient in terms of both time and space.
 * - No risk of stack overflow.
 *
 * Disadvantages:
 * - Susceptible to integer overflow for very large n.
 */
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * @description Calculates the sum of integers from 1 to n using a loop
 * @param n - The upper limit of the sum (inclusive)
 * @returns The sum of integers from 1 to n
 * Time Complexity: O(n) - Iterates from 1 to n
 * Space Complexity: O(1) - Constant space usage
 *
 * Advantages:
 * - Simple and easy to understand.
 * - No risk of stack overflow, making it stable for large values of n.
 *
 * Disadvantages:
 * - Slower than the Gauss formula for large n due to the loop.
 * - Susceptible to integer overflow for very large n.
 */
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * @description Calculates the sum of integers from 1 to n using recursion
 * @param n - The upper limit of the sum (inclusive)
 * @returns The sum of integers from 1 to n
 * Time Complexity: O(n) - Each recursive call processes one number.
 * Space Complexity: O(n) - Call stack grows with n levels of recursion.
 *
 * Advantages:
 * - Short and expressive code, suitable for understanding recursion.
 *
 * Disadvantages:
 * - Inefficient in terms of memory usage compared to other methods.
 * - Risks stack overflow for large n due to the depth of recursion.
 */
function sum_to_n_c(n: number): number {
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
}
