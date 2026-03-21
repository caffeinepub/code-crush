export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  xp: number;
}

export const quizData: Record<string, QuizQuestion[]> = {
  "Data Structures": [
    {
      q: "What is the time complexity of accessing an element in an array?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correct: 1,
      xp: 10,
    },
    {
      q: "Which data structure uses LIFO?",
      options: ["Queue", "Array", "Stack", "LinkedList"],
      correct: 2,
      xp: 10,
    },
    {
      q: "What is a Binary Search Tree property?",
      options: [
        "All nodes equal",
        "Left < Root < Right",
        "Right < Root < Left",
        "Random order",
      ],
      correct: 1,
      xp: 15,
    },
    {
      q: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correct: 1,
      xp: 10,
    },
    {
      q: "What is the time complexity of searching in a balanced BST?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correct: 2,
      xp: 15,
    },
    {
      q: "A Hash Map provides average time complexity of ___ for lookup.",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correct: 2,
      xp: 10,
    },
    {
      q: "Which traversal visits nodes in Left-Root-Right order?",
      options: ["Pre-order", "In-order", "Post-order", "Level-order"],
      correct: 1,
      xp: 15,
    },
    {
      q: "What data structure is used to implement a recursive call stack?",
      options: ["Queue", "Heap", "Stack", "Linked List"],
      correct: 2,
      xp: 10,
    },
  ],
  Algorithms: [
    {
      q: "What is the best case for Bubble Sort?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
      correct: 2,
      xp: 10,
    },
    {
      q: "Which algorithm uses divide and conquer?",
      options: ["Bubble Sort", "Merge Sort", "Linear Search", "Insertion Sort"],
      correct: 1,
      xp: 15,
    },
    {
      q: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correct: 2,
      xp: 15,
    },
    {
      q: "Dijkstra's algorithm is used for?",
      options: [
        "Sorting arrays",
        "Shortest path in graphs",
        "Finding cycles",
        "String matching",
      ],
      correct: 1,
      xp: 20,
    },
    {
      q: "What is the worst case time complexity of Quick Sort?",
      options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
      correct: 2,
      xp: 15,
    },
    {
      q: "Which algorithm is used in BFS graph traversal?",
      options: ["Stack", "Queue", "Heap", "Array"],
      correct: 1,
      xp: 15,
    },
    {
      q: "Dynamic Programming solves problems by?",
      options: [
        "Random guessing",
        "Brute force only",
        "Breaking into overlapping subproblems",
        "Using recursion without memoization",
      ],
      correct: 2,
      xp: 20,
    },
  ],
  Python: [
    {
      q: "What keyword defines a function in Python?",
      options: ["function", "def", "fn", "func"],
      correct: 1,
      xp: 10,
    },
    {
      q: "What does len() return?",
      options: [
        "Last element",
        "First element",
        "Length of object",
        "Data type",
      ],
      correct: 2,
      xp: 10,
    },
    {
      q: "Which of these is a mutable data type in Python?",
      options: ["Tuple", "String", "List", "Integer"],
      correct: 2,
      xp: 15,
    },
    {
      q: "What does the 'self' keyword represent in Python classes?",
      options: [
        "A global variable",
        "The class itself",
        "The current instance",
        "A static method",
      ],
      correct: 2,
      xp: 15,
    },
    {
      q: "Which operator is used for list comprehension filtering?",
      options: ["filter", "where", "if", "select"],
      correct: 2,
      xp: 15,
    },
    {
      q: "What does 'pass' do in Python?",
      options: [
        "Exits a loop",
        "Does nothing (placeholder)",
        "Returns a value",
        "Raises an error",
      ],
      correct: 1,
      xp: 10,
    },
    {
      q: "Which method adds an element to the end of a list?",
      options: ["add()", "insert()", "push()", "append()"],
      correct: 3,
      xp: 10,
    },
  ],
  "HTML/CSS": [
    {
      q: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style System",
        "Coded Style Syntax",
      ],
      correct: 1,
      xp: 10,
    },
    {
      q: "Which HTML tag creates a hyperlink?",
      options: ["<link>", "<href>", "<a>", "<url>"],
      correct: 2,
      xp: 10,
    },
    {
      q: "Which CSS property controls text size?",
      options: ["text-size", "font-size", "text-scale", "font-weight"],
      correct: 1,
      xp: 10,
    },
    {
      q: "What is the correct HTML element for the largest heading?",
      options: ["<h6>", "<head>", "<h1>", "<header>"],
      correct: 2,
      xp: 10,
    },
    {
      q: "Which CSS display value makes an element flexible?",
      options: ["block", "inline", "flex", "grid"],
      correct: 2,
      xp: 15,
    },
    {
      q: "What attribute is used to define CSS classes in HTML?",
      options: ["id", "style", "class", "type"],
      correct: 2,
      xp: 10,
    },
  ],
  OOP: [
    {
      q: "What is encapsulation?",
      options: [
        "Hiding internal state",
        "Multiple inheritance",
        "Function overloading",
        "Memory allocation",
      ],
      correct: 0,
      xp: 15,
    },
    {
      q: "Which OOP concept allows a class to inherit properties?",
      options: ["Polymorphism", "Abstraction", "Inheritance", "Encapsulation"],
      correct: 2,
      xp: 10,
    },
    {
      q: "What is polymorphism?",
      options: [
        "One class only",
        "Same interface, different behavior",
        "No inheritance",
        "Static methods only",
      ],
      correct: 1,
      xp: 15,
    },
    {
      q: "What keyword is used to create an instance of a class?",
      options: ["create", "make", "new", "init"],
      correct: 2,
      xp: 10,
    },
    {
      q: "What is abstraction in OOP?",
      options: [
        "Showing all details",
        "Hiding implementation, showing only interface",
        "Copying classes",
        "Static typing",
      ],
      correct: 1,
      xp: 15,
    },
    {
      q: "What is a constructor?",
      options: [
        "A method that deletes objects",
        "A special method called when creating an object",
        "A static variable",
        "An abstract class",
      ],
      correct: 1,
      xp: 10,
    },
  ],
  JavaScript: [
    {
      q: "What keyword declares a block-scoped variable in JavaScript?",
      options: ["var", "let", "set", "define"],
      correct: 1,
      xp: 10,
    },
    {
      q: "What does === check in JavaScript?",
      options: ["Value only", "Type only", "Value and type", "Reference only"],
      correct: 2,
      xp: 15,
    },
    {
      q: "Which method converts a JSON string to a JavaScript object?",
      options: [
        "JSON.stringify()",
        "JSON.parse()",
        "JSON.convert()",
        "JSON.decode()",
      ],
      correct: 1,
      xp: 10,
    },
    {
      q: "What is a Promise in JavaScript?",
      options: [
        "A loop structure",
        "An object representing async operation",
        "A type of variable",
        "A CSS selector",
      ],
      correct: 1,
      xp: 15,
    },
    {
      q: "Which array method creates a new array with filtered elements?",
      options: ["map()", "reduce()", "filter()", "forEach()"],
      correct: 2,
      xp: 10,
    },
    {
      q: "What does 'async/await' handle in JavaScript?",
      options: [
        "Synchronous code",
        "CSS animations",
        "Asynchronous operations",
        "Memory management",
      ],
      correct: 2,
      xp: 15,
    },
  ],
  Networking: [
    {
      q: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "High Transfer Text Protocol",
        "Hyperlink Transfer Process",
        "Host Text Transfer Protocol",
      ],
      correct: 0,
      xp: 10,
    },
    {
      q: "Which HTTP method is used to retrieve data?",
      options: ["POST", "PUT", "GET", "DELETE"],
      correct: 2,
      xp: 10,
    },
    {
      q: "What port does HTTPS use by default?",
      options: ["80", "8080", "443", "22"],
      correct: 2,
      xp: 15,
    },
    {
      q: "What does DNS stand for?",
      options: [
        "Dynamic Network Service",
        "Domain Name System",
        "Data Node Server",
        "Distributed Network Structure",
      ],
      correct: 1,
      xp: 10,
    },
    {
      q: "Which layer of the OSI model handles routing?",
      options: ["Transport", "Data Link", "Network", "Application"],
      correct: 2,
      xp: 20,
    },
  ],
  "Operating Systems": [
    {
      q: "What is a deadlock in OS?",
      options: [
        "A fast process",
        "Processes waiting for each other indefinitely",
        "Memory overflow",
        "CPU overload",
      ],
      correct: 1,
      xp: 15,
    },
    {
      q: "What does CPU scheduling determine?",
      options: [
        "Memory allocation",
        "Which process runs next",
        "Disk usage",
        "Network bandwidth",
      ],
      correct: 1,
      xp: 15,
    },
    {
      q: "What is virtual memory?",
      options: [
        "Extra RAM",
        "Disk space used as RAM extension",
        "GPU memory",
        "Cache memory",
      ],
      correct: 1,
      xp: 15,
    },
    {
      q: "What is a process vs a thread?",
      options: [
        "They are the same",
        "Process is heavier, thread is lighter unit of execution",
        "Thread is heavier",
        "Thread cannot share memory",
      ],
      correct: 1,
      xp: 20,
    },
  ],
};

export const TOPICS = Object.keys(quizData);
