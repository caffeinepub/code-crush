import type { DocLink } from "./roadmaps";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CQuizQuestion {
  question: string;
  options: string[];
  correct: number;
  xp: number;
}

export interface CTestProblem {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  expectedOutput?: string;
  hints: string[];
}

export interface CPart {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  notes: string;
  docs: DocLink[];
  partQuiz: CQuizQuestion[];
}

export interface CModule {
  id: string;
  title: string;
  outcome: string;
  isLocked: boolean;
  parts: CPart[];
  moduleQuiz: CQuizQuestion[];
  moduleTest: CTestProblem[];
}

// ─── Module 1: Introduction & Basics ─────────────────────────────────────────

const module1: CModule = {
  id: "c-intro",
  title: "Module 1: Introduction & Basics",
  outcome: "Develop Simple Algorithms for Arithmetic and Logical Problems.",
  isLocked: false,
  parts: [
    {
      id: "c-intro-p1",
      title: "Part 1: Computer System Components",
      description:
        "Memory, Processor, I/O Devices, Storage, OS, Assembler, Compiler, Interpreter, Loader and Linker.",
      videoUrl: "https://www.youtube.com/watch?v=zOjov-2OZ0E",
      notes: `COMPUTER SYSTEM OVERVIEW
========================

A computer system consists of hardware and software working together to process information.

HARDWARE COMPONENTS
--------------------
• Memory (RAM): Volatile storage that holds data and instructions currently in use. Measured in GB. Faster access than disk.
• Processor (CPU): The brain of the computer. Executes instructions, performs arithmetic, logic and control operations. Clock speed in GHz.
• I/O Devices: Input (keyboard, mouse, scanner) send data to CPU. Output (monitor, printer, speaker) receive data from CPU.
• Storage: Non-volatile — HDD (magnetic, slower, cheap) or SSD (flash, faster, costlier). Holds OS, programs, and files permanently.
• Motherboard: Main circuit board connecting all components via buses.

SOFTWARE LAYERS
---------------
• Operating System (OS): Manages hardware resources, provides a user interface, and runs programs. Examples: Windows, Linux, macOS. Key functions: process management, memory management, file system, I/O management.

LANGUAGE PROCESSING TOOLS
--------------------------
• Assembler: Translates Assembly language (mnemonics like MOV, ADD) into machine code (binary). One-to-one translation.
• Compiler: Translates an entire high-level program (like C) into machine code in one pass. Output is an executable file. Errors shown after full compilation. Examples: GCC, Clang.
• Interpreter: Translates and executes code line-by-line at runtime. Slower but easier to debug. Examples: Python interpreter, JavaScript engines.
• Loader: Part of OS that loads an executable file from disk into RAM and prepares it for execution. Resolves addresses.
• Linker: Combines multiple object files (.o) and library files into a single executable. Resolves external symbol references (e.g., printf from libc).

COMPILATION PROCESS (C Program)
---------------------------------
Source Code (.c) → Preprocessor → Expanded Source → Compiler → Assembly Code (.s) → Assembler → Object Code (.o) → Linker → Executable

KEY DISTINCTION
---------------
• Compiler vs Interpreter: Compiler produces a standalone executable (faster execution). Interpreter needs to be present at runtime (slower, more portable).
• Loader vs Linker: Linker works at compile-time to combine files. Loader works at runtime to bring executable into memory.`,
      docs: [
        {
          label: "C Reference Manual (cppreference)",
          url: "https://en.cppreference.com/w/c",
        },
        {
          label: "GCC Online Documentation",
          url: "https://gcc.gnu.org/onlinedocs/",
        },
        {
          label: "How Computers Work – Khan Academy",
          url: "https://www.khanacademy.org/computing/computer-science/how-computers-work2",
        },
        {
          label: "Operating Systems Overview – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/introduction-of-operating-system-set-1/",
        },
      ],
      partQuiz: [
        {
          question:
            "Which component of a computer is responsible for executing instructions?",
          options: ["RAM", "Hard Disk", "CPU (Processor)", "Monitor"],
          correct: 2,
          xp: 10,
        },
        {
          question: "What type of memory is RAM?",
          options: [
            "Non-volatile",
            "Permanent storage",
            "Volatile (loses data when powered off)",
            "Read-only",
          ],
          correct: 2,
          xp: 10,
        },
        {
          question: "What does a Compiler do?",
          options: [
            "Executes code line by line",
            "Translates entire source code to machine code at once",
            "Connects object files into an executable",
            "Loads programs into memory",
          ],
          correct: 1,
          xp: 15,
        },
        {
          question:
            "Which tool combines multiple object files into one executable?",
          options: ["Compiler", "Assembler", "Interpreter", "Linker"],
          correct: 3,
          xp: 15,
        },
        {
          question: "What is the role of the Loader in a computer system?",
          options: [
            "Compiles source code",
            "Links object files",
            "Loads executable into RAM for execution",
            "Interprets scripts",
          ],
          correct: 2,
          xp: 10,
        },
      ],
    },
    {
      id: "c-intro-p2",
      title: "Part 2: Algorithm Representation",
      description:
        "Flowcharts, Pseudo Code, Source Code, and the journey from idea to program.",
      videoUrl: "https://www.youtube.com/watch?v=6hfOvs8pY1k",
      notes: `ALGORITHMS AND THEIR REPRESENTATION
=====================================

WHAT IS AN ALGORITHM?
---------------------
An algorithm is a finite, ordered set of well-defined instructions to solve a problem or accomplish a task. Properties:
• Finiteness: Must terminate after a finite number of steps.
• Definiteness: Each step must be precise and unambiguous.
• Input: Zero or more inputs.
• Output: One or more outputs.
• Effectiveness: Each step must be basic enough to be done in finite time.

FLOWCHARTS
-----------
A visual diagram using standardized symbols:
• Oval/Rounded Rectangle: Start / End (Terminal)
• Rectangle: Process (calculation, assignment)
• Diamond: Decision (Yes/No or True/False branch)
• Parallelogram: Input / Output
• Arrow: Flow of control

Example — Find larger of two numbers:
  START → Input A, B → Is A > B? → Yes: Print A → END
                                 → No:  Print B → END

PSEUDOCODE
-----------
A human-readable description of an algorithm using plain English mixed with programming constructs. No strict syntax rules.

Example:
  BEGIN
    READ num1, num2
    IF num1 > num2 THEN
      PRINT num1, "is larger"
    ELSE
      PRINT num2, "is larger"
    END IF
  END

FROM ALGORITHM TO SOURCE CODE
------------------------------
1. Understand the problem clearly.
2. Design the algorithm (pseudocode or flowchart).
3. Write source code in a programming language (C, Python, etc.).
4. Compile/run and test.
5. Debug if output is incorrect.

Source code is the human-readable form of a program written in a language like C. It is then compiled into machine code the computer can execute.

GOOD ALGORITHM CHARACTERISTICS
--------------------------------
• Correctness — produces correct output for all valid inputs.
• Efficiency — uses minimal time and memory.
• Clarity — easy to understand and maintain.`,
      docs: [
        {
          label: "Algorithm – Wikipedia",
          url: "https://en.wikipedia.org/wiki/Algorithm",
        },
        {
          label: "Flowchart Guide – Lucidchart",
          url: "https://www.lucidchart.com/pages/what-is-a-flowchart-tutorial",
        },
        {
          label: "Pseudocode – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/how-to-write-a-pseudo-code/",
        },
      ],
      partQuiz: [
        {
          question: "Which shape represents a Decision in a flowchart?",
          options: ["Rectangle", "Oval", "Diamond", "Parallelogram"],
          correct: 2,
          xp: 10,
        },
        {
          question: "Which shape represents Input/Output in a flowchart?",
          options: ["Rectangle", "Diamond", "Oval", "Parallelogram"],
          correct: 3,
          xp: 10,
        },
        {
          question: "Pseudocode is:",
          options: [
            "Machine-readable code",
            "A strict programming language",
            "A human-readable algorithm description without strict syntax",
            "Binary instructions",
          ],
          correct: 2,
          xp: 10,
        },
        {
          question: "What is NOT a required property of an algorithm?",
          options: [
            "Finiteness",
            "Definiteness",
            "Use of loops",
            "At least one output",
          ],
          correct: 2,
          xp: 15,
        },
        {
          question:
            "What comes immediately after writing pseudocode in the development process?",
          options: [
            "Testing",
            "Writing source code",
            "Compilation",
            "Deployment",
          ],
          correct: 1,
          xp: 10,
        },
      ],
    },
    {
      id: "c-intro-p3",
      title: "Part 3: Programming Basics in C",
      description:
        "Structure of a C program, standard I/O, fundamental data types, variables, memory, and storage classes.",
      videoUrl: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
      notes: `BASICS OF C PROGRAMMING
========================

STRUCTURE OF A C PROGRAM
--------------------------
#include <stdio.h>      // Preprocessor directive — includes standard I/O library

int main() {            // main() is the entry point of every C program
    printf("Hello!");   // Statement — prints to console
    return 0;           // Returns 0 to OS (0 = success)
}

SYNTAX vs LOGICAL ERRORS
--------------------------
• Syntax Error: Violation of grammar rules — caught by compiler. Example: missing semicolon, undeclared variable.
• Logical Error: Program compiles and runs but produces wrong result. Must be found by testing.
• Object Code: Machine code produced by compiler from source code (.o file).
• Executable Code: Final runnable file after linking all object files.

STANDARD I/O IN C
------------------
• printf(): Output — printf("Sum = %d\\n", sum);
• scanf(): Input  — scanf("%d", &num);
Format specifiers: %d (int), %f (float), %c (char), %s (string), %lf (double)
Escape sequences: \\n (newline), \\t (tab), \\\\ (backslash)

FUNDAMENTAL DATA TYPES
-----------------------
| Type    | Size     | Range                    | Format |
|---------|----------|--------------------------|--------|
| int     | 4 bytes  | -2,147,483,648 to +2,147,483,647 | %d |
| float   | 4 bytes  | ~±3.4 × 10^38 (6 digits)   | %f |
| double  | 8 bytes  | ~±1.7 × 10^308 (15 digits) | %lf|
| char    | 1 byte   | -128 to 127 (ASCII)      | %c |
| void    | —        | No value / no return     | — |

VARIABLES AND MEMORY
---------------------
• A variable is a named memory location that stores a value.
• Declaration: int age;  (reserves memory)
• Initialization: int age = 20;  (reserves + assigns value)
• Rule: Must be declared before use. Names: letters, digits, underscore; cannot start with digit.

STORAGE CLASSES
----------------
• auto: Default for local variables. Created when block is entered, destroyed when exited.
• register: Hint to compiler to store in CPU register (faster access). Cannot take address.
• static: Retains value between function calls. Initialized only once.
• extern: Declares a variable defined in another file. Used for global scope across files.

Example:
  void counter() {
      static int count = 0;  // retains value across calls
      count++;
      printf("%d\\n", count);
  }`,
      docs: [
        {
          label: "C Data Types – cppreference",
          url: "https://en.cppreference.com/w/c/language/type",
        },
        {
          label: "C Storage Classes – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/storage-classes-in-c/",
        },
        {
          label: "C Programming Tutorial – Tutorialspoint",
          url: "https://www.tutorialspoint.com/cprogramming/index.htm",
        },
        {
          label: "W3Schools: C Variables",
          url: "https://www.w3schools.com/c/c_variables.php",
        },
      ],
      partQuiz: [
        {
          question: "What is the entry point function of every C program?",
          options: ["start()", "begin()", "main()", "run()"],
          correct: 2,
          xp: 10,
        },
        {
          question: "Which format specifier is used for a float in printf()?",
          options: ["%d", "%c", "%s", "%f"],
          correct: 3,
          xp: 10,
        },
        {
          question: "A variable declared with 'static' inside a function:",
          options: [
            "Is accessible globally",
            "Loses its value after function returns",
            "Retains its value between calls",
            "Cannot be modified",
          ],
          correct: 2,
          xp: 15,
        },
        {
          question: "What does the 'extern' storage class indicate?",
          options: [
            "Variable stored in CPU register",
            "Variable defined in another file",
            "Variable with no value",
            "Local variable",
          ],
          correct: 1,
          xp: 15,
        },
        {
          question: "Which data type occupies 1 byte of memory in C?",
          options: ["int", "float", "double", "char"],
          correct: 3,
          xp: 10,
        },
      ],
    },
  ],
  moduleQuiz: [
    {
      question: "Which tool translates Assembly language into machine code?",
      options: ["Compiler", "Interpreter", "Assembler", "Linker"],
      correct: 2,
      xp: 15,
    },
    {
      question: "In a flowchart, which symbol is used for Start/End?",
      options: ["Rectangle", "Diamond", "Parallelogram", "Oval"],
      correct: 3,
      xp: 10,
    },
    {
      question: "What is the correct way to read an integer in C?",
      options: [
        "scanf('%d', num)",
        'scanf("%d", num)',
        'scanf("%d", &num)',
        'input("%d", &num)',
      ],
      correct: 2,
      xp: 15,
    },
    {
      question:
        "Which storage class retains a local variable's value between function calls?",
      options: ["auto", "register", "extern", "static"],
      correct: 3,
      xp: 15,
    },
    {
      question: "A syntax error in C is detected by:",
      options: [
        "The programmer during review",
        "The OS at runtime",
        "The compiler during compilation",
        "The linker",
      ],
      correct: 2,
      xp: 10,
    },
  ],
  moduleTest: [
    {
      id: "c-intro-t1",
      title: "Hello World",
      description:
        "Write a complete C program that prints 'Hello, World!' to the console. Your program must include the necessary header file and have the correct main function structure.",
      starterCode:
        "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
      expectedOutput: "Hello, World!",
      hints: [
        "Use printf() function to print text to the console.",
        "Don't forget to include the <stdio.h> header at the top.",
        "The string should be exactly 'Hello, World!' followed by a newline character \\n.",
      ],
    },
    {
      id: "c-intro-t2",
      title: "Sum of Two Numbers",
      description:
        "Write a C program that reads two integers from the user and prints their sum. Use scanf() to read input and printf() to display the result.",
      starterCode:
        "#include <stdio.h>\n\nint main() {\n    int a, b, sum;\n    // Read two integers from user\n    \n    // Calculate sum\n    \n    // Print result\n    \n    return 0;\n}",
      expectedOutput: "Enter two numbers: Sum = <result>",
      hints: [
        'Use scanf("%d %d", &a, &b) to read two integers.',
        "Calculate sum as: sum = a + b;",
        'Use printf("Sum = %d\\n", sum) to display the result.',
      ],
    },
    {
      id: "c-intro-t3",
      title: "Temperature Conversion",
      description:
        "Write a C program that reads a temperature in Celsius and converts it to Fahrenheit. Formula: F = (C × 9/5) + 32. Use float data type for accuracy.",
      starterCode:
        "#include <stdio.h>\n\nint main() {\n    float celsius, fahrenheit;\n    // Read Celsius temperature\n    \n    // Convert to Fahrenheit using formula: F = (C * 9/5) + 32\n    \n    // Print result with 2 decimal places\n    \n    return 0;\n}",
      expectedOutput: "Temperature in Fahrenheit: <result>",
      hints: [
        'Use scanf("%f", &celsius) to read a float value.',
        "The conversion formula is: fahrenheit = (celsius * 9.0/5.0) + 32;",
        'Use printf("%.2f\\n", fahrenheit) to print with 2 decimal places.',
      ],
    },
  ],
};

// ─── Module 2: Operators & Control Flow ──────────────────────────────────────

const module2: CModule = {
  id: "c-operators",
  title: "Module 2: Operators & Control Flow",
  outcome: "Apply loop, decision making constructs to solve a given problem.",
  isLocked: true,
  parts: [
    {
      id: "c-ops-p1",
      title: "Part 1: Arithmetic Expressions & Operators",
      description:
        "Operators, Precedence, Type Conversion, Bit Operations, Assignment Operators.",
      videoUrl: "https://www.youtube.com/watch?v=8-lOHGMmgqE",
      notes: `OPERATORS IN C
===============

ARITHMETIC OPERATORS
---------------------
+  Addition        a + b
-  Subtraction     a - b
*  Multiplication  a * b
/  Division        a / b  (integer division if both operands are int)
%  Modulo          a % b  (remainder)

Example: 7 / 2 = 3 (int), 7.0 / 2 = 3.5 (float), 7 % 2 = 1

RELATIONAL OPERATORS
---------------------
>   Greater than       ==  Equal to
<   Less than          !=  Not equal to
>=  Greater or equal   <=  Less or equal
Returns 1 (true) or 0 (false)

LOGICAL OPERATORS
------------------
&&  Logical AND — true only if both operands are true
||  Logical OR  — true if at least one operand is true
!   Logical NOT — reverses the truth value

Short-circuit evaluation: In A && B, if A is false, B is never evaluated.

BITWISE OPERATORS
------------------
&   Bitwise AND    |   Bitwise OR    ^   Bitwise XOR
~   Bitwise NOT    <<  Left shift    >>  Right shift

Example: 5 & 3 → 0101 & 0011 = 0001 = 1
         5 | 3 → 0101 | 0011 = 0111 = 7
         5 << 1 → multiply by 2 = 10

ASSIGNMENT OPERATORS
---------------------
=   Simple assignment      +=  Add and assign
-=  Subtract and assign    *=  Multiply and assign
/=  Divide and assign      %=  Modulo and assign

OPERATOR PRECEDENCE (High → Low)
----------------------------------
1. () Parentheses
2. ++, -- (unary), ! (NOT), ~ (bitwise NOT)
3. *, /, %
4. +, -
5. <<, >> (bit shift)
6. <, <=, >, >=
7. ==, !=
8. & (bitwise AND)
9. ^ (bitwise XOR)
10. | (bitwise OR)
11. && (logical AND)
12. || (logical OR)
13. ?: (ternary)
14. =, +=, -= etc. (assignment)

TYPE CONVERSION
----------------
• Implicit (automatic): int + float → float. Lower type promoted to higher.
• Explicit (cast): (float) a / b forces float division.

Example: int a = 5; float result = (float) a / 2; // result = 2.5`,
      docs: [
        {
          label: "C Operator Precedence – cppreference",
          url: "https://en.cppreference.com/w/c/language/operator_precedence",
        },
        {
          label: "Bitwise Operators in C – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/",
        },
        {
          label: "Type Casting in C – Tutorialspoint",
          url: "https://www.tutorialspoint.com/cprogramming/c_type_casting.htm",
        },
      ],
      partQuiz: [
        {
          question: "What is the result of 10 % 3 in C?",
          options: ["3", "1", "0", "4"],
          correct: 1,
          xp: 10,
        },
        {
          question: "What is the result of 5 & 3 (bitwise AND)?",
          options: ["8", "7", "1", "2"],
          correct: 2,
          xp: 15,
        },
        {
          question: "Which operator has the highest precedence in C?",
          options: [
            "* (multiplication)",
            "= (assignment)",
            "() (parentheses)",
            "&& (logical AND)",
          ],
          correct: 2,
          xp: 10,
        },
        {
          question: "What does the left shift operator << do?",
          options: [
            "Divides by 2",
            "Multiplies by 2 for each shift",
            "Finds remainder",
            "Performs bitwise OR",
          ],
          correct: 1,
          xp: 15,
        },
        {
          question: "In C, what is the result of 7 / 2 when both are integers?",
          options: ["3.5", "3", "4", "2"],
          correct: 1,
          xp: 10,
        },
      ],
    },
    {
      id: "c-ops-p2",
      title: "Part 2: Conditional Branching",
      description: "Applying if, else if, switch statements and nesting.",
      videoUrl: "https://www.youtube.com/watch?v=lYFe2RJYHhI",
      notes: `CONDITIONAL BRANCHING IN C
===========================

IF STATEMENT
-------------
if (condition) {
    // executes if condition is true
}

IF-ELSE
--------
if (marks >= 50) {
    printf("Pass");
} else {
    printf("Fail");
}

IF-ELSE IF-ELSE (Ladder)
-------------------------
if (marks >= 90)      printf("Grade A");
else if (marks >= 75) printf("Grade B");
else if (marks >= 60) printf("Grade C");
else                  printf("Grade D");

NESTED IF
----------
if (age >= 18) {
    if (hasID) {
        printf("Entry allowed");
    } else {
        printf("Need ID");
    }
}

SWITCH STATEMENT
-----------------
switch (expression) {
    case value1:
        // code
        break;     // IMPORTANT: break prevents fall-through
    case value2:
        // code
        break;
    default:
        // runs if no case matches
}

Example — Day of week:
switch (day) {
    case 1: printf("Monday"); break;
    case 2: printf("Tuesday"); break;
    default: printf("Invalid day");
}

SWITCH vs IF-ELSE
------------------
• switch: Best for discrete integer/character values. Cleaner for many cases.
• if-else: Best for ranges, complex conditions, or non-integer comparisons.
• switch CANNOT use float or string comparisons.
• Fall-through: Without break, execution continues into next case.

TERNARY OPERATOR
-----------------
condition ? expr_if_true : expr_if_false;
Example: max = (a > b) ? a : b;`,
      docs: [
        {
          label: "C if Statement – cppreference",
          url: "https://en.cppreference.com/w/c/language/if",
        },
        {
          label: "C switch Statement – cppreference",
          url: "https://en.cppreference.com/w/c/language/switch",
        },
        {
          label: "Decision Making in C – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/",
        },
      ],
      partQuiz: [
        {
          question:
            "What happens in a switch statement if a 'break' is missing?",
          options: [
            "Compilation error",
            "Execution stops",
            "Fall-through to next case",
            "Default is executed",
          ],
          correct: 2,
          xp: 15,
        },
        {
          question:
            "Which of these cannot be used as a switch expression in C?",
          options: ["int", "char", "float", "short"],
          correct: 2,
          xp: 15,
        },
        {
          question:
            'What is the output: int x = 5; printf("%d", (x > 3) ? 10 : 20);',
          options: ["5", "3", "10", "20"],
          correct: 2,
          xp: 10,
        },
        {
          question:
            "Which clause in a switch statement executes when no case matches?",
          options: ["else", "otherwise", "default", "base"],
          correct: 2,
          xp: 10,
        },
        {
          question: "In an if-else if ladder, how many branches can execute?",
          options: [
            "All of them",
            "None",
            "Only the first matching one",
            "Only the last one",
          ],
          correct: 2,
          xp: 10,
        },
      ],
    },
    {
      id: "c-ops-p3",
      title: "Part 3: Iteration and Loops",
      description:
        "while, do-while, for loops, break, continue, and goto statements.",
      videoUrl: "https://www.youtube.com/watch?v=igCMjywN_qg",
      notes: `LOOPS IN C
===========

WHILE LOOP
-----------
Checks condition BEFORE executing body. May execute zero times.
int i = 1;
while (i <= 5) {
    printf("%d ", i);
    i++;
}
// Output: 1 2 3 4 5

DO-WHILE LOOP
--------------
Executes body FIRST, then checks condition. Always runs at least once.
int i = 1;
do {
    printf("%d ", i);
    i++;
} while (i <= 5);
// Use case: menu-driven programs (show menu first, then check choice)

FOR LOOP
---------
Best when number of iterations is known.
for (initialization; condition; update) {
    // body
}
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}

MULTIPLE LOOP VARIABLES
------------------------
for (int i = 0, j = 10; i < j; i++, j--) {
    printf("i=%d j=%d\\n", i, j);
}

NESTED LOOPS
-------------
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        printf("%d ", i * j);
    }
    printf("\\n");
}

LOOP CONTROL STATEMENTS
------------------------
• break: Immediately exits the innermost loop or switch.
  for (int i = 0; i < 10; i++) {
      if (i == 5) break;  // stops at 5
  }

• continue: Skips current iteration, jumps to next.
  for (int i = 0; i < 10; i++) {
      if (i % 2 == 0) continue;  // skips even numbers
      printf("%d ", i);  // prints odd: 1 3 5 7 9
  }

• goto: Jumps to a labelled statement. Avoid in structured code — makes code hard to read.
  goto label;
  ...
  label:
      printf("Jumped here");

WHEN TO USE WHICH LOOP
-----------------------
• for: Known iteration count (iterate 10 times, loop over array)
• while: Unknown count, check first (read until EOF)
• do-while: At least one execution guaranteed (menu, input validation)`,
      docs: [
        {
          label: "C while Statement – cppreference",
          url: "https://en.cppreference.com/w/c/language/while",
        },
        {
          label: "C for Statement – cppreference",
          url: "https://en.cppreference.com/w/c/language/for",
        },
        {
          label: "Loops in C – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/loops-in-c-and-cpp/",
        },
      ],
      partQuiz: [
        {
          question: "Which loop always executes its body at least once?",
          options: ["for", "while", "do-while", "goto"],
          correct: 2,
          xp: 10,
        },
        {
          question: "What does the 'continue' statement do inside a loop?",
          options: [
            "Exits the loop",
            "Restarts the program",
            "Skips the rest of current iteration and moves to next",
            "Breaks out of nested loops",
          ],
          correct: 2,
          xp: 15,
        },
        {
          question:
            'How many times does this execute: for(int i=0; i<0; i++) printf("Hi");',
          options: ["Infinite", "1", "0", "Error"],
          correct: 2,
          xp: 10,
        },
        {
          question:
            'What is the output of: int i=0; while(i<3){i++;} printf("%d", i);',
          options: ["0", "2", "3", "4"],
          correct: 2,
          xp: 15,
        },
        {
          question:
            "Which statement transfers control unconditionally to a labelled statement?",
          options: ["break", "continue", "return", "goto"],
          correct: 3,
          xp: 10,
        },
      ],
    },
  ],
  moduleQuiz: [
    {
      question: "What is the result of !0 in C?",
      options: ["0", "1", "-1", "undefined"],
      correct: 1,
      xp: 10,
    },
    {
      question: 'What will be the output: int x = 10; x += 5; printf("%d", x);',
      options: ["5", "10", "15", "50"],
      correct: 2,
      xp: 10,
    },
    {
      question:
        "Which loop is best suited when the number of iterations is known in advance?",
      options: ["while", "do-while", "for", "goto"],
      correct: 2,
      xp: 10,
    },
    {
      question:
        "In a switch statement, what is the purpose of the 'default' case?",
      options: [
        "It is mandatory",
        "Handles all unmatched cases",
        "Executes first",
        "Replaces break",
      ],
      correct: 1,
      xp: 15,
    },
    {
      question: "What does the 'break' statement do in a loop?",
      options: [
        "Skips current iteration",
        "Pauses the loop",
        "Exits the loop immediately",
        "Goes to next case",
      ],
      correct: 2,
      xp: 15,
    },
  ],
  moduleTest: [
    {
      id: "c-ops-t1",
      title: "Multiplication Table",
      description:
        "Write a C program that reads a number n from the user and prints its multiplication table from 1 to 10 using a for loop.",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int n;\n    printf("Enter a number: ");\n    // Read the number\n    \n    // Use a for loop to print multiplication table\n    \n    return 0;\n}`,
      expectedOutput: "n × 1 = n\nn × 2 = 2n\n...\nn × 10 = 10n",
      hints: [
        'Use scanf("%d", &n) to read the number.',
        "Loop from 1 to 10 using: for(int i = 1; i <= 10; i++)",
        'Inside the loop, print: printf("%d x %d = %d\\n", n, i, n*i);',
      ],
    },
    {
      id: "c-ops-t2",
      title: "Even or Odd",
      description:
        "Write a C program that reads an integer and prints whether it is Even or Odd using the modulo operator and an if-else statement.",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int num;\n    printf("Enter a number: ");\n    // Read the number\n    \n    // Check if even or odd and print result\n    \n    return 0;\n}`,
      expectedOutput: "<num> is Even / Odd",
      hints: [
        "A number is even if num % 2 == 0, odd otherwise.",
        "Use if (num % 2 == 0) to check for even.",
        'Use printf("%d is Even\\n", num) or printf("%d is Odd\\n", num).',
      ],
    },
    {
      id: "c-ops-t3",
      title: "Factorial of a Number",
      description:
        "Write a C program to compute the factorial of a non-negative integer n entered by the user. Print the result. (Hint: 5! = 5×4×3×2×1 = 120)",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int n;\n    long long factorial = 1;\n    printf("Enter a non-negative integer: ");\n    // Read n\n    \n    // Compute factorial using a loop\n    \n    // Print result\n    \n    return 0;\n}`,
      expectedOutput: "Factorial of n = <result>",
      hints: [
        "Use a for loop: for(int i = 1; i <= n; i++) factorial *= i;",
        "Use long long to handle large factorials.",
        "The factorial of 0 is 1 (edge case to handle).",
      ],
    },
  ],
};

// ─── Module 3: Arrays, Strings & Structures ──────────────────────────────────

const module3: CModule = {
  id: "c-arrays",
  title: "Module 3: Arrays, Strings & Structures",
  outcome:
    "Implement arrays, structures and union to formulate algorithms and programs and apply it for searching and sorting problems.",
  isLocked: true,
  parts: [
    {
      id: "c-arr-p1",
      title: "Part 1: Arrays, Strings, Structures, Union & Enum",
      description:
        "Array notation, multi-dimensional arrays, character arrays, strings, structures, union, enumerated data types, and array of structures.",
      videoUrl: "https://www.youtube.com/watch?v=AT14lCXuMKI",
      notes: `ARRAYS IN C
============

DECLARATION & INITIALIZATION
------------------------------
int marks[5];                     // Declares array of 5 ints
int marks[5] = {90, 85, 78, 92, 88};  // Initialize at declaration
int marks[] = {90, 85, 78, 92};   // Size inferred (4 elements)

ACCESSING ELEMENTS
-------------------
marks[0] = 90;    // Index starts from 0
marks[4] = 88;    // Last element is at index n-1
// Accessing out of bounds causes undefined behavior!

MULTI-DIMENSIONAL ARRAYS
--------------------------
int matrix[3][4];          // 3 rows, 4 columns
int mat[2][3] = {{1,2,3},{4,5,6}};
// Access: mat[row][col] → mat[1][2] = 6

CHARACTER ARRAYS AND STRINGS
------------------------------
char name[10] = "Alice";    // String stored as char array
// Strings end with null character '\\0'
// "Alice" = {'A','l','i','c','e','\\0'}
printf("%s", name);         // %s for string output

String functions (string.h):
  strlen(str)      — length (not counting '\\0')
  strcpy(dest,src) — copy string
  strcat(dest,src) — concatenate
  strcmp(s1,s2)    — compare (0 = equal)

STRUCTURES
-----------
Group variables of different types under one name.
struct Student {
    char name[50];
    int rollNo;
    float marks;
};
struct Student s1 = {"Alice", 101, 95.5};
printf("%s scored %.1f\\n", s1.name, s1.marks);

Access: s1.name (dot notation), ptr->name (arrow for pointer)

ARRAY OF STRUCTURES
--------------------
struct Student class[30];    // Array of 30 Student records
class[0].rollNo = 1;

UNION
------
Like a structure but all members share the SAME memory location.
Only one member can hold a value at a time. Memory = size of largest member.
union Data {
    int i;
    float f;
    char c;
};
union Data d; d.f = 3.14;  // Only d.f is valid now

ENUMERATED DATA TYPES (enum)
------------------------------
Assign names to integer constants for readability.
enum Day {MON=1, TUE, WED, THU, FRI, SAT, SUN};
enum Day today = WED;       // today = 3
printf("%d", today);        // prints 3`,
      docs: [
        {
          label: "C Arrays – cppreference",
          url: "https://en.cppreference.com/w/c/language/array",
        },
        {
          label: "C Structures – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/structures-c/",
        },
        {
          label: "C String Functions – Tutorialspoint",
          url: "https://www.tutorialspoint.com/c_standard_library/string_h.htm",
        },
        {
          label: "Union in C – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/union-c/",
        },
      ],
      partQuiz: [
        {
          question: "What is the index of the first element of an array in C?",
          options: ["1", "-1", "0", "Depends on declaration"],
          correct: 2,
          xp: 10,
        },
        {
          question: "What character terminates a string in C?",
          options: ["'\\n'", "'\\t'", "'\\0'", "' ' (space)"],
          correct: 2,
          xp: 10,
        },
        {
          question: "How does a union differ from a structure?",
          options: [
            "Union has more memory",
            "All members share the same memory location in union",
            "Union cannot have functions",
            "Structure doesn't allow int members",
          ],
          correct: 1,
          xp: 15,
        },
        {
          question: "Which string function copies one string into another?",
          options: ["strcat()", "strcmp()", "strlen()", "strcpy()"],
          correct: 3,
          xp: 10,
        },
        {
          question:
            "What is the memory size of union { int i; char c; double d; }?",
          options: [
            "Size of int",
            "Size of char",
            "Size of double (largest)",
            "Sum of all sizes",
          ],
          correct: 2,
          xp: 15,
        },
      ],
    },
    {
      id: "c-arr-p2",
      title: "Part 2: Searching and Sorting Algorithms",
      description: "Linear Search and Bubble Sort with implementation in C.",
      videoUrl: "https://www.youtube.com/watch?v=mGYB7bLHqA8",
      notes: `SEARCHING AND SORTING IN C
===========================

LINEAR SEARCH
--------------
Search each element one by one from start to end.
Time Complexity: O(n) — must check all n elements in worst case.
Best case: O(1) — found at first position.

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) return i;  // Return index if found
    }
    return -1;  // Not found
}

Usage: int pos = linearSearch(arr, 5, 78);

Advantages: Simple, works on unsorted data.
Disadvantage: Slow for large arrays.

BUBBLE SORT
------------
Repeatedly compare adjacent elements and swap if out of order.
After each pass, the largest unsorted element "bubbles" to its correct position.
Time Complexity: O(n²) — worst and average case.
Best case: O(n) — with optimization flag.

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int swapped = 0;
        for (int j = 0; j < n-1-i; j++) {
            if (arr[j] > arr[j+1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;  // Array already sorted — optimization
    }
}

EXAMPLE TRACE (Bubble Sort on [64, 34, 25, 12, 22])
------------------------------------------------------
Pass 1: [34, 25, 12, 22, 64] — 64 placed at end
Pass 2: [25, 12, 22, 34, 64] — 34 placed
Pass 3: [12, 22, 25, 34, 64] — 25 placed
Sorted! [12, 22, 25, 34, 64]

COMPARISON TABLE
-----------------
| Algorithm     | Best  | Avg   | Worst | Stable | In-place |
|---------------|-------|-------|-------|--------|----------|
| Linear Search | O(1)  | O(n)  | O(n)  | —      | —        |
| Bubble Sort   | O(n)  | O(n²) | O(n²) | Yes    | Yes      |`,
      docs: [
        {
          label: "Sorting Algorithms – Wikipedia",
          url: "https://en.wikipedia.org/wiki/Sorting_algorithm",
        },
        {
          label: "Linear Search – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/linear-search/",
        },
        {
          label: "Bubble Sort – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/bubble-sort/",
        },
        {
          label: "Visualizing Sorting – VisuAlgo",
          url: "https://visualgo.net/en/sorting",
        },
      ],
      partQuiz: [
        {
          question: "What is the worst-case time complexity of Linear Search?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correct: 2,
          xp: 10,
        },
        {
          question:
            "After the first complete pass of Bubble Sort on an array of n elements, which element is guaranteed to be in its correct position?",
          options: [
            "Smallest element",
            "First element",
            "Largest element",
            "Middle element",
          ],
          correct: 2,
          xp: 15,
        },
        {
          question:
            "What is the best-case time complexity of optimized Bubble Sort?",
          options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
          correct: 2,
          xp: 15,
        },
        {
          question:
            "What does Linear Search return if the element is NOT found?",
          options: ["0", "NULL", "-1", "The last index"],
          correct: 2,
          xp: 10,
        },
        {
          question: "What is the key operation in Bubble Sort?",
          options: [
            "Comparing non-adjacent elements",
            "Comparing and swapping adjacent elements",
            "Dividing array into halves",
            "Using a pivot element",
          ],
          correct: 1,
          xp: 10,
        },
      ],
    },
  ],
  moduleQuiz: [
    {
      question:
        "How do you access the element at row 2, column 3 of a 2D array 'mat'?",
      options: ["mat[3][2]", "mat[2][3]", "mat[2,3]", "mat(2,3)"],
      correct: 1,
      xp: 15,
    },
    {
      question:
        "What is the correct way to find the length of a string 'str' in C?",
      options: ["str.length()", "sizeof(str)", "strlen(str)", "str.size()"],
      correct: 2,
      xp: 10,
    },
    {
      question: "What keyword is used to define a structure in C?",
      options: ["class", "record", "struct", "group"],
      correct: 2,
      xp: 10,
    },
    {
      question: "Which searching algorithm requires the array to be sorted?",
      options: [
        "Linear Search",
        "Bubble Sort",
        "Sequential Search",
        "Binary Search",
      ],
      correct: 3,
      xp: 15,
    },
    {
      question:
        "In a structure 'struct Point { int x; int y; } p;', how do you access x?",
      options: ["p->x", "p[x]", "p.x", "Point.x"],
      correct: 2,
      xp: 10,
    },
  ],
  moduleTest: [
    {
      id: "c-arr-t1",
      title: "Find Maximum in Array",
      description:
        "Write a C program that reads n integers into an array and finds and prints the maximum value. Read n from the user first.",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int n, arr[100];\n    printf("Enter number of elements: ");\n    // Read n\n    \n    // Read n elements into array\n    \n    // Find maximum element\n    int max = arr[0];\n    // Compare with remaining elements\n    \n    printf("Maximum = %d\\n", max);\n    return 0;\n}`,
      expectedOutput: "Maximum = <largest element>",
      hints: [
        "Initialize max = arr[0] before the loop.",
        "Loop from index 1 to n-1, comparing each element to max.",
        "If arr[i] > max, update: max = arr[i];",
      ],
    },
    {
      id: "c-arr-t2",
      title: "Linear Search",
      description:
        "Write a C program that reads an array of n integers and a search key from the user. Use linear search to find the key and print its position (1-based), or 'Not found' if absent.",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int n, key, arr[100], found = -1;\n    // Read n and array elements\n    \n    printf("Enter search key: ");\n    // Read key\n    \n    // Perform linear search\n    \n    if (found != -1)\n        printf("Found at position %d\\n", found + 1);\n    else\n        printf("Not found\\n");\n    return 0;\n}`,
      expectedOutput: "Found at position X / Not found",
      hints: [
        "Use a for loop to compare each arr[i] with key.",
        "If arr[i] == key, set found = i and break.",
        "After the loop, if found == -1, the element was not found.",
      ],
    },
    {
      id: "c-arr-t3",
      title: "Bubble Sort",
      description:
        "Write a C program to sort an array of n integers using Bubble Sort and print the sorted array.",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int n, arr[100];\n    // Read n and array elements\n    \n    // Bubble Sort: two nested loops\n    // Outer loop: i from 0 to n-2\n    // Inner loop: j from 0 to n-2-i\n    // Swap arr[j] and arr[j+1] if arr[j] > arr[j+1]\n    \n    printf("Sorted array: ");\n    // Print sorted array\n    \n    return 0;\n}`,
      expectedOutput: "Sorted array: <elements in ascending order>",
      hints: [
        "Outer loop: for(int i = 0; i < n-1; i++)",
        "Inner loop: for(int j = 0; j < n-1-i; j++)",
        "Swap using temp: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;",
      ],
    },
  ],
};

// ─── Module 4: Functions ─────────────────────────────────────────────────────

const module4: CModule = {
  id: "c-functions",
  title: "Module 4: Functions",
  outcome:
    "Decompose a Problem into Functions and Synthesize a Complete Program Using Divide and Conquer Approach.",
  isLocked: true,
  parts: [
    {
      id: "c-func-p1",
      title: "Part 1: Functions in C",
      description:
        "Types of functions, passing arrays, call by value, call by reference, and recursive functions.",
      videoUrl: "https://www.youtube.com/watch?v=9GkJfGOlxBs",
      notes: `FUNCTIONS IN C
===============

WHY FUNCTIONS?
--------------
• Divide a large program into smaller, manageable modules.
• Avoid code repetition — write once, call many times.
• Easier debugging and maintenance.
• Divide and conquer approach: break problem → solve each part → combine.

FUNCTION SYNTAX
----------------
return_type function_name(parameter_list) {
    // body
    return value;
}

Example:
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 3);  // Function call
    printf("%d", result);    // 8
}

TYPES OF FUNCTIONS
-------------------
1. No arguments, no return value: void greet() { printf("Hi"); }
2. Arguments, no return value:    void display(int n) { printf("%d", n); }
3. No arguments, with return:     int getInput() { int x; scanf("%d",&x); return x; }
4. Arguments and return value:    int add(int a, int b) { return a+b; }

FUNCTION PROTOTYPE (Declaration)
----------------------------------
Declared before main() so compiler knows the function signature.
int add(int, int);   // Prototype
int main() { ... }
int add(int a, int b) { return a + b; }   // Definition

CALL BY VALUE vs CALL BY REFERENCE
-------------------------------------
• Call by Value: A COPY of the argument is passed. Changes inside function do NOT affect original.
  void increment(int x) { x++; }   // x++ only affects local copy
  
• Call by Reference: Address (pointer) is passed. Changes DIRECTLY affect the original variable.
  void increment(int *x) { (*x)++; }  // Modifies actual variable
  int n = 5;  increment(&n);  // n is now 6

PASSING ARRAYS TO FUNCTIONS
-----------------------------
Arrays are always passed by reference (address of first element).
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
}
int main() {
    int nums[] = {1, 2, 3, 4, 5};
    printArray(nums, 5);   // No & needed — array name IS the address
}

RECURSIVE FUNCTIONS
--------------------
A function that calls itself. Must have:
1. Base case — condition that stops recursion.
2. Recursive case — problem reduced towards base case.

int factorial(int n) {
    if (n == 0 || n == 1) return 1;  // Base case
    return n * factorial(n - 1);     // Recursive case
}
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

CALL STACK
-----------
Each recursive call adds a new frame to the call stack. Excessive recursion causes Stack Overflow. Always ensure base case is reachable.`,
      docs: [
        {
          label: "C Functions – cppreference",
          url: "https://en.cppreference.com/w/c/language/functions",
        },
        {
          label: "Recursion in C – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/recursion/",
        },
        {
          label: "Functions in C – Tutorialspoint",
          url: "https://www.tutorialspoint.com/cprogramming/c_functions.htm",
        },
        {
          label: "Call by Value vs Reference – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/difference-between-call-by-value-and-call-by-reference/",
        },
      ],
      partQuiz: [
        {
          question: "What is the purpose of a function prototype in C?",
          options: [
            "To define the function body",
            "To tell the compiler about function signature before its definition",
            "To call the function",
            "To include a library",
          ],
          correct: 1,
          xp: 15,
        },
        {
          question: "In call by value, what is passed to the function?",
          options: [
            "Address of the variable",
            "A pointer to the variable",
            "A copy of the variable's value",
            "The variable itself",
          ],
          correct: 2,
          xp: 10,
        },
        {
          question: "What is the base case in recursion?",
          options: [
            "The last recursive call",
            "A condition that stops further recursion",
            "The first call to the function",
            "When the stack overflows",
          ],
          correct: 1,
          xp: 15,
        },
        {
          question: "How are arrays passed to functions in C?",
          options: [
            "By value (copy)",
            "By reference (address)",
            "Not possible",
            "By index",
          ],
          correct: 1,
          xp: 10,
        },
        {
          question:
            "What is the return type of a function that does not return any value?",
          options: ["int", "null", "void", "empty"],
          correct: 2,
          xp: 10,
        },
      ],
    },
  ],
  moduleQuiz: [
    {
      question:
        "Which approach does breaking a problem into functions represent?",
      options: [
        "Object-Oriented",
        "Divide and Conquer",
        "Dynamic Programming",
        "Greedy",
      ],
      correct: 1,
      xp: 10,
    },
    {
      question: "What happens if a recursive function has no base case?",
      options: [
        "It returns 0",
        "It compiles with a warning",
        "It causes infinite recursion/stack overflow",
        "Nothing — it stops on its own",
      ],
      correct: 2,
      xp: 15,
    },
    {
      question: "In call by reference, the function receives:",
      options: [
        "A copy of the value",
        "The return value",
        "The memory address of the variable",
        "A static copy",
      ],
      correct: 2,
      xp: 15,
    },
    {
      question: "To swap two variables using a function, you should use:",
      options: [
        "Call by value",
        "Call by reference (pointers)",
        "Global variables only",
        "Return statement",
      ],
      correct: 1,
      xp: 15,
    },
    {
      question: "What is the recursive case in computing factorial(n)?",
      options: [
        "return 1",
        "return n",
        "return n * factorial(n-1)",
        "return factorial(0)",
      ],
      correct: 2,
      xp: 10,
    },
  ],
  moduleTest: [
    {
      id: "c-func-t1",
      title: "Recursive Factorial",
      description:
        "Write a C program with a recursive function int factorial(int n) that computes n!. In main(), read n and print the factorial.",
      starterCode: `#include <stdio.h>\n\n// Write the recursive factorial function here\n\n\nint main() {\n    int n;\n    printf("Enter a non-negative integer: ");\n    scanf("%d", &n);\n    printf("Factorial of %d = %lld\\n", n, factorial(n));\n    return 0;\n}`,
      expectedOutput: "Factorial of n = <result>",
      hints: [
        "Base case: if (n == 0 || n == 1) return 1;",
        "Recursive case: return n * factorial(n - 1);",
        "Use long long return type for large values.",
      ],
    },
    {
      id: "c-func-t2",
      title: "Reverse a String Using a Function",
      description:
        "Write a function void reverseString(char str[]) that reverses a string in-place. Call it from main() and print the reversed string.",
      starterCode: `#include <stdio.h>\n#include <string.h>\n\n// Write reverseString function here\n// Swap characters from both ends moving towards center\n\n\nint main() {\n    char str[100];\n    printf("Enter a string: ");\n    scanf("%s", str);\n    reverseString(str);\n    printf("Reversed: %s\\n", str);\n    return 0;\n}`,
      expectedOutput: "Reversed: <reversed string>",
      hints: [
        "Find length using strlen(str).",
        "Use two pointers: left = 0, right = len-1, swap while left < right.",
        "Swap: char temp = str[left]; str[left] = str[right]; str[right] = temp;",
      ],
    },
    {
      id: "c-func-t3",
      title: "Binary Search as a Function",
      description:
        "Write a function int binarySearch(int arr[], int n, int key) that performs binary search on a sorted array. Return the index or -1 if not found. Test it in main().",
      starterCode: `#include <stdio.h>\n\n// Write binarySearch function\n// Maintain low, high, mid pointers\n// Compare mid element with key\n\n\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int n = 10, key;\n    printf("Enter search key: ");\n    scanf("%d", &key);\n    int result = binarySearch(arr, n, key);\n    if (result != -1)\n        printf("Found at index %d\\n", result);\n    else\n        printf("Not found\\n");\n    return 0;\n}`,
      expectedOutput: "Found at index X / Not found",
      hints: [
        "Initialize: int low = 0, high = n-1;",
        "Loop: while(low <= high) { int mid = (low+high)/2; ... }",
        "If arr[mid] == key return mid; if arr[mid] < key low = mid+1; else high = mid-1;",
      ],
    },
  ],
};

// ─── Module 5: Pointers ───────────────────────────────────────────────────────

const module5: CModule = {
  id: "c-pointers",
  title: "Module 5: Pointers",
  outcome: "Apply the concept of pointers to develop algorithms and programs.",
  isLocked: true,
  parts: [
    {
      id: "c-ptr-p1",
      title: "Part 1: Pointers in C",
      description:
        "Pointer declarations, operations, pointer arrays, arrays of pointers, structures with pointers, passing pointers to functions.",
      videoUrl: "https://www.youtube.com/watch?v=zuegQmMdy8M",
      notes: `POINTERS IN C
==============

WHAT IS A POINTER?
------------------
A pointer is a variable that stores the MEMORY ADDRESS of another variable.
int x = 10;
int *p = &x;   // p holds the address of x
// &x = "address of x" (e.g., 0x7ffd1234)
// *p = "value at address p" = 10 (dereference)

DECLARATION
------------
int *p;        // Pointer to int
float *fp;     // Pointer to float
char *cp;      // Pointer to char
void *vp;      // Void pointer — generic, can point to any type

BASIC OPERATIONS
-----------------
int a = 20;
int *ptr = &a;
printf("%p", ptr);   // Address (e.g., 0x7ffd...)
printf("%d", *ptr);  // Value = 20 (dereferencing)
*ptr = 50;           // Changes a to 50

POINTER ARITHMETIC
-------------------
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;       // Points to arr[0]
p++;                // Now points to arr[1] (advances by sizeof(int) = 4 bytes)
printf("%d", *p);   // 20

p + 2 points to arr[2]. p - q gives number of elements between two pointers.
Valid operations: +, -, ++, -- (adding an integer to a pointer)

NULL POINTER
-------------
int *p = NULL;   // Points to nothing (address 0)
Always check before dereferencing: if (p != NULL) { ... }

POINTERS AND ARRAYS
--------------------
Array name IS a pointer to the first element.
int arr[5] = {1,2,3,4,5};
int *p = arr;     // same as &arr[0]
*(p + i) == arr[i]   // Both access same element
p[i] == arr[i]       // Pointer indexing works same as array indexing

ARRAY OF POINTERS
------------------
char *names[] = {"Alice", "Bob", "Charlie"};
// Array where each element is a pointer to a string
printf("%s", names[1]);   // "Bob"

POINTERS TO STRUCTURES
------------------------
struct Student s = {"Alice", 101};
struct Student *ptr = &s;
printf("%s", ptr->name);   // Use -> for pointer to struct
// ptr->name same as (*ptr).name

PASSING POINTERS TO FUNCTIONS
-------------------------------
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
int x = 5, y = 10;
swap(&x, &y);   // After: x = 10, y = 5

DOUBLE POINTERS
----------------
int x = 10;
int *p = &x;
int **pp = &p;   // Pointer to a pointer
printf("%d", **pp);   // 10`,
      docs: [
        {
          label: "C Pointers – cppreference",
          url: "https://en.cppreference.com/w/c/language/pointer",
        },
        {
          label: "Pointers in C – GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/pointers-in-c-and-c-set-1-introduction-arithmetic-and-array/",
        },
        {
          label: "C Pointer Tutorial – Tutorialspoint",
          url: "https://www.tutorialspoint.com/cprogramming/c_pointers.htm",
        },
        {
          label: "Pointers and Arrays – Stanford CS Education",
          url: "http://cslibrary.stanford.edu/106/",
        },
      ],
      partQuiz: [
        {
          question: "What does the '&' operator do in C?",
          options: [
            "Dereferences a pointer",
            "Performs bitwise AND",
            "Returns the address of a variable",
            "Declares a pointer",
          ],
          correct: 2,
          xp: 10,
        },
        {
          question:
            "What does the '*' operator do when applied to a pointer variable?",
          options: [
            "Declares a pointer",
            "Multiplies values",
            "Accesses the value at the pointer's address (dereference)",
            "Returns pointer address",
          ],
          correct: 2,
          xp: 10,
        },
        {
          question:
            "If int *p points to arr[0] and p++, what does p now point to?",
          options: [
            "arr[0] still",
            "arr[1]",
            "arr[-1]",
            "One byte after arr[0]",
          ],
          correct: 1,
          xp: 15,
        },
        {
          question:
            "What operator is used to access a structure member through a pointer?",
          options: [". (dot)", "* (star)", "-> (arrow)", "& (ampersand)"],
          correct: 2,
          xp: 15,
        },
        {
          question: "What is a NULL pointer?",
          options: [
            "A pointer to value 0",
            "A pointer that has not been assigned a type",
            "A pointer that doesn't point to any valid memory location",
            "A dangling pointer",
          ],
          correct: 2,
          xp: 10,
        },
      ],
    },
  ],
  moduleQuiz: [
    {
      question:
        "Which of these correctly declares a pointer to an integer named 'p'?",
      options: ["int p*;", "pointer int p;", "int *p;", "*int p;"],
      correct: 2,
      xp: 10,
    },
    {
      question:
        'What is the output: int x=5; int *p=&x; *p=10; printf("%d",x);',
      options: ["5", "address", "10", "undefined"],
      correct: 2,
      xp: 15,
    },
    {
      question:
        "How do you pass a variable to a function so the function can modify it?",
      options: [
        "Pass by value",
        "Pass the variable name",
        "Pass its address using &",
        "Pass return value",
      ],
      correct: 2,
      xp: 15,
    },
    {
      question:
        "What is the relationship between an array name and a pointer in C?",
      options: [
        "They are completely different",
        "Array name is a constant pointer to the first element",
        "Array name stores all elements",
        "Pointer cannot point to array",
      ],
      correct: 1,
      xp: 15,
    },
    {
      question:
        "What is pointer arithmetic? Moving p by 1 on int* advances by:",
      options: ["1 byte", "2 bytes", "sizeof(int) bytes", "Depends on OS"],
      correct: 2,
      xp: 10,
    },
  ],
  moduleTest: [
    {
      id: "c-ptr-t1",
      title: "Swap Using Pointers",
      description:
        "Write a C program with a function void swap(int *a, int *b) that swaps two integers using pointers. Demonstrate in main() by printing values before and after.",
      starterCode: `#include <stdio.h>\n\n// Write swap function using pointers\nvoid swap(int *a, int *b) {\n    // Use a temp variable to swap *a and *b\n    \n}\n\nint main() {\n    int x = 10, y = 20;\n    printf("Before: x = %d, y = %d\\n", x, y);\n    swap(&x, &y);\n    printf("After:  x = %d, y = %d\\n", x, y);\n    return 0;\n}`,
      expectedOutput: "Before: x = 10, y = 20\nAfter:  x = 20, y = 10",
      hints: [
        "Dereference the pointers: int temp = *a;",
        "*a = *b; then *b = temp; to complete the swap.",
        "Call with addresses: swap(&x, &y);",
      ],
    },
    {
      id: "c-ptr-t2",
      title: "String Length Using Pointer",
      description:
        "Write a function int strLen(char *str) that finds the length of a string using pointer arithmetic (do NOT use strlen()). Count characters until '\\0'.",
      starterCode: `#include <stdio.h>\n\n// Write strLen function using pointer\nint strLen(char *str) {\n    int count = 0;\n    // Move pointer until null terminator found\n    // Increment count for each character\n    \n    return count;\n}\n\nint main() {\n    char s[] = "Hello, World!";\n    printf("Length = %d\\n", strLen(s));\n    return 0;\n}`,
      expectedOutput: "Length = 13",
      hints: [
        "Use a while loop: while (*str != '\\0') { count++; str++; }",
        "Each str++ moves to the next character.",
        "Stop when *str == '\\0' (null terminator).",
      ],
    },
    {
      id: "c-ptr-t3",
      title: "Pointer Arithmetic Demo",
      description:
        "Write a C program that uses a pointer to traverse an integer array and print each element. Also print the address of each element to see how pointer arithmetic works.",
      starterCode: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int n = 5;\n    int *p = arr;  // Point to first element\n    \n    printf("Element  Address\\n");\n    // Use pointer arithmetic to print each element and its address\n    // Loop n times, printing *p and p, then p++\n    \n    return 0;\n}`,
      expectedOutput: "Element  Address\n10  0x...\n20  0x...\n...",
      hints: [
        "Use a for loop with p++ to advance the pointer.",
        'Print element: printf("%d", *p);',
        'Print address: printf("%p", (void*)p);',
      ],
    },
  ],
};

// ─── Exported Course ──────────────────────────────────────────────────────────

export const C_PROGRAMMING_COURSE: CModule[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
];

// ─── Roadmap Entry ────────────────────────────────────────────────────────────
// This object is compatible with the Roadmap interface in roadmaps.ts.
// topics is left empty because the C programming course uses a modular
// structure (CModule[]) accessed via C_PROGRAMMING_COURSE instead.

export const C_PROGRAMMING_ROADMAP_ENTRY = {
  id: "c-programming",
  title: "Programming in C",
  icon: "🔵",
  color: "from-cyan-500/20 to-blue-500/10",
  tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  description:
    "Master C programming from fundamentals to pointers through 5 structured modules.",
  level: "Beginner to Advanced",
  topics: [] as import("./roadmaps").RoadmapTopic[],
  isCourse: true as const,
};
