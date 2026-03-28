import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Code,
  Home,
  LayoutDashboard,
  Pause,
  Play,
  RefreshCw,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StepVariable {
  name: string;
  value: string | number | boolean | number[];
}
interface VisStep {
  lineIndex: number;
  description: string;
  variables: StepVariable[];
  arrayState?: number[];
  highlightIndices?: number[];
  swapping?: [number, number];
}
interface Algorithm {
  id: string;
  label: string;
  code: string;
  steps: VisStep[];
}

// ─── Algorithms ───────────────────────────────────────────────────────────────
const BUBBLE_SORT_CODE = `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

bubbleSort([5, 3, 8, 1, 4]);`;

const BINARY_SEARCH_CODE = `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

binarySearch([1, 3, 5, 7, 9, 11], 7);`;

const FIBONACCI_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

fibonacci(6);`;

const TWO_SUM_CODE = `function twoSum(nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return [];
}

twoSum([2, 7, 11, 15], 9);`;

// Bubble Sort steps
function makeBubbleSortSteps(): VisStep[] {
  const arr = [5, 3, 8, 1, 4];
  const steps: VisStep[] = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    lineIndex: 0,
    description: "Declare bubbleSort function",
    variables: [],
    arrayState: [...a],
  });
  steps.push({
    lineIndex: 14,
    description: "Call bubbleSort([5, 3, 8, 1, 4])",
    variables: [{ name: "arr", value: "[5,3,8,1,4]" }],
    arrayState: [...a],
  });
  steps.push({
    lineIndex: 1,
    description: "Set n = arr.length = 5",
    variables: [{ name: "n", value: 5 }],
    arrayState: [...a],
  });

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      lineIndex: 2,
      description: `Outer loop: i = ${i}`,
      variables: [
        { name: "i", value: i },
        { name: "n", value: n },
      ],
      arrayState: [...a],
    });
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        lineIndex: 3,
        description: `Inner loop: j = ${j}`,
        variables: [
          { name: "i", value: i },
          { name: "j", value: j },
        ],
        arrayState: [...a],
        highlightIndices: [j, j + 1],
      });
      steps.push({
        lineIndex: 4,
        description: `Compare arr[${j}]=${a[j]} > arr[${j + 1}]=${a[j + 1]}?`,
        variables: [
          { name: "arr[j]", value: a[j] },
          { name: "arr[j+1]", value: a[j + 1] },
        ],
        arrayState: [...a],
        highlightIndices: [j, j + 1],
      });
      if (a[j] > a[j + 1]) {
        steps.push({
          lineIndex: 5,
          description: `Yes! Store temp = arr[${j}] = ${a[j]}`,
          variables: [{ name: "temp", value: a[j] }],
          arrayState: [...a],
          swapping: [j, j + 1],
        });
        const tmp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = tmp;
        steps.push({
          lineIndex: 6,
          description: `Swap: arr[${j}]=${a[j]}, arr[${j + 1}]=${a[j + 1]}`,
          variables: [
            { name: "arr[j]", value: a[j] },
            { name: "arr[j+1]", value: a[j + 1] },
          ],
          arrayState: [...a],
          highlightIndices: [j, j + 1],
        });
      } else {
        steps.push({
          lineIndex: 4,
          description: `No swap needed (${a[j]} ≤ ${a[j + 1]})`,
          variables: [
            { name: "arr[j]", value: a[j] },
            { name: "arr[j+1]", value: a[j + 1] },
          ],
          arrayState: [...a],
        });
      }
    }
  }
  steps.push({
    lineIndex: 9,
    description: `✅ Sorted! Return ${JSON.stringify(a)}`,
    variables: [{ name: "result", value: JSON.stringify(a) }],
    arrayState: [...a],
  });
  return steps;
}

// Binary Search steps
function makeBinarySearchSteps(): VisStep[] {
  const arr = [1, 3, 5, 7, 9, 11];
  const target = 7;
  const steps: VisStep[] = [];
  let low = 0;
  let high = arr.length - 1;

  steps.push({
    lineIndex: 0,
    description: "Declare binarySearch function",
    variables: [],
    arrayState: [...arr],
  });
  steps.push({
    lineIndex: 14,
    description: "Call binarySearch([1,3,5,7,9,11], 7)",
    variables: [{ name: "target", value: target }],
    arrayState: [...arr],
  });
  steps.push({
    lineIndex: 1,
    description: "Set low = 0",
    variables: [{ name: "low", value: low }],
    arrayState: [...arr],
    highlightIndices: [low],
  });
  steps.push({
    lineIndex: 2,
    description: `Set high = ${high}`,
    variables: [{ name: "high", value: high }],
    arrayState: [...arr],
    highlightIndices: [high],
  });

  while (low <= high) {
    steps.push({
      lineIndex: 4,
      description: `Check: low(${low}) <= high(${high}) → true`,
      variables: [
        { name: "low", value: low },
        { name: "high", value: high },
      ],
      arrayState: [...arr],
      highlightIndices: [low, high],
    });
    const mid = Math.floor((low + high) / 2);
    steps.push({
      lineIndex: 5,
      description: `mid = floor((${low}+${high})/2) = ${mid}`,
      variables: [{ name: "mid", value: mid }],
      arrayState: [...arr],
      highlightIndices: [mid],
    });
    steps.push({
      lineIndex: 6,
      description: `arr[${mid}] = ${arr[mid]} === target(${target})?`,
      variables: [
        { name: "arr[mid]", value: arr[mid] },
        { name: "target", value: target },
      ],
      arrayState: [...arr],
      highlightIndices: [mid],
    });
    if (arr[mid] === target) {
      steps.push({
        lineIndex: 7,
        description: `✅ Found at index ${mid}! Return ${mid}`,
        variables: [{ name: "result", value: mid }],
        arrayState: [...arr],
        highlightIndices: [mid],
      });
      break;
    }
    if (arr[mid] < target) {
      low = mid + 1;
      steps.push({
        lineIndex: 9,
        description: `${arr[mid]} < ${target} → move low to ${low}`,
        variables: [{ name: "low", value: low }],
        arrayState: [...arr],
        highlightIndices: [low],
      });
    } else {
      high = mid - 1;
      steps.push({
        lineIndex: 11,
        description: `${arr[mid]} > ${target} → move high to ${high}`,
        variables: [{ name: "high", value: high }],
        arrayState: [...arr],
        highlightIndices: [high],
      });
    }
  }
  return steps;
}

// Fibonacci steps
function makeFibonacciSteps(): VisStep[] {
  const n = 6;
  const steps: VisStep[] = [];
  steps.push({
    lineIndex: 0,
    description: "Declare fibonacci function",
    variables: [],
  });
  steps.push({
    lineIndex: 9,
    description: `Call fibonacci(${n})`,
    variables: [{ name: "n", value: n }],
  });
  steps.push({
    lineIndex: 1,
    description: `n=${n} > 1, skip base case`,
    variables: [{ name: "n", value: n }],
  });
  let a = 0;
  let b = 1;
  steps.push({
    lineIndex: 2,
    description: "Initialize a=0, b=1",
    variables: [
      { name: "a", value: a },
      { name: "b", value: b },
    ],
  });
  for (let i = 2; i <= n; i++) {
    steps.push({
      lineIndex: 3,
      description: `Loop i=${i}`,
      variables: [
        { name: "i", value: i },
        { name: "a", value: a },
        { name: "b", value: b },
      ],
    });
    const temp = a + b;
    steps.push({
      lineIndex: 4,
      description: `temp = a(${a}) + b(${b}) = ${temp}`,
      variables: [{ name: "temp", value: temp }],
    });
    a = b;
    steps.push({
      lineIndex: 5,
      description: `a = b = ${a}`,
      variables: [
        { name: "a", value: a },
        { name: "b", value: b },
      ],
    });
    b = temp;
    steps.push({
      lineIndex: 6,
      description: `b = temp = ${b}`,
      variables: [
        { name: "a", value: a },
        { name: "b", value: b },
      ],
    });
  }
  steps.push({
    lineIndex: 8,
    description: `✅ fibonacci(6) = ${b}`,
    variables: [{ name: "result", value: b }],
  });
  return steps;
}

// Two Sum steps
function makeTwoSumSteps(): VisStep[] {
  const nums = [2, 7, 11, 15];
  const target = 9;
  const steps: VisStep[] = [];
  const map: Record<number, number> = {};

  steps.push({
    lineIndex: 0,
    description: "Declare twoSum function",
    variables: [],
    arrayState: [...nums],
  });
  steps.push({
    lineIndex: 11,
    description: "Call twoSum([2,7,11,15], 9)",
    variables: [{ name: "target", value: target }],
    arrayState: [...nums],
  });
  steps.push({
    lineIndex: 1,
    description: "Initialize empty map {}",
    variables: [{ name: "map", value: "{}" }],
    arrayState: [...nums],
  });

  for (let i = 0; i < nums.length; i++) {
    steps.push({
      lineIndex: 2,
      description: `Loop i=${i}, nums[${i}]=${nums[i]}`,
      variables: [{ name: "i", value: i }],
      arrayState: [...nums],
      highlightIndices: [i],
    });
    const complement = target - nums[i];
    steps.push({
      lineIndex: 3,
      description: `complement = ${target} - ${nums[i]} = ${complement}`,
      variables: [{ name: "complement", value: complement }],
      arrayState: [...nums],
      highlightIndices: [i],
    });
    steps.push({
      lineIndex: 4,
      description: `Is ${complement} in map? ${map[complement] !== undefined ? "YES!" : "No"}`,
      variables: [{ name: "map", value: JSON.stringify(map) }],
      arrayState: [...nums],
      highlightIndices: [i],
    });
    if (map[complement] !== undefined) {
      steps.push({
        lineIndex: 5,
        description: `✅ Found pair! Return [${map[complement]}, ${i}]`,
        variables: [{ name: "result", value: `[${map[complement]}, ${i}]` }],
        arrayState: [...nums],
        highlightIndices: [map[complement], i],
      });
      break;
    }
    map[nums[i]] = i;
    steps.push({
      lineIndex: 7,
      description: `Store map[${nums[i]}] = ${i}`,
      variables: [{ name: "map", value: JSON.stringify(map) }],
      arrayState: [...nums],
    });
  }
  return steps;
}

const ALGORITHMS: Algorithm[] = [
  {
    id: "bubble",
    label: "Bubble Sort",
    code: BUBBLE_SORT_CODE,
    steps: makeBubbleSortSteps(),
  },
  {
    id: "binary",
    label: "Binary Search",
    code: BINARY_SEARCH_CODE,
    steps: makeBinarySearchSteps(),
  },
  {
    id: "fib",
    label: "Fibonacci",
    code: FIBONACCI_CODE,
    steps: makeFibonacciSteps(),
  },
  {
    id: "twosum",
    label: "Two Sum",
    code: TWO_SUM_CODE,
    steps: makeTwoSumSteps(),
  },
];

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav() {
  const { setPage: setCurrentPage } = useApp();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-center justify-around px-2 py-2 shadow-lg">
      {[
        { icon: <Home className="w-5 h-5" />, label: "Chat", page: "chat" },
        {
          icon: <BookOpen className="w-5 h-5" />,
          label: "Study",
          page: "study",
        },
        {
          icon: <Calendar className="w-5 h-5" />,
          label: "Events",
          page: "events",
        },
        {
          icon: <Code className="w-5 h-5" />,
          label: "Problems",
          page: "problems",
        },
        {
          icon: <LayoutDashboard className="w-5 h-5" />,
          label: "Dashboard",
          page: "dashboard",
        },
      ].map((item) => (
        <button
          type="button"
          key={item.page}
          onClick={() => setCurrentPage(item.page as any)}
          className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors px-3 py-1"
        >
          {item.icon}
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── Step Type Detection ───────────────────────────────────────────────────────
function getStepType(desc: string): "done" | "swap" | "compare" | "normal" {
  if (desc.startsWith("✅")) return "done";
  if (desc.toLowerCase().includes("swap")) return "swap";
  if (
    desc.toLowerCase().includes("compare") ||
    desc.toLowerCase().includes("check") ||
    desc.toLowerCase().includes("===") ||
    desc.toLowerCase().includes(">")
  )
    return "compare";
  return "normal";
}

const STEP_TYPE_STYLES = {
  done: {
    border: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    label: "✅ Done",
    labelColor: "#22c55e",
    badge: "bg-green-500",
  },
  swap: {
    border: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    label: "🔄 Swap",
    labelColor: "#ef4444",
    badge: "bg-red-500",
  },
  compare: {
    border: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    label: "⚖️ Compare",
    labelColor: "#f59e0b",
    badge: "bg-amber-500",
  },
  normal: {
    border: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    label: "→ Execute",
    labelColor: "#8b5cf6",
    badge: "bg-violet-500",
  },
};

// ─── Variable accent colors ────────────────────────────────────────────────────
const VAR_COLORS = [
  {
    bg: "bg-violet-500/20",
    text: "text-violet-300",
    border: "border-violet-500/40",
  },
  { bg: "bg-pink-500/20", text: "text-pink-300", border: "border-pink-500/40" },
  {
    bg: "bg-amber-500/20",
    text: "text-amber-300",
    border: "border-amber-500/40",
  },
  { bg: "bg-cyan-500/20", text: "text-cyan-300", border: "border-cyan-500/40" },
  {
    bg: "bg-emerald-500/20",
    text: "text-emerald-300",
    border: "border-emerald-500/40",
  },
];

function getVarColor(name: string, index: number) {
  // Consistent color per variable name
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return VAR_COLORS[(hash + index) % VAR_COLORS.length];
}

// ─── Array Bar Visualizer ─────────────────────────────────────────────────────
function ArrayVisualizer({
  array,
  highlightIndices = [],
  swapping,
  zoom,
  algoId,
  variables,
}: {
  array: number[];
  highlightIndices?: number[];
  swapping?: [number, number];
  zoom: number;
  algoId: string;
  variables: StepVariable[];
}) {
  const max = Math.max(...array, 1);
  const maxBarH = 160 * zoom;

  // For binary search, extract pointer positions
  let low = -1;
  let high = -1;
  let mid = -1;
  if (algoId === "binary") {
    for (const v of variables) {
      if (v.name === "low" && typeof v.value === "number") low = v.value;
      if (v.name === "high" && typeof v.value === "number") high = v.value;
      if (v.name === "mid" && typeof v.value === "number") mid = v.value;
    }
  }

  // Determine if sorted (last step or description mentions sorted)
  const isDone = false;

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Comparison arrow between highlighted bars */}
      {highlightIndices.length === 2 && !swapping && (
        <div className="flex items-center justify-center gap-1 mb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/50 rounded-full px-3 py-0.5 text-xs font-bold text-amber-300"
          >
            <span>arr[{highlightIndices[0]}]</span>
            <span className="text-amber-400">⚡ vs ⚡</span>
            <span>arr[{highlightIndices[1]}]</span>
          </motion.div>
        </div>
      )}

      {/* Bars */}
      <div
        className="flex items-end gap-2 justify-center w-full"
        style={{ minHeight: maxBarH + 40 }}
      >
        {array.map((val, idx) => {
          const isHighlight = highlightIndices.includes(idx);
          const isSwap =
            swapping && (swapping[0] === idx || swapping[1] === idx);
          const isSorted = isDone;
          const barH = Math.max(20, (val / max) * maxBarH);

          let barColor = "#6366f1";
          let glowColor = "transparent";
          let shadow = "none";

          if (isSwap) {
            barColor = "#ef4444";
            glowColor = "#ef4444";
            shadow = "0 0 16px 4px rgba(239,68,68,0.5)";
          } else if (isHighlight) {
            barColor = "#f59e0b";
            glowColor = "#f59e0b";
            shadow = "0 0 16px 4px rgba(245,158,11,0.4)";
          } else if (isSorted) {
            barColor = "#22c55e";
          }

          return (
            <motion.div
              // biome-ignore lint/suspicious/noArrayIndexKey: positional bar index
              // biome-ignore lint/suspicious/noArrayIndexKey: positional bar
              key={`arr-bar-${idx}`}
              layout
              className="flex flex-col items-center relative"
              style={{
                minWidth: Math.max(28, Math.floor((260 * zoom) / array.length)),
              }}
            >
              {/* Value label above bar */}
              <motion.span
                animate={{
                  color: isSwap
                    ? "#ef4444"
                    : isHighlight
                      ? "#f59e0b"
                      : "#a5b4fc",
                }}
                transition={{ duration: 0.2 }}
                className="text-xs font-bold mb-1"
                style={{ fontSize: 12 * zoom }}
              >
                {val}
              </motion.span>

              {/* Bar itself */}
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: nested bar key
                key={`bar-${idx}`}
                // biome-ignore lint/suspicious/noArrayIndexKey: positional bar key
                animate={{
                  height: barH,
                  backgroundColor: barColor,
                  boxShadow: shadow,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                  duration: 0.4,
                }}
                className="w-full rounded-t-lg relative overflow-visible"
                style={{ minHeight: 8 }}
              >
                {/* Pulse ring on swap */}
                {isSwap && (
                  <motion.div
                    className="absolute inset-0 rounded-t-lg"
                    animate={{ opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    style={{ backgroundColor: glowColor }}
                  />
                )}
              </motion.div>

              {/* Index label */}
              <span
                className="text-[10px] text-gray-500 mt-1"
                style={{ fontSize: 10 * zoom }}
              >
                {idx}
              </span>

              {/* Binary search pointer badges */}
              {algoId === "binary" && (
                <div className="flex flex-col items-center gap-0.5 mt-1">
                  {low === idx && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-bold text-cyan-400 bg-cyan-500/20 rounded px-1"
                    >
                      ▲ low
                    </motion.span>
                  )}
                  {mid === idx && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-bold text-amber-400 bg-amber-500/20 rounded px-1"
                    >
                      ▲ mid
                    </motion.span>
                  )}
                  {high === idx && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-bold text-pink-400 bg-pink-500/20 rounded px-1"
                    >
                      ▲ high
                    </motion.span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Fibonacci Sequence Visualizer ────────────────────────────────────────────
function FibVisualizer({ variables }: { variables: StepVariable[] }) {
  let a = 0;
  let b = 1;
  let temp: number | null = null;
  for (const v of variables) {
    if (v.name === "a" && typeof v.value === "number") a = v.value;
    if (v.name === "b" && typeof v.value === "number") b = v.value;
    if (v.name === "temp" && typeof v.value === "number") temp = v.value;
  }

  return (
    <div className="flex items-center gap-2 justify-center flex-wrap py-2">
      <div className="flex items-center gap-2">
        <motion.div
          key={`fib-a-${a}`}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-600/30 border-2 border-violet-500 flex items-center justify-center text-lg font-bold text-violet-200">
            {a}
          </div>
          <span className="text-[10px] text-violet-400 mt-1">a</span>
        </motion.div>
        <span className="text-xl text-gray-500">+</span>
        <motion.div
          key={`fib-b-${b}`}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-pink-600/30 border-2 border-pink-500 flex items-center justify-center text-lg font-bold text-pink-200">
            {b}
          </div>
          <span className="text-[10px] text-pink-400 mt-1">b</span>
        </motion.div>
        {temp !== null && (
          <>
            <span className="text-xl text-gray-500">=</span>
            <motion.div
              key={`fib-temp-${temp}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-600/30 border-2 border-amber-500 flex items-center justify-center text-lg font-bold text-amber-200">
                {temp}
              </div>
              <span className="text-[10px] text-amber-400 mt-1">temp</span>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Two Sum HashMap Visualizer ───────────────────────────────────────────────
function TwoSumMapVisualizer({ variables }: { variables: StepVariable[] }) {
  let mapStr = "{}";
  for (const v of variables) {
    if (v.name === "map") mapStr = String(v.value);
  }
  let entries: [string, string][] = [];
  try {
    const parsed = JSON.parse(mapStr);
    entries = Object.entries(parsed).map(([k, v]) => [k, String(v)]);
  } catch {
    entries = [];
  }

  if (entries.length === 0) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
        <span className="font-mono bg-gray-800 px-2 py-1 rounded">
          map = {"{}"}
        </span>
        <span className="italic">empty</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 items-center py-2">
      <span className="text-xs text-gray-400 font-mono">map:</span>
      {entries.map(([k, v], i) => (
        <motion.div
          key={`map-${k}-${v}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-1 bg-cyan-500/20 border border-cyan-500/40 rounded-lg px-2 py-1"
        >
          <span className="text-cyan-300 font-bold text-xs">{k}</span>
          <span className="text-gray-400 text-xs">→</span>
          <span className="text-emerald-300 font-bold text-xs">{v}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Code Panel ───────────────────────────────────────────────────────────────
function CodePanel({
  lines,
  activeLineIndex,
  zoom,
}: {
  lines: string[];
  activeLineIndex: number;
  zoom: number;
}) {
  const activeRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: ref.current intentionally omitted
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeLineIndex]);

  return (
    <div
      className="font-mono bg-gray-950 rounded-xl overflow-auto p-3 text-left"
      style={{ fontSize: 13 * zoom, lineHeight: 1.7, maxHeight: 240 }}
    >
      {lines.map((line, i) => (
        <div
          key={`${line.trim().slice(0, 20)}-${i}`}
          ref={i === activeLineIndex ? activeRef : undefined}
          className={`flex gap-2 px-2 rounded-lg transition-all duration-200 ${
            i === activeLineIndex
              ? "bg-violet-600/40 text-white shadow-[0_0_12px_2px_rgba(139,92,246,0.3)]"
              : "text-gray-400"
          }`}
        >
          <span className="select-none text-gray-600 w-5 text-right shrink-0">
            {i + 1}
          </span>
          <span className="whitespace-pre">{line}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Custom Code Stepper ─────────────────────────────────────────────────────
function makeCustomSteps(code: string): VisStep[] {
  const lines = code.split("\n");
  return lines.map((line, i) => ({
    lineIndex: i,
    description: line.trim()
      ? `Executing: ${line.trim().slice(0, 60)}${line.trim().length > 60 ? "..." : ""}`
      : "(blank line)",
    variables: [],
  }));
}

// Fix: avoid referencing `i` outside its scope in StepDots
function StepDotsFixed({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  const MAX_DOTS = 20;
  const dots = Math.min(total, MAX_DOTS);
  const step = total <= MAX_DOTS ? 1 : Math.ceil(total / MAX_DOTS);
  const activeDot = Math.floor(current / step);

  return (
    <div className="flex items-center gap-1 justify-center flex-wrap">
      {Array.from({ length: dots }).map((_, idx) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: positional dot
          key={`dot-${idx}`}
          animate={{
            scale: idx === activeDot ? 1.5 : 1,
            opacity: idx <= activeDot ? 1 : 0.3,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{
            width: idx === activeDot ? 12 : 8,
            height: idx === activeDot ? 12 : 8,
            borderRadius: "50%",
            backgroundColor:
              idx === activeDot
                ? "#a78bfa"
                : idx < activeDot
                  ? "#7c3aed"
                  : "#374151",
            position: "relative",
          }}
        >
          {idx === activeDot && (
            <motion.div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                backgroundColor: "#a78bfa",
              }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CodeVisualizationPage() {
  const [selectedAlgo, setSelectedAlgo] = useState<string>("bubble");
  const [customCode, setCustomCode] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const algo = ALGORITHMS.find((a) => a.id === selectedAlgo)!;
  const activeCode = isCustom
    ? customCode || "// Paste your code here"
    : algo.code;
  const steps: VisStep[] = isCustom ? makeCustomSteps(activeCode) : algo.steps;
  const codeLines = activeCode.split("\n");
  const currentStep = steps[stepIndex] ?? steps[0];
  const stepType = getStepType(currentStep.description);
  const stepStyle = STEP_TYPE_STYLES[stepType];

  // biome-ignore lint/correctness/useExhaustiveDependencies: intervalRef is stable
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, steps.length, setIsPlaying]);

  const reset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomCode((ev.target?.result as string) ?? "");
      setIsCustom(true);
      reset();
    };
    reader.readAsText(file);
  };

  const handleAlgoSelect = (id: string) => {
    setSelectedAlgo(id);
    setIsCustom(false);
    reset();
  };

  const progress =
    steps.length > 1 ? (stepIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      {/* Header */}
      <header
        className="shrink-0 px-4 py-3 flex items-center gap-3"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
          borderBottom: "1px solid rgba(139,92,246,0.3)",
        }}
      >
        <div className="flex-1">
          <div className="font-bold text-white text-base flex items-center gap-2">
            <span className="text-violet-300 text-lg">🔍</span>
            Code Visualizer
          </div>
          <div className="text-[11px] text-violet-300/70">
            Step-by-step algorithm animation
          </div>
        </div>
        <button
          type="button"
          className="text-xs text-violet-300 hover:text-white px-3 py-1.5 rounded-full border border-violet-500/50 flex items-center gap-1 transition-colors hover:bg-violet-500/20"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-3.5 h-3.5" /> Upload .js
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".js,.ts,.txt"
          className="hidden"
          onChange={handleFileUpload}
        />
      </header>

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
          {/* Algorithm selector */}
          <div>
            <div className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mb-3">
              Choose Algorithm
            </div>
            <div className="flex flex-wrap gap-2">
              {ALGORITHMS.map((a) => (
                <button
                  type="button"
                  key={a.id}
                  onClick={() => handleAlgoSelect(a.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    !isCustom && selectedAlgo === a.id
                      ? "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/30"
                      : "bg-gray-900 text-gray-300 border-gray-700 hover:border-violet-500 hover:text-violet-300"
                  }`}
                >
                  {a.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsCustom(true);
                  reset();
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  isCustom
                    ? "bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-500/30"
                    : "bg-gray-900 text-gray-300 border-gray-700 hover:border-violet-500 hover:text-violet-300"
                }`}
              >
                ✏️ Custom Code
              </button>
            </div>
          </div>

          {/* Custom code textarea */}
          <AnimatePresence>
            {isCustom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mb-2">
                  Paste Your Code
                </div>
                <textarea
                  value={customCode}
                  onChange={(e) => {
                    setCustomCode(e.target.value);
                    reset();
                  }}
                  placeholder={
                    "// Paste JavaScript code here\nfunction example(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i++) {\n    sum += i;\n  }\n  return sum;\n}\nexample(5);"
                  }
                  className="w-full h-44 font-mono text-sm bg-gray-900 text-gray-200 rounded-xl p-3 resize-none outline-none border border-gray-700 focus:border-violet-500"
                />
                <div className="text-[10px] text-gray-500 mt-1">
                  Tip: Custom mode animates line by line. For full variable
                  tracking, use the example algorithms.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── MAIN VISUALIZER CARD ── */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              background:
                "linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
              borderColor: "rgba(139,92,246,0.25)",
              boxShadow: "0 8px 40px rgba(109,40,217,0.18)",
            }}
          >
            {/* Array Visualizer */}
            {currentStep.arrayState && (
              <div className="px-6 pt-6 pb-4">
                <div className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mb-4">
                  {selectedAlgo === "twosum" ? "Array" : "Array State"}
                </div>
                <ArrayVisualizer
                  array={currentStep.arrayState}
                  highlightIndices={currentStep.highlightIndices}
                  swapping={currentStep.swapping}
                  zoom={zoom}
                  algoId={selectedAlgo}
                  variables={currentStep.variables}
                />

                {/* TwoSum HashMap */}
                {selectedAlgo === "twosum" && (
                  <div className="mt-4 pt-4 border-t border-violet-900/40">
                    <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest mb-2">
                      Hash Map
                    </div>
                    <TwoSumMapVisualizer variables={currentStep.variables} />
                  </div>
                )}
              </div>
            )}

            {/* Fibonacci Visualizer */}
            {selectedAlgo === "fib" && !isCustom && (
              <div className="px-6 pt-4 pb-4 border-t border-violet-900/30">
                <div className="text-[11px] font-bold text-pink-400 uppercase tracking-widest mb-2">
                  Fibonacci State
                </div>
                <FibVisualizer variables={currentStep.variables} />
              </div>
            )}

            {/* Step Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${stepIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mx-4 mb-4 rounded-xl p-4 relative"
                style={{
                  background: stepStyle.bg,
                  borderLeft: `4px solid ${stepStyle.border}`,
                  border: `1px solid ${stepStyle.border}40`,
                  borderLeftWidth: 4,
                }}
              >
                {/* Step counter badge */}
                <div
                  className={`absolute top-3 right-3 ${stepStyle.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}
                >
                  {stepIndex + 1} / {steps.length}
                </div>

                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: stepStyle.labelColor }}
                >
                  {stepStyle.label}
                </div>
                <div className="text-base font-semibold text-white pr-16">
                  {currentStep.description}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Variables Panel */}
            {currentStep.variables.length > 0 && (
              <div className="px-4 pb-4">
                <div className="text-[11px] font-bold text-violet-400 uppercase tracking-widest mb-3">
                  Variables
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentStep.variables.map((v, idx) => {
                    const vc = getVarColor(v.name, idx);
                    return (
                      <motion.div
                        key={`${v.name}-${JSON.stringify(v.value)}`}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 18,
                        }}
                        className={`${vc.bg} border ${vc.border} rounded-xl px-3 py-2 text-xs font-mono`}
                      >
                        <span className={`${vc.text} font-bold`}>{v.name}</span>
                        <span className="text-gray-500"> = </span>
                        <span className="text-white font-semibold">
                          {String(v.value)}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Code Panel */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-bold text-violet-400 uppercase tracking-widest">
                Source Code
              </div>
              <div className="flex items-center gap-2">
                <ZoomOut className="w-3.5 h-3.5 text-gray-500" />
                <Slider
                  min={0.7}
                  max={1.5}
                  step={0.1}
                  value={[zoom]}
                  onValueChange={([v]) => setZoom(v)}
                  className="w-20"
                />
                <ZoomIn className="w-3.5 h-3.5 text-gray-500" />
              </div>
            </div>
            <CodePanel
              lines={codeLines}
              activeLineIndex={currentStep.lineIndex}
              zoom={zoom}
            />
          </div>

          {/* Progress Dots */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
              <span className="font-bold uppercase tracking-widest">
                Progress
              </span>
              <span className="text-violet-400 font-bold">
                {Math.round(progress)}%
              </span>
            </div>
            <StepDotsFixed total={steps.length} current={stepIndex} />
          </div>

          {/* Controls */}
          <div
            className="rounded-2xl border p-5 space-y-5"
            style={{
              background: "linear-gradient(135deg, #111827 0%, #1e1b4b 100%)",
              borderColor: "rgba(139,92,246,0.2)",
            }}
          >
            {/* Play/Pause/Step buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStepIndex((p) => Math.max(0, p - 1));
                  setIsPlaying(false);
                }}
                disabled={stepIndex === 0}
                className="rounded-full w-11 h-11 p-0 border-gray-600 hover:border-violet-500 bg-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Big play button */}
              <div className="relative">
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-violet-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}
                <Button
                  onClick={() => setIsPlaying((p) => !p)}
                  disabled={stepIndex >= steps.length - 1 && !isPlaying}
                  className="relative rounded-full w-16 h-16 p-0 text-white shadow-xl"
                  style={{
                    background: isPlaying
                      ? "linear-gradient(135deg, #7c3aed, #db2777)"
                      : "linear-gradient(135deg, #6d28d9, #4f46e5)",
                    boxShadow: isPlaying
                      ? "0 0 24px 4px rgba(139,92,246,0.6)"
                      : "0 4px 20px rgba(109,40,217,0.5)",
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStepIndex((p) => Math.min(steps.length - 1, p + 1));
                  setIsPlaying(false);
                }}
                disabled={stepIndex >= steps.length - 1}
                className="rounded-full w-11 h-11 p-0 border-gray-600 hover:border-violet-500 bg-gray-900"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={reset}
                className="rounded-full w-11 h-11 p-0 border-gray-600 hover:border-violet-500 bg-gray-900"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            {/* Speed */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="font-semibold">⚡ Speed</span>
                <span className="font-bold text-violet-300">
                  {speed.toFixed(1)}x
                </span>
              </div>
              <Slider
                min={0.5}
                max={4}
                step={0.5}
                value={[speed]}
                onValueChange={([v]) => setSpeed(v)}
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>

            {/* Step scrubber */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="font-semibold">🎯 Jump to Step</span>
                <span className="text-violet-300 font-bold">
                  {stepIndex + 1}
                </span>
              </div>
              <Slider
                min={0}
                max={steps.length - 1}
                step={1}
                value={[stepIndex]}
                onValueChange={([v]) => {
                  setStepIndex(v);
                  setIsPlaying(false);
                }}
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                <span>Start</span>
                <span>End</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
