# Code & Crush

## Current State
ProblemsPage has: problem list, problem solver with JS-only editor, Code Visualizer banner (navigates to CodeVisualizationPage), and Projects section. The code editor is JS-only with no execution engine and no way to save code snippets.

## Requested Changes (Diff)

### Add
- **MultiLang Compiler** component: a full-featured code editor + runner supporting 20+ languages (Python, Java, C, C++, JavaScript, TypeScript, Go, Rust, Ruby, PHP, Swift, Kotlin, R, C#, Bash, etc.) using the free Piston API (https://emkc.org/api/v2/piston/execute). Features: language selector dropdown, code editor with line numbers, stdin input, Run button, output panel showing stdout/stderr/exit code, execution status badge.
- **Code Storage** feature: a "My Saved Codes" panel inside the compiler that lets users save named snippets to localStorage. Shows list of saved snippets (name, language, date). Click to load. Delete option.
- **Placement**: Compiler lives as a new tab in ProblemsPage (alongside Problems, Projects). Code Visualizer banner stays above the tabs so it remains easy to reach from any tab.

### Modify
- `ProblemsPage.tsx`: Add a 3rd tab "💻 Compiler" next to Problems and Projects. Render the new MultiLangCompiler component on that tab. Move the Code Visualizer banner above the tab bar so it's always visible.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/MultiLangCompiler.tsx` — language selector, editor, stdin, run via Piston API, output panel, loading/error states.
2. Create `src/frontend/src/components/CodeStorage.tsx` — save/load/delete snippets from localStorage, rendered as a collapsible sidebar inside the compiler.
3. Update `ProblemsPage.tsx` — add "Compiler" tab, import and render the new component, keep Code Visualizer banner visible above tabs.
