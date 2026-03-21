export interface CodingProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  tags: string[];
  desc: string;
  inputDesc: string;
  outputDesc: string;
  examples: { input: string; output: string; comment?: string }[];
  hint: string;
  template: string;
}

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Medium",
    topic: "Arrays",
    tags: ["#array", "#hash-map", "#two-pointers"],
    desc: "Given an array of integers and a target sum, return the indices of two numbers that add up to the target.",
    inputDesc: "An array nums and target integer",
    outputDesc:
      "Return array of two indices [i, j] where nums[i] + nums[j] equals target",
    examples: [
      {
        input: "nums=[2,7,11,15], target=9",
        output: "[0,1]",
        comment: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      { input: "nums=[3,2,4], target=6", output: "[1,2]" },
    ],
    hint: "Use a hash map to store each number and its index. For each number, check if (target - number) exists in the map. This gives O(n) time complexity.",
    template:
      "function twoSum(nums, target) {\n  // Your code here\n  // Return [index1, index2]\n}",
  },
  {
    id: "sum-two",
    title: "Sum Two Numbers",
    difficulty: "Easy",
    topic: "Variables",
    tags: ["#variables", "#arithmetic"],
    desc: "Write a program that takes two numbers and returns their sum.",
    inputDesc: "Two integers a and b",
    outputDesc: "Return a + b",
    examples: [
      { input: "a=3, b=5", output: "8" },
      { input: "a=-1, b=10", output: "9" },
    ],
    hint: "Simply use the + operator to add the two numbers together.",
    template: "function sumTwo(a, b) {\n  // Your code here\n}",
  },
  {
    id: "check-even-odd",
    title: "Check Even or Odd",
    difficulty: "Easy",
    topic: "Conditionals",
    tags: ["#conditionals", "#modulo"],
    desc: "Write a program that checks if a number is even or odd.",
    inputDesc: "An integer n",
    outputDesc: "Return 'even' or 'odd'",
    examples: [
      { input: "n=4", output: "'even'" },
      { input: "n=7", output: "'odd'" },
    ],
    hint: "Use the modulo operator %. If n % 2 === 0, it's even, otherwise it's odd.",
    template: "function checkEvenOdd(n) {\n  // Your code here\n}",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Arrays",
    tags: ["#array", "#binary-search"],
    desc: "Given a sorted array of integers and a target, write a function to search for the target. Return the index if found, otherwise return -1.",
    inputDesc: "Sorted array nums and target integer",
    outputDesc: "Return index of target or -1",
    examples: [
      { input: "nums=[-1,0,3,5,9,12], target=9", output: "4" },
      { input: "nums=[1,2,3,4], target=6", output: "-1" },
    ],
    hint: "Use two pointers (left, right). Check the mid point. If mid < target, move left up. If mid > target, move right down.",
    template:
      "function binarySearch(nums, target) {\n  // Your code here\n  // Return index or -1\n}",
  },
  {
    id: "reverse-string",
    title: "Reverse a String",
    difficulty: "Easy",
    topic: "Strings",
    tags: ["#strings", "#arrays"],
    desc: "Write a function that takes a string and returns it reversed.",
    inputDesc: "A string s",
    outputDesc: "Return the reversed string",
    examples: [
      { input: "s='hello'", output: "'olleh'" },
      { input: "s='code'", output: "'edoc'" },
    ],
    hint: "Split the string into an array using split(''), reverse it with reverse(), then join back with join('').",
    template: "function reverseString(s) {\n  // Your code here\n}",
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "Easy",
    topic: "Conditionals",
    tags: ["#conditionals", "#loops"],
    desc: "Write a function that returns Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for multiples of both, and the number otherwise.",
    inputDesc: "An integer n",
    outputDesc: "Return 'Fizz', 'Buzz', 'FizzBuzz', or the number as string",
    examples: [
      { input: "n=3", output: "'Fizz'" },
      { input: "n=15", output: "'FizzBuzz'" },
    ],
    hint: "Check divisibility by 15 first (FizzBuzz case), then 3 (Fizz), then 5 (Buzz). Use the modulo % operator.",
    template: "function fizzBuzz(n) {\n  // Your code here\n}",
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Medium",
    topic: "Strings",
    tags: ["#strings", "#two-pointers"],
    desc: "A phrase is a palindrome if it reads the same forward and backward ignoring non-alphanumeric characters and case.",
    inputDesc: "A string s",
    outputDesc: "Return true if palindrome, false otherwise",
    examples: [
      { input: "s='A man a plan a canal Panama'", output: "true" },
      { input: "s='race a car'", output: "false" },
    ],
    hint: "Clean the string first (keep only alphanumeric chars, convert to lowercase). Then use two pointers from both ends comparing characters.",
    template: "function isPalindrome(s) {\n  // Your code here\n}",
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    tags: ["#dynamic-programming", "#arrays"],
    desc: "Given an integer array, find the subarray with the largest sum and return its sum using Kadane's Algorithm.",
    inputDesc: "An integer array nums",
    outputDesc: "Return the maximum subarray sum",
    examples: [
      {
        input: "nums=[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        comment: "Subarray [4,-1,2,1] has the largest sum = 6",
      },
      { input: "nums=[1]", output: "1" },
    ],
    hint: "Kadane's Algorithm: keep a running currentMax. At each step, either extend the current subarray (currentMax + num) or start a new one (num), whichever is bigger.",
    template:
      "function maxSubarray(nums) {\n  // Your code here\n  // Hint: use Kadane's Algorithm\n}",
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    tags: ["#dynamic-programming", "#fibonacci"],
    desc: "You are climbing a staircase with n steps. You can climb 1 or 2 steps at a time. How many distinct ways can you reach the top?",
    inputDesc: "An integer n (number of steps)",
    outputDesc: "Return the number of distinct ways to climb to the top",
    examples: [
      { input: "n=2", output: "2", comment: "1+1 or 2" },
      { input: "n=3", output: "3", comment: "1+1+1, 1+2, or 2+1" },
    ],
    hint: "This is the Fibonacci sequence! ways(n) = ways(n-1) + ways(n-2). Base cases: ways(1)=1, ways(2)=2.",
    template:
      "function climbStairs(n) {\n  // Your code here\n  // Hint: Fibonacci pattern!\n}",
  },
  {
    id: "merge-k-sorted",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Linked Lists",
    tags: ["#linked-list", "#heap"],
    desc: "You are given an array of k linked lists, each linked list is sorted in ascending order. Merge all the linked lists into one sorted linked list.",
    inputDesc: "Array of k sorted linked lists (as arrays for simplicity)",
    outputDesc: "Return the merged sorted array",
    examples: [
      { input: "lists=[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists=[]", output: "[]" },
    ],
    hint: "Use a min-heap (priority queue) to always extract the smallest element from all list heads. Or merge lists pairwise like merge sort.",
    template:
      "function mergeKLists(lists) {\n  // Your code here\n  // Hint: Use a min-heap or divide & conquer\n}",
  },
];
