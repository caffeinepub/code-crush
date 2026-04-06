export interface DocLink {
  label: string;
  url: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  videos: { label: string; url: string }[];
  notes: string;
  docs: DocLink[];
  completed?: boolean;
}

export interface Roadmap {
  id: string;
  title: string;
  icon: string;
  color: string;
  tagColor: string;
  description: string;
  topics: RoadmapTopic[];
}

export const ROADMAPS: Roadmap[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: "🎨",
    color: "from-pink-500/20 to-rose-500/10",
    tagColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    description: "HTML, CSS, JS, React, TypeScript, UI/UX",
    topics: [
      {
        id: "html-css",
        title: "HTML & CSS Fundamentals",
        description:
          "Structure and style web pages with semantic HTML5 and modern CSS3.",
        level: "Beginner",
        videos: [
          {
            label: "HTML Full Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
          },
          {
            label: "CSS Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
          },
          {
            label: "HTML & CSS for Beginners – Kevin Powell",
            url: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
          },
        ],
        notes:
          "HTML provides structure using elements like <header>, <main>, <section>, <article>, <footer>. Always use semantic tags for accessibility and SEO. CSS controls presentation: colors, fonts, layout. Flexbox: flex container + flex items, use justify-content and align-items for alignment. CSS Grid: define grid-template-columns and grid-template-rows for 2D layout. Box model: content → padding → border → margin. CSS variables (--primary-color: blue) make themes easy. Media queries enable responsive design: @media (max-width: 768px) { ... }. Mobile-first approach: write base styles for small screens, then scale up with min-width queries.",
        docs: [
          {
            label: "MDN: HTML Reference",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          },
          {
            label: "MDN: CSS Reference",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          },
          {
            label: "CSS Tricks: Flexbox Guide",
            url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
          },
          {
            label: "CSS Tricks: Grid Guide",
            url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
          },
          {
            label: "W3Schools: HTML Tutorial",
            url: "https://www.w3schools.com/html/",
          },
        ],
      },
      {
        id: "javascript",
        title: "JavaScript Essentials",
        description: "DOM manipulation, ES6+, async/await, fetch API.",
        level: "Beginner",
        videos: [
          {
            label: "JavaScript Full Course – Bro Code",
            url: "https://www.youtube.com/watch?v=8dWL3wF_OMw",
          },
          {
            label: "ES6+ Features – Traversy Media",
            url: "https://www.youtube.com/watch?v=WZQc7RUAg18",
          },
          {
            label: "JavaScript DOM Manipulation – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=5fb2aPlgoys",
          },
        ],
        notes:
          "Variables: use const for values that don't change, let for reassignable variables — avoid var. Arrow functions: const add = (a, b) => a + b. Destructuring: const { name, age } = user; or const [first, ...rest] = arr. Spread/rest: spread copies arrays/objects (...arr), rest collects arguments (...args). Template literals: `Hello ${name}!`. Promises handle async operations. async/await makes promise code readable: const data = await fetch(url).then(r => r.json()). DOM: querySelector returns first match, querySelectorAll returns NodeList. addEventListener for events. Understand the event loop: call stack → web APIs → callback queue → microtask queue. Closures: inner function retains access to outer function's scope.",
        docs: [
          {
            label: "MDN: JavaScript Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          },
          {
            label: "MDN: Fetch API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
          },
          {
            label: "javascript.info – Modern JS Tutorial",
            url: "https://javascript.info/",
          },
          {
            label: "MDN: DOM Introduction",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          },
          {
            label: "W3Schools: JS Reference",
            url: "https://www.w3schools.com/jsref/",
          },
        ],
      },
      {
        id: "react",
        title: "React.js",
        description: "Component-based UI, hooks, state management.",
        level: "Intermediate",
        videos: [
          {
            label: "React Full Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
          },
          {
            label: "React Hooks Explained",
            url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
          },
          {
            label: "React Router v6 – Traversy Media",
            url: "https://www.youtube.com/watch?v=Ul3y1LXxzdU",
          },
        ],
        notes:
          "React is a component-based UI library. JSX: HTML-like syntax compiled to React.createElement(). Props pass data down; state is local data managed with useState. useEffect for side effects (data fetching, subscriptions) — return cleanup function to avoid memory leaks. useContext to consume context without prop drilling. useMemo and useCallback for performance optimization — avoid premature optimization. Custom hooks extract reusable logic. Virtual DOM: React computes a diff and only updates changed DOM nodes. React Router: <BrowserRouter>, <Routes>, <Route>, useNavigate, useParams. For global state: Context API (simple), Zustand (lightweight), Redux Toolkit (complex apps).",
        docs: [
          { label: "React Official Docs", url: "https://react.dev/" },
          {
            label: "React: useEffect Hook",
            url: "https://react.dev/reference/react/useEffect",
          },
          {
            label: "React Router Docs",
            url: "https://reactrouter.com/en/main",
          },
          {
            label: "Zustand Docs",
            url: "https://docs.pmnd.rs/zustand/getting-started/introduction",
          },
        ],
      },
      {
        id: "typescript-fe",
        title: "TypeScript for Frontend",
        description: "Types, interfaces, generics applied to React.",
        level: "Intermediate",
        videos: [
          {
            label: "TypeScript Tutorial – Net Ninja",
            url: "https://www.youtube.com/watch?v=2pZmKW9-I_k",
          },
          {
            label: "TypeScript with React – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=FJDVKeh7RJI",
          },
        ],
        notes:
          "TypeScript adds static typing to JS — catch errors at compile time, not runtime. Interface vs Type: interfaces are extendable (interface Animal extends Living {}), types support unions (type ID = string | number). Generics: function identity<T>(arg: T): T — reusable with any type. In React: type props with interface ComponentProps { title: string; count?: number }. useState<User | null>(null) for typed state. Event types: React.ChangeEvent<HTMLInputElement>, React.FormEvent<HTMLFormElement>. Enums for named constants. Utility types: Partial<T> (all optional), Required<T>, Pick<T, K>, Omit<T, K>, Record<K, V>. Use strict mode in tsconfig.json.",
        docs: [
          {
            label: "TypeScript Official Docs",
            url: "https://www.typescriptlang.org/docs/",
          },
          {
            label: "TypeScript Handbook",
            url: "https://www.typescriptlang.org/docs/handbook/intro.html",
          },
          {
            label: "React TypeScript Cheatsheet",
            url: "https://react-typescript-cheatsheet.netlify.app/",
          },
          {
            label: "TypeScript Playground",
            url: "https://www.typescriptlang.org/play",
          },
        ],
      },
      {
        id: "tailwind",
        title: "Tailwind CSS & UI Libraries",
        description: "Utility-first CSS, shadcn/ui, component patterns.",
        level: "Intermediate",
        videos: [
          {
            label: "Tailwind CSS Crash Course",
            url: "https://www.youtube.com/watch?v=UBOj6rqRUME",
          },
          {
            label: "shadcn/ui Tutorial",
            url: "https://www.youtube.com/watch?v=O4AjymzpIEk",
          },
        ],
        notes:
          "Tailwind replaces custom CSS with utility classes. Layout: flex, grid, gap-4, items-center, justify-between. Spacing: p-4 (padding), m-2 (margin), space-x-2 (horizontal spacing). Typography: text-lg, font-bold, text-gray-600, leading-relaxed. Colors: bg-blue-500, text-white, border-gray-200. Responsive: sm:, md:, lg:, xl: prefixes. Dark mode: dark:bg-gray-900. Hover/focus: hover:bg-blue-600, focus:ring-2. Transitions: transition-colors, duration-200. Use @apply in CSS for extracting repeated utilities. shadcn/ui: copy-paste accessible components built on Radix UI. Radix provides headless accessible primitives (Dialog, Select, Tooltip). Tailwind Merge (cn()) handles conflicting classes.",
        docs: [
          { label: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs" },
          { label: "shadcn/ui Components", url: "https://ui.shadcn.com/" },
          {
            label: "Radix UI Primitives",
            url: "https://www.radix-ui.com/primitives",
          },
          {
            label: "Tailwind Cheat Sheet",
            url: "https://nerdcave.com/tailwind-cheat-sheet",
          },
        ],
      },
      {
        id: "performance-fe",
        title: "Frontend Performance",
        description: "Lazy loading, code splitting, Web Vitals, caching.",
        level: "Advanced",
        videos: [
          {
            label: "Web Performance – Google Chrome Developers",
            url: "https://www.youtube.com/watch?v=reztLS3vomE",
          },
          {
            label: "React Performance Optimization",
            url: "https://www.youtube.com/watch?v=shEjbJFuMow",
          },
        ],
        notes:
          "Core Web Vitals: LCP (Largest Contentful Paint < 2.5s), FID/INP (First Input Delay < 100ms), CLS (Cumulative Layout Shift < 0.1). React.lazy() + Suspense for route-level code splitting. useMemo for expensive calculations, useCallback for stable function references. Virtualize long lists with react-window. Image optimization: use WebP format, proper sizing, loading='lazy'. Avoid layout thrashing: batch DOM reads/writes. Bundle analysis: webpack-bundle-analyzer or vite-bundle-visualizer. Service workers for caching assets offline. Lighthouse in Chrome DevTools for audits.",
        docs: [
          { label: "web.dev: Core Web Vitals", url: "https://web.dev/vitals/" },
          {
            label: "React: Performance",
            url: "https://react.dev/learn/render-and-commit",
          },
          {
            label: "MDN: Lazy Loading",
            url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading",
          },
          {
            label: "Lighthouse Docs",
            url: "https://developer.chrome.com/docs/lighthouse/",
          },
        ],
      },
      {
        id: "testing-fe",
        title: "Testing (Jest + Testing Library)",
        description: "Unit tests, integration tests, mocking, TDD basics.",
        level: "Advanced",
        videos: [
          {
            label: "React Testing Library Tutorial",
            url: "https://www.youtube.com/watch?v=7dTTFW7yACQ",
          },
        ],
        notes:
          "Jest: test runner + assertion library. describe() groups tests, it() or test() defines a test. expect(value).toBe(), .toEqual(), .toContain(), .toBeInTheDocument(). React Testing Library (RTL): test behavior, not implementation. render(<Component />), screen.getByText(), fireEvent.click(). User Events library simulates real interactions. Mock functions: jest.fn(), mockReturnValue(), mockResolvedValue(). Mock modules: jest.mock('./module'). Setup/teardown: beforeEach, afterEach, beforeAll. Coverage report: jest --coverage. TDD: write failing test → make it pass → refactor.",
        docs: [
          {
            label: "Jest Official Docs",
            url: "https://jestjs.io/docs/getting-started",
          },
          {
            label: "React Testing Library",
            url: "https://testing-library.com/docs/react-testing-library/intro/",
          },
          { label: "Vitest Docs", url: "https://vitest.dev/" },
        ],
      },
    ],
  },
  {
    id: "python",
    title: "Python Developer",
    icon: "🐍",
    color: "from-yellow-500/20 to-amber-500/10",
    tagColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    description: "Python syntax, OOP, scripting, automation",
    topics: [
      {
        id: "python-basics",
        title: "Python Fundamentals",
        description:
          "Syntax, data types, loops, functions, list comprehensions.",
        level: "Beginner",
        videos: [
          {
            label: "Python Full Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=eWRyvpPB79E",
          },
          {
            label: "Python for Beginners – Mosh",
            url: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
          },
        ],
        notes:
          "Python is dynamically typed — no need to declare types (though type hints are best practice). Data types: int, float, str, bool, list, tuple, dict, set. Lists are mutable (list.append, list.pop), tuples are immutable. Dicts: key-value pairs, dict[key] = value, dict.get(key, default). Sets: unordered, no duplicates — good for membership tests. List comprehension: [x*2 for x in range(10) if x % 2 == 0]. f-strings: f'Hello {name}, you are {age} years old'. Functions: def greet(name, greeting='Hello'). *args collects positional, **kwargs collects keyword arguments. File I/O: with open('file.txt', 'r') as f: data = f.read(). Exception handling: try/except/else/finally. Use virtual environments: python -m venv venv && source venv/bin/activate.",
        docs: [
          { label: "Python Official Docs", url: "https://docs.python.org/3/" },
          {
            label: "Python Tutorial – docs.python.org",
            url: "https://docs.python.org/3/tutorial/",
          },
          { label: "Real Python – Tutorials", url: "https://realpython.com/" },
          {
            label: "W3Schools: Python",
            url: "https://www.w3schools.com/python/",
          },
        ],
      },
      {
        id: "python-oop",
        title: "OOP in Python",
        description: "Classes, inheritance, magic methods, dataclasses.",
        level: "Intermediate",
        videos: [
          {
            label: "OOP in Python – Corey Schafer",
            url: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM",
          },
          {
            label: "Python Dataclasses – ArjanCodes",
            url: "https://www.youtube.com/watch?v=vBH6GRJ1REM",
          },
        ],
        notes:
          "Define classes with class keyword. __init__ is the constructor, self refers to the instance. Class variables are shared; instance variables are per-object. Inheritance: class Dog(Animal): — child inherits parent methods. super().__init__() calls parent constructor. Magic/dunder methods: __str__ (human-readable), __repr__ (debugging), __len__, __eq__, __lt__ for comparisons, __add__ for operator overloading. @property creates getters/setters without calling it like a method. @classmethod receives cls, @staticmethod receives neither. Abstract classes: from abc import ABC, abstractmethod. Dataclasses: @dataclass decorator auto-generates __init__, __repr__, __eq__ — use for pure data containers. Prefer composition over deep inheritance chains.",
        docs: [
          {
            label: "Python: Classes",
            url: "https://docs.python.org/3/tutorial/classes.html",
          },
          {
            label: "Python: dataclasses",
            url: "https://docs.python.org/3/library/dataclasses.html",
          },
          {
            label: "Real Python: OOP",
            url: "https://realpython.com/python3-object-oriented-programming/",
          },
        ],
      },
      {
        id: "python-scripting",
        title: "Scripting & Automation",
        description: "os, sys, pathlib, subprocess, regex, web scraping.",
        level: "Intermediate",
        videos: [
          {
            label: "Python Automation – Tech With Tim",
            url: "https://www.youtube.com/watch?v=s8XjEuplx_U",
          },
          {
            label: "Web Scraping with BeautifulSoup",
            url: "https://www.youtube.com/watch?v=XVv6mJpFOb0",
          },
        ],
        notes:
          "pathlib.Path is the modern way to handle file paths (cross-platform): Path('folder') / 'file.txt'. os module: os.environ for environment variables, os.getcwd(), os.makedirs(). subprocess: subprocess.run(['ls', '-la'], capture_output=True) to run shell commands. re module for regex: re.search(pattern, string), re.findall(), re.sub(). BeautifulSoup for HTML parsing: soup.find('div', class_='title'), soup.find_all('a'). requests library for HTTP: requests.get(url), requests.post(url, json=data). schedule library for task scheduling: schedule.every().day.at('09:00').do(job). openpyxl for Excel, csv module for CSV files. argparse for CLI argument parsing.",
        docs: [
          {
            label: "Python: pathlib",
            url: "https://docs.python.org/3/library/pathlib.html",
          },
          {
            label: "Python: re (regex)",
            url: "https://docs.python.org/3/library/re.html",
          },
          {
            label: "Requests Library",
            url: "https://requests.readthedocs.io/",
          },
          {
            label: "BeautifulSoup Docs",
            url: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/",
          },
        ],
      },
      {
        id: "python-advanced",
        title: "Advanced Python",
        description: "Decorators, generators, async, type hints.",
        level: "Advanced",
        videos: [
          {
            label: "Advanced Python – Corey Schafer",
            url: "https://www.youtube.com/watch?v=9oGF47crNdY",
          },
          {
            label: "Python Async/Await – Tech With Tim",
            url: "https://www.youtube.com/watch?v=t5Bo1Je9EmE",
          },
        ],
        notes:
          "Decorators are functions that wrap other functions: @decorator. Common use: logging, authentication, caching (@functools.lru_cache). Write your own: def my_decorator(func): def wrapper(*args): ... return func(*args). return wrapper. Generators: use yield instead of return — lazy evaluation, memory efficient: def count_up(): for i in range(1000000): yield i. Generator expressions: (x*2 for x in range(100)). asyncio: single-threaded concurrency using coroutines. async def, await, asyncio.run(main()). asyncio.gather() for concurrent tasks. Type hints with typing: List[int], Dict[str, Any], Optional[str], Union[int, str]. Python 3.10+: int | str syntax. mypy for static type checking. Context managers: with statement, __enter__/__exit__, @contextmanager decorator.",
        docs: [
          {
            label: "Python: Decorators",
            url: "https://docs.python.org/3/glossary.html#term-decorator",
          },
          {
            label: "Python: asyncio",
            url: "https://docs.python.org/3/library/asyncio.html",
          },
          {
            label: "Python: typing",
            url: "https://docs.python.org/3/library/typing.html",
          },
          { label: "mypy Docs", url: "https://mypy.readthedocs.io/" },
        ],
      },
      {
        id: "python-testing",
        title: "Python Testing",
        description: "pytest, fixtures, mocking, test coverage.",
        level: "Intermediate",
        videos: [
          {
            label: "pytest Tutorial – Corey Schafer",
            url: "https://www.youtube.com/watch?v=bbp_849-RZ4",
          },
        ],
        notes:
          "pytest is the standard Python testing framework. Test files: test_*.py or *_test.py. Functions: def test_addition(): assert add(2, 3) == 5. Fixtures: @pytest.fixture provides reusable setup. parametrize: @pytest.mark.parametrize('a,b,expected', [(1,2,3)]) runs multiple cases. Mocking: from unittest.mock import patch, MagicMock. patch replaces a module attribute during test. assert_called_once_with(), return_value for mocks. Coverage: pytest --cov to see which lines are tested. Use conftest.py for shared fixtures. TDD flow: Red (write failing test) → Green (make it pass) → Refactor.",
        docs: [
          { label: "pytest Official Docs", url: "https://docs.pytest.org/" },
          {
            label: "Python: unittest.mock",
            url: "https://docs.python.org/3/library/unittest.mock.html",
          },
          {
            label: "Real Python: pytest",
            url: "https://realpython.com/pytest-python-testing/",
          },
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    icon: "⚙️",
    color: "from-green-500/20 to-emerald-500/10",
    tagColor: "text-green-400 bg-green-500/10 border-green-500/20",
    description: "APIs, databases, servers, authentication",
    topics: [
      {
        id: "node-express",
        title: "Node.js & Express",
        description: "Build REST APIs, middleware, routing.",
        level: "Intermediate",
        videos: [
          {
            label: "Node.js & Express Crash Course – Traversy",
            url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
          },
          {
            label: "Node.js Full Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
          },
        ],
        notes:
          "Node.js runs JavaScript on the server using V8 engine. Non-blocking I/O: handles many requests concurrently without threads. npm/yarn/pnpm manage packages. Express adds routing, middleware, and error handling. Middleware: app.use((req, res, next) => { next(); }). Routes: app.get('/users/:id', handler). Error middleware: 4 params (err, req, res, next). Router: express.Router() for modular routes. dotenv for environment variables (.env file). Nodemon for auto-reload in dev. Request: req.body, req.params, req.query, req.headers. Response: res.json(), res.status(201).send(). Use morgan for request logging. helmet for security headers.",
        docs: [
          {
            label: "Node.js Official Docs",
            url: "https://nodejs.org/en/docs/",
          },
          { label: "Express.js Docs", url: "https://expressjs.com/" },
          { label: "npm Docs", url: "https://docs.npmjs.com/" },
        ],
      },
      {
        id: "databases",
        title: "Databases (SQL & NoSQL)",
        description: "PostgreSQL, MongoDB, queries, ORMs.",
        level: "Intermediate",
        videos: [
          {
            label: "SQL Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=qw--VYLpxG4",
          },
          {
            label: "MongoDB Crash Course – Traversy",
            url: "https://www.youtube.com/watch?v=-56x56UppqQ",
          },
          {
            label: "Prisma ORM Tutorial",
            url: "https://www.youtube.com/watch?v=RebA5J-rlwg",
          },
        ],
        notes:
          "SQL: relational data in tables. Key commands: SELECT, INSERT, UPDATE, DELETE, JOIN (INNER, LEFT, RIGHT), GROUP BY, HAVING, ORDER BY, LIMIT. Indexes speed up queries — create on columns used in WHERE and JOIN. Transactions: BEGIN, COMMIT, ROLLBACK — ensure atomicity. Normalization: 1NF (atomic values), 2NF (no partial deps), 3NF (no transitive deps). PostgreSQL: powerful open-source SQL DB, supports JSON, arrays, full-text search. MongoDB: document-based, stores BSON, flexible schema. Aggregation pipeline: $match, $group, $sort, $project. Prisma ORM: type-safe queries, schema.prisma defines models, prisma migrate for migrations. Mongoose for MongoDB schema validation.",
        docs: [
          { label: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/" },
          { label: "MongoDB Docs", url: "https://www.mongodb.com/docs/" },
          { label: "Prisma Docs", url: "https://www.prisma.io/docs/" },
          { label: "SQLZoo: Interactive SQL", url: "https://sqlzoo.net/" },
        ],
      },
      {
        id: "auth",
        title: "Authentication & Security",
        description: "JWT, OAuth2, bcrypt, CORS, HTTPS.",
        level: "Intermediate",
        videos: [
          {
            label: "JWT Auth Tutorial",
            url: "https://www.youtube.com/watch?v=7Q17ubqLfaM",
          },
          {
            label: "OAuth 2.0 Explained",
            url: "https://www.youtube.com/watch?v=ZV5yTm4pT8g",
          },
        ],
        notes:
          "Never store plain text passwords — use bcrypt: bcrypt.hash(password, 10) and bcrypt.compare(). JWT (JSON Web Token): Header.Payload.Signature — sign with secret, verify on every request. Access tokens should be short-lived (15 min), refresh tokens longer (7 days) stored in HttpOnly cookies. OAuth2 flow: Authorization Code flow for web apps — user redirects to provider, gets code, exchange for token. Google/GitHub login via Passport.js or NextAuth. CORS: configure allowed origins with cors() middleware. Helmet.js adds security headers. Rate limiting: express-rate-limit to prevent brute force. SQL injection: use parameterized queries, never concatenate user input. XSS: sanitize inputs, use Content-Security-Policy.",
        docs: [
          { label: "JWT.io – Debugger & Docs", url: "https://jwt.io/" },
          {
            label: "OWASP Security Cheatsheet",
            url: "https://cheatsheetseries.owasp.org/",
          },
          {
            label: "Passport.js Docs",
            url: "https://www.passportjs.org/docs/",
          },
        ],
      },
      {
        id: "api-design",
        title: "REST & GraphQL APIs",
        description: "API design, documentation, versioning.",
        level: "Advanced",
        videos: [
          {
            label: "REST API Best Practices",
            url: "https://www.youtube.com/watch?v=NjqBxipXBGs",
          },
          {
            label: "GraphQL Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=ed8SzALpx1Q",
          },
        ],
        notes:
          "REST: use nouns in URLs (/users/123 not /getUser/123). HTTP verbs: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE. Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Server Error. Version APIs: /api/v1/users. Pagination: ?page=1&limit=20 or cursor-based. Filter/sort: ?sort=createdAt&order=desc. Document with Swagger/OpenAPI — use swagger-jsdoc and swagger-ui-express. GraphQL: single endpoint /graphql. Schema defines types and relations. Queries for reading, mutations for writing, subscriptions for real-time. Resolvers implement the logic. Apollo Server is the standard. N+1 problem: use DataLoader for batching.",
        docs: [
          {
            label: "REST API Design Best Practices",
            url: "https://restfulapi.net/",
          },
          { label: "GraphQL Official Docs", url: "https://graphql.org/learn/" },
          {
            label: "Apollo Server Docs",
            url: "https://www.apollographql.com/docs/apollo-server/",
          },
          { label: "Swagger/OpenAPI Docs", url: "https://swagger.io/docs/" },
        ],
      },
      {
        id: "caching-queues",
        title: "Caching & Message Queues",
        description: "Redis, BullMQ, pub/sub, rate limiting.",
        level: "Advanced",
        videos: [
          {
            label: "Redis Crash Course – Traversy",
            url: "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
          },
        ],
        notes:
          "Redis is an in-memory data store: blazing fast for caching, sessions, rate limiting, pub/sub. Commands: SET key value EX 3600 (with TTL), GET key, DEL key, INCR key (atomic counter), LPUSH/RPOP for queues. Caching patterns: Cache-Aside (check cache, miss → query DB → set cache), Write-Through, Write-Behind. Cache invalidation: TTL-based or event-driven. BullMQ: job queue backed by Redis — add jobs, workers process them, supports retries, delays, priorities. Use queues for: email sending, image processing, report generation. Redis pub/sub for simple messaging. Use ioredis in Node.js.",
        docs: [
          { label: "Redis Documentation", url: "https://redis.io/docs/" },
          { label: "BullMQ Docs", url: "https://docs.bullmq.io/" },
          { label: "ioredis GitHub", url: "https://github.com/redis/ioredis" },
        ],
      },
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    icon: "🔥",
    color: "from-orange-500/20 to-red-500/10",
    tagColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    description: "Frontend + Backend + Deployment",
    topics: [
      {
        id: "fullstack-fundamentals",
        title: "Full Stack Fundamentals",
        description: "How frontend and backend communicate, HTTP, JSON.",
        level: "Beginner",
        videos: [
          {
            label: "How the Web Works – Traversy",
            url: "https://www.youtube.com/watch?v=hJHvdBlSxug",
          },
          {
            label: "HTTP Crash Course – Traversy",
            url: "https://www.youtube.com/watch?v=iYM2zFP3Zn0",
          },
        ],
        notes:
          "Client-server model: browser (client) sends HTTP request, server processes and responds. HTTP methods: GET, POST, PUT, PATCH, DELETE. Status codes matter: 2xx success, 3xx redirect, 4xx client error, 5xx server error. Headers carry metadata: Content-Type, Authorization, Cookie. HTTPS encrypts with TLS — never send credentials over HTTP. JSON is the standard data interchange format: JSON.stringify(), JSON.parse(). CORS: browser security policy that blocks cross-origin requests unless server allows it. REST vs GraphQL: REST is URL-based, GraphQL is query-based. DNS resolves domain to IP. CDN (Content Delivery Network) serves static assets from edge locations near users. Git for version control: git add, commit, push, pull, branch, merge.",
        docs: [
          {
            label: "MDN: HTTP Overview",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
          },
          {
            label: "MDN: CORS",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
          },
          { label: "Git Documentation", url: "https://git-scm.com/doc" },
        ],
      },
      {
        id: "mern-stack",
        title: "MERN / PERN Stack",
        description: "MongoDB/PostgreSQL + Express + React + Node.",
        level: "Intermediate",
        videos: [
          {
            label: "MERN Stack Crash Course – Traversy",
            url: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
          },
          {
            label: "PERN Stack Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=ldYcgPKEZC8",
          },
        ],
        notes:
          "MERN: MongoDB + Express + React + Node.js. PERN: PostgreSQL instead of MongoDB. Project structure: /client (React app), /server (Express API). In dev, proxy API calls from React to Express: add 'proxy': 'http://localhost:5000' in package.json. Use Axios or fetch for API calls. Environment variables: .env.local for React (REACT_APP_ prefix), .env for server. CORS: configure on Express to allow React's origin. For auth: store JWT in localStorage (simple but XSS-vulnerable) or HttpOnly cookie (more secure). Use Mongoose (MERN) or Sequelize/Prisma (PERN) as ORM. Deploy: React to Vercel/Netlify, Express to Railway/Render, DB to MongoDB Atlas or Supabase.",
        docs: [
          {
            label: "Create React App Docs",
            url: "https://create-react-app.dev/docs/getting-started/",
          },
          { label: "Mongoose Docs", url: "https://mongoosejs.com/docs/" },
          { label: "Supabase Docs", url: "https://supabase.com/docs" },
          { label: "Railway Deploy Docs", url: "https://docs.railway.app/" },
        ],
      },
      {
        id: "nextjs",
        title: "Next.js (Full Stack React)",
        description: "SSR, SSG, App Router, API routes, server components.",
        level: "Intermediate",
        videos: [
          {
            label: "Next.js Full Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
          },
          {
            label: "Next.js 14 App Router – Vercel",
            url: "https://www.youtube.com/watch?v=gSSsZReIFRk",
          },
        ],
        notes:
          "Next.js is a React framework with built-in routing, SSR, SSG, and API routes. App Router (Next.js 13+): file-based routing in /app. Server Components run on server — no client JS, can fetch data directly, can access DB. Client Components: add 'use client' — can use useState, useEffect, event handlers. Server Actions: async functions with 'use server' — call from client to mutate data. API Routes: /app/api/route.ts export GET, POST handlers. Rendering: SSR (per request), SSG (at build time), ISR (regenerate on interval). getServerSideProps vs getStaticProps (Pages Router). Middleware: intercept requests in middleware.ts. Image component: <Image> with automatic optimization. Deploy to Vercel (zero config).",
        docs: [
          { label: "Next.js Official Docs", url: "https://nextjs.org/docs" },
          { label: "Next.js App Router", url: "https://nextjs.org/docs/app" },
          { label: "Vercel Deployment", url: "https://vercel.com/docs" },
        ],
      },
      {
        id: "deployment",
        title: "Deployment & CI/CD",
        description: "Docker, Vercel, Railway, GitHub Actions.",
        level: "Advanced",
        videos: [
          {
            label: "Docker Tutorial – TechWorld with Nana",
            url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
          },
          {
            label: "GitHub Actions CI/CD",
            url: "https://www.youtube.com/watch?v=R8_veQiYBjI",
          },
        ],
        notes:
          "Docker: package app + dependencies into a portable container. Dockerfile: FROM node:18-alpine, WORKDIR /app, COPY, RUN npm install, CMD. docker-compose.yml orchestrates multiple services (app, db, redis). docker build -t myapp . && docker run -p 3000:3000 myapp. Vercel: push to GitHub, auto-deploys frontend. Environment variables in dashboard, not in code. Railway/Render for backend: connect GitHub repo, set env vars, deploy. GitHub Actions: .github/workflows/ci.yml. Trigger on push/pull_request. Jobs: checkout → install → lint → test → build → deploy. Secrets: Settings > Secrets in repo. Blue-green deployment: run new version alongside old, then switch traffic. Zero-downtime with rolling updates.",
        docs: [
          { label: "Docker Docs", url: "https://docs.docker.com/" },
          {
            label: "GitHub Actions Docs",
            url: "https://docs.github.com/en/actions",
          },
          { label: "Vercel Docs", url: "https://vercel.com/docs" },
          { label: "Railway Docs", url: "https://docs.railway.app/" },
        ],
      },
    ],
  },
  {
    id: "datascience",
    title: "Data Science",
    icon: "📊",
    color: "from-blue-500/20 to-cyan-500/10",
    tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    description: "NumPy, Pandas, Matplotlib, statistics",
    topics: [
      {
        id: "numpy-pandas",
        title: "NumPy & Pandas",
        description: "Array operations, DataFrames, data cleaning.",
        level: "Beginner",
        videos: [
          {
            label: "Pandas Tutorial – Corey Schafer",
            url: "https://www.youtube.com/watch?v=ZyhVh-qRZPA",
          },
          {
            label: "NumPy Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=QUT1VHiLmmI",
          },
        ],
        notes:
          "NumPy: ndarray is the core object — fast vectorized math without loops. np.array([1,2,3]), np.zeros((3,3)), np.arange(0,10,2). Broadcasting: operations on arrays of different shapes. Indexing: arr[0:5], arr[arr > 3] (boolean mask). np.dot for matrix multiplication. Pandas: DataFrame is a 2D labeled table; Series is a 1D column. Read data: pd.read_csv(), pd.read_excel(), pd.read_json(). Explore: df.head(), df.info(), df.describe(), df.shape. Select: df['col'], df[['col1','col2']], df.loc[row, col], df.iloc[0:5]. Filter: df[df['age'] > 25]. Handle missing: df.isnull().sum(), df.fillna(0), df.dropna(). Group: df.groupby('category')['sales'].sum(). Merge: pd.merge(df1, df2, on='id', how='left'). Apply: df['col'].apply(lambda x: x*2).",
        docs: [
          { label: "NumPy Official Docs", url: "https://numpy.org/doc/" },
          {
            label: "Pandas Official Docs",
            url: "https://pandas.pydata.org/docs/",
          },
          {
            label: "Kaggle: Pandas Course",
            url: "https://www.kaggle.com/learn/pandas",
          },
        ],
      },
      {
        id: "visualization",
        title: "Data Visualization",
        description: "Matplotlib, Seaborn, Plotly charts.",
        level: "Intermediate",
        videos: [
          {
            label: "Matplotlib Tutorial – Corey Schafer",
            url: "https://www.youtube.com/watch?v=UO98lJQ3QGI",
          },
          {
            label: "Seaborn Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=6GUZXDef2U0",
          },
        ],
        notes:
          "Matplotlib: foundation of Python visualization. fig, ax = plt.subplots(figsize=(10,6)). ax.plot(), ax.bar(), ax.scatter(), ax.hist(). Set labels: ax.set_xlabel(), ax.set_title(). Multiple subplots: plt.subplots(2,3). Save: plt.savefig('plot.png', dpi=300). Seaborn: statistical visualization with better aesthetics. sns.heatmap(df.corr(), annot=True) for correlation. sns.boxplot(), sns.violinplot(), sns.pairplot() for data exploration. sns.barplot with confidence intervals. Plotly: interactive charts for dashboards. px.scatter(), px.line(), px.bar() from plotly.express. Use Plotly Dash or Streamlit for interactive data apps. Always label axes and add a title. Use color to highlight key insights, not for decoration.",
        docs: [
          {
            label: "Matplotlib Docs",
            url: "https://matplotlib.org/stable/contents.html",
          },
          { label: "Seaborn Docs", url: "https://seaborn.pydata.org/" },
          { label: "Plotly Python Docs", url: "https://plotly.com/python/" },
        ],
      },
      {
        id: "statistics",
        title: "Statistics for Data Science",
        description: "Probability, hypothesis testing, regression.",
        level: "Intermediate",
        videos: [
          {
            label: "Statistics for Data Science – Krish Naik",
            url: "https://www.youtube.com/watch?v=zRUliXuwJCQ",
          },
          {
            label: "StatQuest: Statistics Basics",
            url: "https://www.youtube.com/watch?v=qBigTkBLU6g",
          },
        ],
        notes:
          "Descriptive stats: mean (average), median (middle value), mode (most frequent), variance (spread), standard deviation (sqrt of variance). Distributions: Normal (bell curve, 68-95-99.7 rule), Binomial (n trials, p probability), Poisson (events per time). Probability: P(A and B) = P(A) * P(B) if independent. Bayes theorem: P(A|B) = P(B|A)*P(A)/P(B). Hypothesis testing: null hypothesis H0 (no effect), alternative H1. p-value: probability of observing result if H0 is true — reject H0 if p < 0.05. t-test: compare means. Chi-square: test independence. Correlation: r close to 1 = strong positive, -1 = strong negative, 0 = none. Correlation ≠ causation. Linear regression: y = mx + b, minimize MSE. R² measures how well model fits data.",
        docs: [
          {
            label: "scipy.stats Docs",
            url: "https://docs.scipy.org/doc/scipy/reference/stats.html",
          },
          {
            label: "StatQuest YouTube",
            url: "https://www.youtube.com/@statquest",
          },
          {
            label: "Khan Academy: Statistics",
            url: "https://www.khanacademy.org/math/statistics-probability",
          },
        ],
      },
      {
        id: "sql-ds",
        title: "SQL for Data Science",
        description: "Queries, window functions, CTEs, analytical functions.",
        level: "Intermediate",
        videos: [
          {
            label: "SQL for Data Analysis – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
          },
        ],
        notes:
          "SQL is essential for data scientists — most data lives in databases. Core: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. Aggregations: COUNT(*), SUM(), AVG(), MIN(), MAX(). JOINs: INNER (matching rows), LEFT (all from left + matching), FULL OUTER (all rows). Subqueries: SELECT * FROM (SELECT ...) AS sub. CTEs: WITH cte AS (SELECT ...) SELECT * FROM cte — readable, reusable. Window functions: ROW_NUMBER(), RANK(), DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC). Running totals: SUM(sales) OVER (ORDER BY date). LAG/LEAD for comparing with previous/next row. CASE WHEN for conditional logic. Use Google BigQuery, Snowflake, or PostgreSQL for analytical queries.",
        docs: [
          {
            label: "PostgreSQL: Window Functions",
            url: "https://www.postgresql.org/docs/current/tutorial-window.html",
          },
          {
            label: "Mode Analytics: SQL Tutorial",
            url: "https://mode.com/sql-tutorial/",
          },
          { label: "W3Schools: SQL", url: "https://www.w3schools.com/sql/" },
        ],
      },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: "🤖",
    color: "from-violet-500/20 to-purple-500/10",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    description: "scikit-learn, models, evaluation, pipelines",
    topics: [
      {
        id: "ml-basics",
        title: "ML Fundamentals",
        description:
          "Supervised vs unsupervised, train/test split, overfitting.",
        level: "Beginner",
        videos: [
          {
            label: "Machine Learning Crash Course – Google",
            url: "https://www.youtube.com/watch?v=NWONeJKn6kc",
          },
          {
            label: "ML for Beginners – StatQuest",
            url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
          },
        ],
        notes:
          "Supervised learning: model learns from labeled examples (input → label). Types: classification (predict category), regression (predict number). Unsupervised: no labels — find patterns: clustering (K-Means), dimensionality reduction (PCA). Reinforcement learning: agent learns from rewards. ML workflow: collect data → clean/preprocess → split train/val/test → train model → evaluate → tune → deploy. Train/validation/test split: 70/15/15 or 80/10/10 — never touch test set until final evaluation. Overfitting: model memorizes train data but fails on new data. Fix: more data, regularization (L1/L2), dropout, simpler model. Underfitting: model too simple — fix: more features, complex model. Cross-validation: K-fold splits data K ways for robust evaluation.",
        docs: [
          {
            label: "Google ML Crash Course",
            url: "https://developers.google.com/machine-learning/crash-course",
          },
          {
            label: "scikit-learn: Getting Started",
            url: "https://scikit-learn.org/stable/getting_started.html",
          },
          {
            label: "Kaggle: Intro to ML",
            url: "https://www.kaggle.com/learn/intro-to-machine-learning",
          },
        ],
      },
      {
        id: "sklearn",
        title: "scikit-learn",
        description: "Classical ML models: regression, SVM, random forest.",
        level: "Intermediate",
        videos: [
          {
            label: "scikit-learn Tutorial – Sentdex",
            url: "https://www.youtube.com/watch?v=0B5eIE_1vpU",
          },
          {
            label: "scikit-learn Full Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=pqNCD_5r0IU",
          },
        ],
        notes:
          "scikit-learn API: consistent fit(X_train, y_train), predict(X_test) pattern. Pipeline: chain preprocessing and model — Pipeline([('scaler', StandardScaler()), ('clf', RandomForest())]). Preprocessing: StandardScaler (z-score), MinMaxScaler (0-1), LabelEncoder, OneHotEncoder. Models: LogisticRegression, LinearRegression, DecisionTreeClassifier, RandomForestClassifier (ensemble of trees), GradientBoostingClassifier, SVC, KNeighborsClassifier, KMeans. Evaluation: accuracy_score, confusion_matrix, classification_report (precision/recall/F1), roc_auc_score, mean_squared_error. Hyperparameter tuning: GridSearchCV, RandomizedSearchCV. Feature importance: model.feature_importances_. Persist model: joblib.dump(model, 'model.pkl').",
        docs: [
          {
            label: "scikit-learn Docs",
            url: "https://scikit-learn.org/stable/",
          },
          {
            label: "scikit-learn: User Guide",
            url: "https://scikit-learn.org/stable/user_guide.html",
          },
          {
            label: "Kaggle: Intermediate ML",
            url: "https://www.kaggle.com/learn/intermediate-machine-learning",
          },
        ],
      },
      {
        id: "deep-learning",
        title: "Deep Learning Intro",
        description: "Neural networks, TensorFlow/PyTorch basics.",
        level: "Advanced",
        videos: [
          {
            label: "Deep Learning with PyTorch – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=GIsg-ZUy0MY",
          },
          {
            label: "Neural Networks – 3Blue1Brown",
            url: "https://www.youtube.com/watch?v=aircAruvnKk",
          },
        ],
        notes:
          "Neural network: input layer → hidden layers → output layer. Each neuron: weighted sum of inputs + bias, passed through activation function. ReLU: max(0, x) — most common for hidden layers. Sigmoid: output (0-1) for binary classification. Softmax: multi-class output probabilities. Backpropagation: compute gradient of loss with respect to each weight using chain rule. Gradient descent updates weights: w = w - lr * gradient. Adam optimizer adapts learning rate per parameter. Batch normalization speeds training. Dropout: randomly zero out neurons during training to prevent overfitting. CNNs for images: conv layers detect features. RNNs/LSTMs for sequences. Transformers for NLP (attention mechanism). PyTorch: dynamic graph, Pythonic. Keras (on TF): high-level API for quick prototyping.",
        docs: [
          { label: "PyTorch Docs", url: "https://pytorch.org/docs/" },
          {
            label: "TensorFlow/Keras Docs",
            url: "https://www.tensorflow.org/api_docs",
          },
          {
            label: "fast.ai: Practical Deep Learning",
            url: "https://course.fast.ai/",
          },
          { label: "d2l.ai: Dive into Deep Learning", url: "https://d2l.ai/" },
        ],
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    icon: "🛠️",
    color: "from-slate-500/20 to-gray-500/10",
    tagColor: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    description: "Linux, Docker, Kubernetes, CI/CD, monitoring",
    topics: [
      {
        id: "linux",
        title: "Linux & Shell Scripting",
        description: "File system, processes, bash scripts, permissions.",
        level: "Beginner",
        videos: [
          {
            label: "Linux Command Line Full Course",
            url: "https://www.youtube.com/watch?v=ZtqBQ68cfJc",
          },
          {
            label: "Bash Scripting Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=tK9Oc6AEnR4",
          },
        ],
        notes:
          "Navigation: ls -la, cd, pwd, mkdir -p, rm -rf, cp -r, mv. File content: cat, less, head, tail -f (live logs), grep -r 'pattern' . Permissions: chmod 755 (rwx for owner, rx for group/others), chown user:group file. Processes: ps aux, kill -9 PID, top, htop, nohup command &. Networking: curl, wget, ssh user@host, scp for file copy. Package managers: apt-get install (Debian/Ubuntu), yum/dnf (RHEL/CentOS). Bash scripts: #!/bin/bash shebang. Variables: NAME='John'. Conditionals: if [ $count -gt 5 ]; then ... fi. Loops: for file in *.log; do rm $file; done. Cron jobs: crontab -e — '0 9 * * 1-5 /path/to/script.sh' runs at 9am weekdays. Piping: cat access.log | grep 'ERROR' | wc -l.",
        docs: [
          { label: "Linux man pages", url: "https://linux.die.net/man/" },
          {
            label: "Bash Reference Manual",
            url: "https://www.gnu.org/software/bash/manual/",
          },
          {
            label: "OverTheWire: Linux Wargames",
            url: "https://overthewire.org/wargames/bandit/",
          },
          { label: "ExplainShell.com", url: "https://explainshell.com/" },
        ],
      },
      {
        id: "docker-k8s",
        title: "Docker & Kubernetes",
        description: "Containers, images, orchestration, pods, services.",
        level: "Intermediate",
        videos: [
          {
            label: "Docker & Kubernetes – TechWorld with Nana",
            url: "https://www.youtube.com/watch?v=bhBSlnQcq2k",
          },
          {
            label: "Kubernetes Crash Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=X48VuDVv0do",
          },
        ],
        notes:
          "Docker: image (immutable blueprint), container (running instance). Dockerfile: FROM node:18-alpine → RUN npm ci → COPY . . → EXPOSE 3000 → CMD ['node','server.js']. Multi-stage builds: separate build stage from runtime to reduce image size. docker-compose.yml: define services, networks, volumes — docker compose up -d. Docker Hub or GHCR for image registry. Kubernetes (K8s): container orchestration. Pod: smallest unit — one or more containers. Deployment: manages desired replicas. Service: exposes pods (ClusterIP, NodePort, LoadBalancer). ConfigMap: non-secret config. Secret: base64-encoded sensitive data. Ingress: HTTP routing rules. kubectl apply -f deployment.yaml. Probes: liveness (restart if unhealthy), readiness (only route traffic when ready). Helm: package manager for K8s — install apps with helm install.",
        docs: [
          { label: "Docker Docs", url: "https://docs.docker.com/" },
          { label: "Kubernetes Docs", url: "https://kubernetes.io/docs/" },
          { label: "Helm Docs", url: "https://helm.sh/docs/" },
          {
            label: "Play with Kubernetes",
            url: "https://labs.play-with-k8s.com/",
          },
        ],
      },
      {
        id: "cicd",
        title: "CI/CD Pipelines",
        description: "GitHub Actions, Jenkins, automated testing & deploy.",
        level: "Advanced",
        videos: [
          {
            label: "GitHub Actions Tutorial – TechWorld",
            url: "https://www.youtube.com/watch?v=R8_veQiYBjI",
          },
        ],
        notes:
          "CI (Continuous Integration): auto-run tests on every push/PR to catch bugs early. CD (Continuous Delivery): auto-deploy to staging; Continuous Deployment: auto-deploy to production. GitHub Actions: .github/workflows/ci.yml. Structure: on (triggers) → jobs → steps → actions. Uses: actions/checkout@v3, actions/setup-node@v3. Matrix builds: test across Node 16, 18, 20. Secrets: ${{ secrets.API_KEY }} from repo settings. Artifacts: upload build outputs. Environments: dev/staging/prod with manual approval gates. Jenkins: open-source, Jenkinsfile as pipeline. ArgoCD for GitOps: git repo is source of truth for K8s state. Blue-green deployment: run v2 alongside v1, switch traffic instantly. Canary release: route 5% of traffic to new version, monitor, then roll out.",
        docs: [
          {
            label: "GitHub Actions Docs",
            url: "https://docs.github.com/en/actions",
          },
          { label: "Jenkins Docs", url: "https://www.jenkins.io/doc/" },
          { label: "ArgoCD Docs", url: "https://argo-cd.readthedocs.io/" },
        ],
      },
      {
        id: "monitoring",
        title: "Monitoring & Observability",
        description: "Prometheus, Grafana, logging, alerting.",
        level: "Advanced",
        videos: [
          {
            label: "Prometheus & Grafana – TechWorld with Nana",
            url: "https://www.youtube.com/watch?v=h4Sl21AKiDg",
          },
        ],
        notes:
          "Observability = Metrics + Logs + Traces. Metrics: numerical measurements over time (CPU, request rate, error rate). Prometheus: pull-based metrics collector. Scrapes /metrics endpoint. PromQL for queries: rate(http_requests_total[5m]). Grafana: dashboards and visualization for Prometheus data. Alerts: alertmanager sends to Slack/PagerDuty. Logs: structured logging (JSON) is searchable. ELK Stack (Elasticsearch + Logstash + Kibana) or Loki (lightweight) for log aggregation. Traces: follow a request across microservices — Jaeger, Zipkin, OpenTelemetry. The RED method: Rate, Errors, Duration. The USE method: Utilization, Saturation, Errors. SLI: metric (e.g., 99% uptime). SLO: target (99.9%). SLA: contractual agreement.",
        docs: [
          { label: "Prometheus Docs", url: "https://prometheus.io/docs/" },
          { label: "Grafana Docs", url: "https://grafana.com/docs/" },
          {
            label: "OpenTelemetry Docs",
            url: "https://opentelemetry.io/docs/",
          },
        ],
      },
    ],
  },
  {
    id: "android",
    title: "Android Developer",
    icon: "📱",
    color: "from-lime-500/20 to-green-500/10",
    tagColor: "text-lime-400 bg-lime-500/10 border-lime-500/20",
    description: "Kotlin, Jetpack Compose, Android SDK",
    topics: [
      {
        id: "kotlin",
        title: "Kotlin Fundamentals",
        description: "Syntax, null safety, coroutines, data classes.",
        level: "Beginner",
        videos: [
          {
            label: "Kotlin for Beginners – Philipp Lackner",
            url: "https://www.youtube.com/watch?v=F9UC9DY-vIU",
          },
          {
            label: "Kotlin Coroutines – Philipp Lackner",
            url: "https://www.youtube.com/watch?v=ShNhJ3wMpvQ",
          },
        ],
        notes:
          "Kotlin is the official Android language. val (immutable), var (mutable) — prefer val. Null safety: String? can be null, String cannot. Safe call: user?.name. Elvis operator: user?.name ?: 'Anonymous'. Non-null assertion: user!!.name (throws NPE if null — avoid). Data classes: auto-generated equals, hashCode, toString, copy. Sealed classes: restricted class hierarchy — great for Result<T> (Success/Error). Coroutines: lightweight threads. launch for fire-and-forget, async/await for results. suspend functions can be paused without blocking. viewModelScope.launch { ... } in ViewModel. Flow: reactive stream of values, like RxJava but simpler. Extension functions: fun String.isEmail() = contains('@'). Object declarations: singleton pattern. Companion object: static-like members.",
        docs: [
          {
            label: "Kotlin Official Docs",
            url: "https://kotlinlang.org/docs/",
          },
          {
            label: "Kotlin Coroutines",
            url: "https://kotlinlang.org/docs/coroutines-overview.html",
          },
          {
            label: "Android: Kotlin Guides",
            url: "https://developer.android.com/kotlin",
          },
        ],
      },
      {
        id: "jetpack-compose",
        title: "Jetpack Compose",
        description: "Declarative UI, state, composable functions.",
        level: "Intermediate",
        videos: [
          {
            label: "Jetpack Compose Crash Course – Philipp Lackner",
            url: "https://www.youtube.com/watch?v=cDabx3SjuOY",
          },
          {
            label: "Compose State Management",
            url: "https://www.youtube.com/watch?v=mymWGMy9pYI",
          },
        ],
        notes:
          "Compose replaces XML layouts entirely. @Composable functions describe UI declaratively. State: var count by remember { mutableStateOf(0) }. Recomposition: when state changes, Compose re-renders only affected composables. LazyColumn / LazyRow for scrollable lists (like RecyclerView). Modifier: chain modifiers like .padding(16.dp).fillMaxWidth().clickable {}. Navigation: NavHost, NavController, composable(route) destinations. ViewModel: hiltViewModel() or viewModel() — holds UI state via StateFlow/LiveData. Material 3: MaterialTheme, Surface, Button, TextField, Scaffold, TopAppBar. Side effects: LaunchedEffect for coroutines, DisposableEffect for cleanup, SideEffect for non-Compose calls. State hoisting: lift state up to the lowest common ancestor. Preview with @Preview annotation.",
        docs: [
          {
            label: "Jetpack Compose Docs",
            url: "https://developer.android.com/jetpack/compose",
          },
          {
            label: "Compose Pathway – Android",
            url: "https://developer.android.com/courses/pathways/compose",
          },
          {
            label: "Material 3 for Compose",
            url: "https://m3.material.io/develop/android/jetpack-compose",
          },
        ],
      },
      {
        id: "android-architecture",
        title: "Android Architecture (MVVM)",
        description: "ViewModel, Repository, Room, Hilt DI.",
        level: "Intermediate",
        videos: [
          {
            label: "Android MVVM Architecture – Philipp Lackner",
            url: "https://www.youtube.com/watch?v=EF33KmyprEQ",
          },
        ],
        notes:
          "MVVM: View (Compose UI) → ViewModel → Repository → Data Source. ViewModel survives configuration changes (rotation). Expose state via StateFlow<UiState> or LiveData. Repository pattern: single source of truth, abstracts local (Room) and remote (Retrofit) data. Room: SQLite ORM for Android. Define @Entity (table), @Dao (queries), @Database. Hilt: dependency injection for Android. @HiltAndroidApp on Application, @AndroidEntryPoint on Activity/Fragment, @HiltViewModel on ViewModel. @Inject constructor for dependency injection. Retrofit: type-safe HTTP client. Define interface with @GET/@POST annotations. Use with Coroutines (suspend functions) or Flow. Coroutines: run on Dispatchers.IO for network/DB, switch to Dispatchers.Main for UI updates.",
        docs: [
          {
            label: "Android Architecture Guide",
            url: "https://developer.android.com/topic/architecture",
          },
          {
            label: "Room Persistence Docs",
            url: "https://developer.android.com/training/data-storage/room",
          },
          {
            label: "Hilt Dependency Injection",
            url: "https://developer.android.com/training/dependency-injection/hilt-android",
          },
        ],
      },
    ],
  },
  {
    id: "ios",
    title: "iOS Developer",
    icon: "🍎",
    color: "from-sky-500/20 to-blue-500/10",
    tagColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    description: "Swift, SwiftUI, Xcode, UIKit",
    topics: [
      {
        id: "swift",
        title: "Swift Fundamentals",
        description: "Optionals, closures, structs, protocols.",
        level: "Beginner",
        videos: [
          {
            label: "Swift Tutorial – Sean Allen",
            url: "https://www.youtube.com/watch?v=CwA1VWP0Ldw",
          },
          {
            label: "Swift for Beginners – Paul Hudson",
            url: "https://www.youtube.com/watch?v=comQ1-x2a1Q",
          },
        ],
        notes:
          "Swift: type-safe, compiled. Constants: let, variables: var. Optionals: String? can be nil. Unwrap safely with if let name = optionalName { } or guard let. Force unwrap ! only when you're certain (prefer to avoid). Structs: value types — copied when assigned, use for data models. Classes: reference types — shared. Prefer structs unless you need inheritance. Protocols define contracts: protocol Drawable { func draw() }. Conform: struct Circle: Drawable { func draw() { } }. Enums with associated values: enum Result { case success(Data), failure(Error) }. Closures are first-class: { (a: Int, b: Int) -> Int in return a + b }. Error handling: throws, do { try ... } catch. String interpolation: Hello, (name)! - uses backslash-paren syntax. Extensions add methods to existing types.",
        docs: [
          {
            label: "Swift.org: Documentation",
            url: "https://swift.org/documentation/",
          },
          {
            label: "Swift Language Guide",
            url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/",
          },
          {
            label: "Hacking with Swift",
            url: "https://www.hackingwithswift.com/",
          },
        ],
      },
      {
        id: "swiftui",
        title: "SwiftUI",
        description: "Declarative UI, @State, @ObservableObject, navigation.",
        level: "Intermediate",
        videos: [
          {
            label: "SwiftUI Bootcamp – Swiftful Thinking",
            url: "https://www.youtube.com/watch?v=F2ojC6TNwws",
          },
          {
            label: "100 Days of SwiftUI – Paul Hudson",
            url: "https://www.youtube.com/watch?v=aP-SQXTtWhY",
          },
        ],
        notes:
          "SwiftUI: declarative — describe what UI should look like, Swift updates it. @State: local view state — @State private var count = 0. @Binding: pass state to child view. @ObservableObject + @Published: shared state across views — class ViewModel: ObservableObject { @Published var items = [] }. @StateObject: own an ObservableObject. @EnvironmentObject: inject into whole view tree. NavigationStack: push/pop navigation. TabView: tab bar navigation. List: scrollable list with automatic swipe-to-delete. AsyncImage: loads remote images with async/await. .task { } modifier for async work on appear. Combine framework for reactive pipelines. @MainActor ensures UI updates on main thread. Animations: .animation(.spring(), value: isOpen). Preview: #Preview { ContentView() }.",
        docs: [
          {
            label: "SwiftUI Docs – Apple",
            url: "https://developer.apple.com/documentation/swiftui",
          },
          {
            label: "Hacking with Swift: SwiftUI",
            url: "https://www.hackingwithswift.com/quick-start/swiftui",
          },
          {
            label: "100 Days of SwiftUI",
            url: "https://www.hackingwithswift.com/100/swiftui",
          },
        ],
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: "🔐",
    color: "from-red-500/20 to-orange-500/10",
    tagColor: "text-red-400 bg-red-500/10 border-red-500/20",
    description: "Networking, ethical hacking, cryptography",
    topics: [
      {
        id: "networking",
        title: "Networking Fundamentals",
        description: "OSI model, TCP/IP, DNS, HTTP/HTTPS, firewalls.",
        level: "Beginner",
        videos: [
          {
            label: "Networking Basics – Professor Messer",
            url: "https://www.youtube.com/watch?v=qiQR5rTSshw",
          },
          {
            label: "Computer Networking Full Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=IPvYjXCsTg8",
          },
        ],
        notes:
          "OSI 7 layers (All People Seem To Need Data Processing): Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP: reliable, ordered, connection-oriented (3-way handshake: SYN → SYN-ACK → ACK). UDP: fast, connectionless, no delivery guarantee — good for video, DNS. IP addressing: IPv4 (32-bit, e.g., 192.168.1.1), IPv6 (128-bit). Subnetting: CIDR notation /24 = 254 usable hosts. DNS: resolves domain to IP — A record, CNAME, MX, TXT. HTTP/HTTPS: port 80/443. TLS handshake establishes encrypted channel. Firewalls: filter packets by IP, port, protocol. NAT: translates private IPs (192.168.x.x) to public. Load balancers distribute traffic. VPN: encrypted tunnel over public network.",
        docs: [
          {
            label: "Cisco: Networking Basics",
            url: "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html",
          },
          {
            label: "MDN: HTTP",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
          },
          {
            label: "Professor Messer: CompTIA Network+",
            url: "https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/",
          },
        ],
      },
      {
        id: "ethical-hacking",
        title: "Ethical Hacking Basics",
        description: "Reconnaissance, OWASP Top 10, penetration testing.",
        level: "Intermediate",
        videos: [
          {
            label: "Ethical Hacking Course – TCM Security",
            url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
          },
          {
            label: "OWASP Top 10 Explained",
            url: "https://www.youtube.com/watch?v=ravAoItAqaM",
          },
        ],
        notes:
          "Phases of pen testing: Reconnaissance → Scanning → Exploitation → Post-Exploitation → Reporting. Passive recon: OSINT — Google dorking (site:target.com filetype:pdf), Shodan, WHOIS. Active recon: nmap -sV -sC -A target — port scan, service detection. OWASP Top 10 vulnerabilities: SQL injection (input goes into SQL query), XSS (inject JS into page), Broken Authentication, Insecure Direct Object Reference, Security Misconfiguration, Insecure Deserialization, Components with Known Vulnerabilities, SSRF. Tools: Burp Suite (intercept/modify HTTP), Metasploit (exploit framework), Nikto (web scanner), Gobuster (directory brute-force), Wireshark (packet capture). Bug bounty: HackerOne, Bugcrowd — always get written permission. CVE database lists known vulnerabilities. Responsible disclosure: report to vendor before going public.",
        docs: [
          {
            label: "OWASP Top 10",
            url: "https://owasp.org/www-project-top-ten/",
          },
          { label: "HackerOne: Hacker101", url: "https://www.hacker101.com/" },
          {
            label: "TryHackMe: Learning Platform",
            url: "https://tryhackme.com/",
          },
          { label: "CVE Database", url: "https://cve.mitre.org/" },
        ],
      },
      {
        id: "cryptography",
        title: "Cryptography Basics",
        description: "Symmetric, asymmetric, hashing, PKI, TLS.",
        level: "Intermediate",
        videos: [
          {
            label: "Cryptography Full Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=AQDCe585Lnc",
          },
        ],
        notes:
          "Symmetric encryption: same key to encrypt/decrypt (AES-256). Fast, but key distribution is a problem. Asymmetric encryption: public key encrypts, private key decrypts (RSA, ECC). Slower but solves key distribution — used in TLS handshake. Hashing: one-way function, fixed output — SHA-256, SHA-3. Used for integrity checks and password storage. Salt: random data added before hashing — prevents rainbow table attacks. bcrypt, Argon2: password hashing functions with built-in salting and slow computation (by design). HMAC: hash + secret key for message authentication. PKI: Certificate Authority signs certificates. TLS: server sends certificate, client verifies it. Forward secrecy: new session keys each time so past traffic can't be decrypted. PGP for email encryption.",
        docs: [
          {
            label: "OWASP: Cryptography Guide",
            url: "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html",
          },
          {
            label: "Cloudflare: Learning – TLS",
            url: "https://www.cloudflare.com/learning/ssl/what-is-tls/",
          },
        ],
      },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain Developer",
    icon: "⛓️",
    color: "from-amber-500/20 to-yellow-500/10",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    description: "Solidity, smart contracts, Web3.js, DeFi",
    topics: [
      {
        id: "blockchain-basics",
        title: "Blockchain Fundamentals",
        description: "Distributed ledger, consensus, cryptographic hashing.",
        level: "Beginner",
        videos: [
          {
            label: "Blockchain Basics – Simply Explained",
            url: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
          },
          {
            label: "Ethereum & Web3 – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=gyMwXuJrbJQ",
          },
        ],
        notes:
          "Blockchain: linked list of blocks, each containing transactions + previous block hash + nonce. Changing any block invalidates all subsequent blocks — tamper-evident. Decentralized: no single point of control, replicated across thousands of nodes. Consensus mechanisms agree on valid chain: Proof of Work (miners solve hash puzzle — energy intensive), Proof of Stake (validators stake tokens as collateral — Ethereum uses this now). Public/private key pairs: wallet address derived from public key. Transactions signed with private key — verifiable but not forgeable. Ethereum: programmable blockchain — smart contracts are code deployed on-chain. UTXO (Bitcoin) vs Account model (Ethereum). Gas: computational cost in Gwei. Block explorers: Etherscan.io to inspect any transaction.",
        docs: [
          {
            label: "Ethereum.org: Learn",
            url: "https://ethereum.org/en/learn/",
          },
          {
            label: "Bitcoin Whitepaper",
            url: "https://bitcoin.org/bitcoin.pdf",
          },
          { label: "Etherscan Docs", url: "https://docs.etherscan.io/" },
        ],
      },
      {
        id: "solidity",
        title: "Solidity & Smart Contracts",
        description: "EVM, Solidity syntax, ERC-20, Hardhat.",
        level: "Intermediate",
        videos: [
          {
            label: "Solidity Tutorial – Patrick Collins",
            url: "https://www.youtube.com/watch?v=gyMwXuJrbJQ",
          },
        ],
        notes:
          "Solidity: statically typed, compiled to EVM bytecode. Contract is like a class. Types: uint256, int256, address, bool, bytes32, string, mapping(address => uint256), struct, array. Visibility: public, private, internal, external. Functions: view (read-only, no gas), pure (no state access), payable (receives ETH). Events: emit Transfer(from, to, amount) — frontend can listen. Modifiers: reusable function checks — modifier onlyOwner { require(msg.sender == owner); _ }. msg.sender is caller address, msg.value is ETH sent. ERC-20: standard fungible token interface (transfer, approve, allowance). ERC-721: NFT standard. OpenZeppelin: audited contract library — import and extend. Hardhat: local dev environment, testing (ethers.js + Chai), deploy scripts. Security: reentrancy (checks-effects-interactions pattern), integer overflow (Solidity 0.8+ auto-reverts).",
        docs: [
          { label: "Solidity Docs", url: "https://docs.soliditylang.org/" },
          { label: "OpenZeppelin Docs", url: "https://docs.openzeppelin.com/" },
          { label: "Hardhat Docs", url: "https://hardhat.org/docs" },
          {
            label: "CryptoZombies: Learn Solidity",
            url: "https://cryptozombies.io/",
          },
        ],
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Engineer",
    icon: "☁️",
    color: "from-cyan-500/20 to-sky-500/10",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    description: "AWS, GCP, Azure, serverless, infrastructure",
    topics: [
      {
        id: "cloud-basics",
        title: "Cloud Fundamentals",
        description: "IaaS, PaaS, SaaS, regions, availability zones.",
        level: "Beginner",
        videos: [
          {
            label: "Cloud Computing Basics – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=M988_fsOSWo",
          },
          {
            label: "AWS vs Azure vs GCP – Fireship",
            url: "https://www.youtube.com/watch?v=M988_fsOSWo",
          },
        ],
        notes:
          "Service models: IaaS (Infrastructure as a Service) — raw VMs, networking, storage (EC2, Azure VMs); PaaS (Platform as a Service) — managed runtimes, focus on code (Heroku, App Engine, Elastic Beanstalk); SaaS (Software as a Service) — ready-to-use software (Gmail, Salesforce). Shared responsibility model: AWS manages hardware/hypervisor, you manage OS and above. Regions: geographic areas (us-east-1, eu-west-1). Availability Zones (AZs): isolated data centers within a region — deploy across AZs for high availability. High availability: redundancy across AZs, auto-scaling, health checks. Elasticity: scale up during peak, scale down to save cost. Pay-as-you-go vs reserved instances (commit 1-3 years for discount). FinOps: optimize cloud spend — right-size instances, use spot instances for batch jobs.",
        docs: [
          {
            label: "AWS: What is Cloud Computing",
            url: "https://aws.amazon.com/what-is-cloud-computing/",
          },
          {
            label: "Google Cloud: Training",
            url: "https://cloud.google.com/training",
          },
          {
            label: "Microsoft Learn: Azure Fundamentals",
            url: "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/",
          },
        ],
      },
      {
        id: "aws-core",
        title: "AWS Core Services",
        description: "EC2, S3, Lambda, RDS, IAM, VPC.",
        level: "Intermediate",
        videos: [
          {
            label: "AWS Certified Cloud Practitioner – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=SOTamWNgDKc",
          },
          {
            label: "AWS Solutions Architect – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=Ia-UEYYR44s",
          },
        ],
        notes:
          "EC2: virtual machines. Choose instance type (t3.micro to x2iedn.32xlarge). Security Groups = firewall for EC2. Key pairs for SSH access. AMI (Amazon Machine Image): OS snapshot to launch from. S3: object storage — bucket/key structure. Use for static websites, backups, data lakes. Lifecycle policies auto-delete or archive old objects. Lambda: serverless functions — pay per invocation, auto-scales to zero. Triggered by S3, API Gateway, SQS, scheduled. Max 15 min timeout. RDS: managed relational DB (PostgreSQL, MySQL, Aurora). Multi-AZ for HA, Read Replicas for scaling reads. IAM: users, groups, roles, policies. Principle of least privilege — give only needed permissions. Use IAM roles for EC2/Lambda (not access keys). VPC: isolated network. Public subnets (internet access via Internet Gateway), private subnets (no direct internet). NAT Gateway lets private subnets reach internet. Route 53: DNS service. CloudFront: CDN for low-latency global delivery.",
        docs: [
          { label: "AWS Documentation", url: "https://docs.aws.amazon.com/" },
          {
            label: "AWS Well-Architected Framework",
            url: "https://aws.amazon.com/architecture/well-architected/",
          },
          { label: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
        ],
      },
      {
        id: "iac",
        title: "Infrastructure as Code",
        description: "Terraform, CloudFormation, Pulumi, GitOps.",
        level: "Advanced",
        videos: [
          {
            label: "Terraform Crash Course – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=SLB_c_ayRMo",
          },
        ],
        notes:
          "IaC: define infrastructure in code — version controlled, repeatable, automated. Terraform: HCL language, provider-agnostic (AWS, GCP, Azure). terraform init → plan → apply → destroy. State file tracks deployed resources. Modules for reusable components. Remote state in S3 with DynamoDB locking. Workspaces for dev/staging/prod environments. CloudFormation: AWS-native IaC in JSON/YAML. Stacks group related resources. Change sets preview before applying. CDK (Cloud Development Kit): define CloudFormation with TypeScript/Python. Pulumi: IaC using real programming languages (TypeScript, Python). GitOps: infrastructure changes via pull requests — ArgoCD or Flux watches git and reconciles cluster state. Immutable infrastructure: replace (don't patch) — use golden AMIs or container images.",
        docs: [
          {
            label: "Terraform Docs",
            url: "https://developer.hashicorp.com/terraform/docs",
          },
          {
            label: "AWS CloudFormation Docs",
            url: "https://docs.aws.amazon.com/cloudformation/",
          },
          { label: "Pulumi Docs", url: "https://www.pulumi.com/docs/" },
        ],
      },
    ],
  },
  {
    id: "aiml",
    title: "AI/ML Engineer",
    icon: "🧠",
    color: "from-fuchsia-500/20 to-pink-500/10",
    tagColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    description: "LLMs, prompt engineering, RAG, fine-tuning",
    topics: [
      {
        id: "llm-basics",
        title: "LLMs & Prompt Engineering",
        description: "GPT, Claude, Gemini, system prompts, few-shot.",
        level: "Beginner",
        videos: [
          {
            label: "Prompt Engineering Guide – Andrew Ng",
            url: "https://www.youtube.com/watch?v=dOxUroR57xs",
          },
          {
            label: "ChatGPT Prompt Engineering – DeepLearning.AI",
            url: "https://www.youtube.com/watch?v=H4YK_7MAckk",
          },
        ],
        notes:
          "LLMs (Large Language Models): predict next token using transformer architecture trained on massive text. Context window: how many tokens the model can see at once (GPT-4: 128k, Claude 3: 200k). Temperature: 0 = deterministic/factual, 1 = creative/varied. Top-p (nucleus sampling): restricts token pool. System prompt: sets AI persona and behavior — be specific and directive. Prompt techniques: Zero-shot (just ask), Few-shot (give 2-5 examples), Chain-of-thought ('Think step by step'), ReAct (Reason + Act). Structured output: ask for JSON, the model can follow schemas. Prompt injection: user input overrides system instructions — sanitize and validate. Token limits: chunk long documents. Role prompting: 'You are a senior software engineer reviewing code.' Avoid negatives — say what to do, not what not to do.",
        docs: [
          {
            label: "OpenAI Prompt Engineering Guide",
            url: "https://platform.openai.com/docs/guides/prompt-engineering",
          },
          {
            label: "Anthropic: Prompt Library",
            url: "https://docs.anthropic.com/en/prompt-library/",
          },
          {
            label: "DeepLearning.AI: Prompt Engineering",
            url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
          },
        ],
      },
      {
        id: "rag",
        title: "RAG & Vector Databases",
        description: "Embeddings, Pinecone, Weaviate, retrieval pipelines.",
        level: "Intermediate",
        videos: [
          {
            label: "RAG from Scratch – LangChain",
            url: "https://www.youtube.com/watch?v=sVcwVQRHIc8",
          },
          {
            label: "Vector Databases Explained",
            url: "https://www.youtube.com/watch?v=klTvEwg3oJ4",
          },
        ],
        notes:
          "RAG (Retrieval Augmented Generation): fetch relevant docs at query time, pass as context to LLM — grounds responses in facts, reduces hallucination. Pipeline: load docs → chunk (500-1000 tokens, 20% overlap) → embed each chunk → store in vector DB → at query time: embed query → find k nearest chunks (cosine similarity) → pass chunks + query to LLM. Embeddings: text → dense float array (1536 dims for text-embedding-ada-002). Vector DBs: Pinecone (managed), Weaviate (open-source), Chroma (local dev), Qdrant, pgvector (PostgreSQL extension). Chunking strategies: fixed size, sentence-aware, semantic. Hybrid search: combine vector similarity + BM25 keyword search for better recall. Reranking: use cross-encoder to rerank retrieved docs. Evaluate: ragas library for RAG quality metrics.",
        docs: [
          {
            label: "LangChain: RAG Guide",
            url: "https://python.langchain.com/docs/use_cases/question_answering/",
          },
          { label: "Pinecone Docs", url: "https://docs.pinecone.io/" },
          { label: "Chroma Docs", url: "https://docs.trychroma.com/" },
        ],
      },
      {
        id: "langchain",
        title: "LangChain & Agents",
        description: "Chains, tools, memory, autonomous agents.",
        level: "Advanced",
        videos: [
          {
            label: "LangChain Crash Course – Tech With Tim",
            url: "https://www.youtube.com/watch?v=lG7Uxts9SXs",
          },
          {
            label: "AI Agents Tutorial – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=aywZrzNaKjs",
          },
        ],
        notes:
          "LangChain: framework for composing LLM applications. LCEL (LangChain Expression Language): chain = prompt | llm | parser. PromptTemplate.from_template() for dynamic prompts. Memory: ConversationBufferMemory (full history), ConversationSummaryMemory (summarized for long chats), ConversationVectorMemory (semantic search over history). Agents: LLM decides which tools to call. Tools: Python REPL, web search, calculator, custom APIs. ReAct agent: Reasoning + Acting pattern — Thought → Action → Observation → repeat. LangGraph: build stateful multi-agent workflows as graphs. LangSmith: observability — trace every LLM call, debug, evaluate. OpenAI Function Calling / Tool Use: structured way for LLM to request tool invocations. Guardrails: validate model inputs/outputs.",
        docs: [
          {
            label: "LangChain Docs",
            url: "https://python.langchain.com/docs/",
          },
          { label: "LangSmith Docs", url: "https://docs.smith.langchain.com/" },
          {
            label: "OpenAI: Function Calling",
            url: "https://platform.openai.com/docs/guides/function-calling",
          },
        ],
      },
    ],
  },
  {
    id: "gamedev",
    title: "Game Developer",
    icon: "🎮",
    color: "from-indigo-500/20 to-violet-500/10",
    tagColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    description: "Unity, C#, game design, physics, shaders",
    topics: [
      {
        id: "unity-basics",
        title: "Unity & C# Fundamentals",
        description: "GameObjects, components, physics, collision.",
        level: "Beginner",
        videos: [
          {
            label: "Unity Beginner Tutorial – Brackeys",
            url: "https://www.youtube.com/watch?v=IlKaB1etrik",
          },
          {
            label: "C# for Unity – Brackeys",
            url: "https://www.youtube.com/watch?v=pSiIHe2uZ2w",
          },
        ],
        notes:
          "Unity: GameObjects are entities in the scene — everything is a GameObject. Components add behavior: Rigidbody (physics), Collider (collision), Renderer (display), AudioSource. MonoBehaviour: Start() called once at start, Update() called every frame (60 FPS = 60 calls/sec). Input: Input.GetAxis('Horizontal'), Input.GetKeyDown(KeyCode.Space). Transform: position, rotation, scale. transform.Translate(Vector3.forward * speed * Time.deltaTime). Time.deltaTime: seconds since last frame — multiply by speed for frame-rate independent movement. Prefabs: reusable template GameObjects — drag to scene to instantiate. Scenes: separate levels. Tags and Layers for organization. Debug.Log() for debugging. Physics: Rigidbody.AddForce(). Raycasting: Physics.Raycast() for shooting, detection.",
        docs: [
          { label: "Unity Documentation", url: "https://docs.unity3d.com/" },
          { label: "Unity Learn", url: "https://learn.unity.com/" },
          {
            label: "C# Reference – Microsoft",
            url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
          },
        ],
      },
      {
        id: "game-design",
        title: "Game Design Principles",
        description: "Core loop, player motivation, level design, juice.",
        level: "Intermediate",
        videos: [
          {
            label: "Game Design Theory – Game Maker's Toolkit",
            url: "https://www.youtube.com/watch?v=zQvWMdWhFCc",
          },
          {
            label: "Level Design – GMTK",
            url: "https://www.youtube.com/watch?v=ZWMbDwWkqXA",
          },
        ],
        notes:
          "Core loop: the fundamental cycle a player repeats (kill → loot → upgrade). Good core loops are satisfying in isolation. Player motivation — Self-Determination Theory: Competence (feeling skilled), Autonomy (meaningful choices), Relatedness (connection with others). Flow state: difficulty matches player skill — too easy = boredom, too hard = frustration. Progression: extrinsic (XP, loot) vs intrinsic (mastery, story). Level design: teach mechanics before testing them — use geometry to guide player attention. Juicing: every action has feedback — screen shake, particles, sound effects, hit stop. GIGO (Garbage In Garbage Out) — great mechanics can't save poor core loop. GDD (Game Design Document): blueprint for the game. Playtest early with real users — your assumptions are often wrong.",
        docs: [
          {
            label: "Game Maker's Toolkit (YouTube)",
            url: "https://www.youtube.com/@GMTK",
          },
          {
            label: "Game Design Wiki",
            url: "https://gamedesignconcepts.wordpress.com/",
          },
        ],
      },
      {
        id: "shaders-graphics",
        title: "Shaders & Graphics",
        description: "HLSL, Shader Graph, materials, lighting.",
        level: "Advanced",
        videos: [
          {
            label: "Shader Graph Tutorial – Unity",
            url: "https://www.youtube.com/watch?v=VsUK9K6UbY4",
          },
        ],
        notes:
          "Rendering pipeline: CPU sends draw calls → GPU processes vertices → rasterization → fragment/pixel shader → output. Vertex shader: runs per-vertex, transforms 3D positions to screen space. Fragment shader: runs per-pixel, determines final color. HLSL (High Level Shading Language): syntax similar to C. Unity Shader Graph: visual node-based shader editor — no code needed. Key nodes: UV, Texture Sample, Normal Map, Fresnel Effect, Lerp, Gradient. URP (Universal Render Pipeline) and HDRP (High Definition RP) in modern Unity. PBR (Physically Based Rendering): Albedo (base color), Metallic, Roughness, Normal map, Ambient Occlusion — mimics real-world light physics. Post-processing: Bloom, Color Grading, Depth of Field, Motion Blur. Optimize: batch draw calls, use LODs (Level of Detail) for distant objects, occlusion culling.",
        docs: [
          {
            label: "Unity: Shader Graph",
            url: "https://unity.com/features/shader-graph",
          },
          {
            label: "Unity: URP Docs",
            url: "https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest",
          },
          {
            label: "The Book of Shaders",
            url: "https://thebookofshaders.com/",
          },
        ],
      },
    ],
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    icon: "✏️",
    color: "from-teal-500/20 to-cyan-500/10",
    tagColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    description: "Figma, design systems, accessibility, research",
    topics: [
      {
        id: "design-fundamentals",
        title: "Design Fundamentals",
        description: "Color theory, typography, spacing, visual hierarchy.",
        level: "Beginner",
        videos: [
          {
            label: "UI Design Fundamentals – Gary Simon",
            url: "https://www.youtube.com/watch?v=tRpoI6vkqLs",
          },
          {
            label: "Design Principles – Google",
            url: "https://www.youtube.com/watch?v=yY96hTb8WgI",
          },
        ],
        notes:
          "Visual hierarchy: guide the eye with size (larger = more important), weight (bold stands out), color (contrast draws attention), spacing (whitespace separates groups). Color: 60-30-10 rule (primary color 60%, secondary 30%, accent 10%). Color theory: complementary (opposite on wheel), analogous (adjacent), triadic. Typography: limit to 2 font families (one serif, one sans-serif). Size scale: 12/14/16/20/24/32/48. Line height: 1.5x font size for body text. Letter spacing: tight for headings, normal for body. Spacing system: base unit of 4px or 8px — all spacing is a multiple. Contrast ratio: 4.5:1 minimum for normal text (WCAG AA), 3:1 for large text. F-pattern and Z-pattern: how users scan pages. Gestalt principles: proximity, similarity, continuity, closure.",
        docs: [
          {
            label: "Material Design Guidelines",
            url: "https://m3.material.io/",
          },
          {
            label: "Apple Human Interface Guidelines",
            url: "https://developer.apple.com/design/human-interface-guidelines/",
          },
          {
            label: "WCAG 2.1 Guidelines",
            url: "https://www.w3.org/WAI/WCAG21/quickref/",
          },
          {
            label: "Refactoring UI (Book Summary)",
            url: "https://www.refactoringui.com/",
          },
        ],
      },
      {
        id: "figma",
        title: "Figma & Prototyping",
        description: "Components, auto-layout, prototypes, design systems.",
        level: "Intermediate",
        videos: [
          {
            label: "Figma Tutorial for Beginners – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
          },
          {
            label: "Figma Design System Tutorial",
            url: "https://www.youtube.com/watch?v=Dtd40cHQQlk",
          },
        ],
        notes:
          "Figma: browser-based, real-time collaboration, free for starters. Frames: artboards for screens. Auto Layout: flex-like container that resizes with content — set direction, gap, padding. Components: master + instances, changes propagate. Variants: component property with multiple states (default/hover/active/disabled). Styles: color styles, text styles, effect styles — define once, reuse everywhere. Design tokens: systematized values (--color-primary, --spacing-md) exported for developers. Prototypes: connect frames with interactions and transitions. Smart Animate for micro-interactions. Dev Mode: shows CSS, spacing, assets — developers inspect directly. Plugins: Unsplash, Iconify, Content Reel, Figma to Code. Design handoff: use Zeplin or Figma's built-in inspect for developer specs.",
        docs: [
          { label: "Figma Help Center", url: "https://help.figma.com/" },
          {
            label: "Figma: Design Systems",
            url: "https://www.figma.com/best-practices/",
          },
        ],
      },
      {
        id: "ux-research",
        title: "UX Research",
        description: "User interviews, usability testing, personas, journeys.",
        level: "Intermediate",
        videos: [
          {
            label: "UX Research Methods – NNgroup",
            url: "https://www.youtube.com/watch?v=Ovj0GsLV23A",
          },
          {
            label: "How to Do User Research – Google UX",
            url: "https://www.youtube.com/watch?v=1UCDUOB_aS8",
          },
        ],
        notes:
          "Research goals: understand users' needs, behaviors, pain points — not to validate assumptions. Qualitative: user interviews (open-ended questions, 5-7 users), usability tests (observe task completion), contextual inquiry (observe in real environment), diary studies. Quantitative: surveys (scale questions, NPS), analytics (funnel analysis, heatmaps), A/B tests. 5-user rule: 5 participants reveal ~85% of usability issues (Jakob Nielsen). Personas: fictional composite users based on research data — name, goals, frustrations. NOT demographic stereotypes. Customer journey map: touchpoints + actions + thoughts + emotions + opportunities. Jobs-to-be-done: 'When I [situation], I want to [motivation], so I can [outcome]'. Usability testing script: task scenarios (not instructions — 'Buy a birthday gift for a friend'), think-aloud protocol. Affinity mapping: group insights from research into themes.",
        docs: [
          {
            label: "NNgroup: UX Research",
            url: "https://www.nngroup.com/articles/which-ux-research-methods/",
          },
          {
            label: "Google UX Design Certificate",
            url: "https://grow.google/certificates/ux-design/",
          },
          { label: "UX Planet", url: "https://uxplanet.org/" },
        ],
      },
      {
        id: "accessibility",
        title: "Accessibility (a11y)",
        description: "WCAG, ARIA, keyboard nav, screen readers.",
        level: "Intermediate",
        videos: [
          {
            label: "Web Accessibility – freeCodeCamp",
            url: "https://www.youtube.com/watch?v=e2nkq3h1P68",
          },
        ],
        notes:
          "Accessibility = designing for users with disabilities (visual, hearing, motor, cognitive). WCAG 2.1: Perceivable, Operable, Understandable, Robust (POUR). Level AA is the standard target for most products. Color contrast: 4.5:1 for normal text, 3:1 for large text (18px+ or bold 14px+). Don't rely on color alone to convey information. Keyboard navigation: all interactive elements must be reachable via Tab key. Focus indicators: visible focus ring is required. ARIA (Accessible Rich Internet Applications): role, aria-label, aria-describedby, aria-expanded, aria-live for dynamic content. Screen readers: NVDA (Windows), VoiceOver (Mac/iOS), TalkBack (Android). Semantic HTML is the foundation: <button> not <div onclick>. Alt text for images: descriptive for informational images, empty alt='' for decorative. Skip navigation link: allow screen reader users to skip repetitive nav.",
        docs: [
          {
            label: "WCAG 2.1 Quick Reference",
            url: "https://www.w3.org/WAI/WCAG21/quickref/",
          },
          {
            label: "MDN: Accessibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
          },
          { label: "a11yproject.com", url: "https://www.a11yproject.com/" },
        ],
      },
    ],
  },
];
