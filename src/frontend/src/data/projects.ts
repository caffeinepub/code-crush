export type ProjectTask = {
  id: string;
  title: string;
  desc: string;
  hints: string[];
  starterCode: string;
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  track: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tasks: ProjectTask[];
  techStack: string[];
  xpReward: number;
};

export const ALL_PROJECTS: Project[] = [
  // ── Full Stack ──────────────────────────────────────────────────────────
  {
    id: "fs-todo-auth",
    title: "Todo App with Auth",
    desc: "A full-stack task manager with user authentication, persistent storage, and a clean React UI backed by a Node.js REST API.",
    track: "Full Stack",
    difficulty: "Intermediate",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    xpReward: 300,
    tasks: [
      {
        id: "fs-todo-1",
        title: "Init repo & project structure",
        desc: "Create a monorepo with /client and /server folders. Init package.json for both.",
        hints: [
          "Use 'mkdir todo-app && cd todo-app && mkdir client server' then run 'npm init -y' in each.",
          "Add a root package.json with workspaces: ['client', 'server'] for easy script running.",
          "Add a .gitignore at root that ignores node_modules/ in both subdirectories.",
        ],
        starterCode: `# Project Structure
todo-app/
  client/     # React frontend
  server/     # Node.js + Express backend
  .gitignore
  README.md

# In /server
npm init -y
npm install express mongoose dotenv cors jsonwebtoken bcryptjs

# In /client
npx create-react-app . --template typescript`,
      },
      {
        id: "fs-todo-2",
        title: "Build REST API",
        desc: "Create Express routes: GET /todos, POST /todos, PUT /todos/:id, DELETE /todos/:id.",
        hints: [
          "Use express.Router() to keep routes in a separate file like routes/todos.js.",
          "Each handler should be async and wrapped in try/catch to return proper error messages.",
          "Return 404 with a message when a todo ID is not found in PUT/DELETE handlers.",
        ],
        starterCode: `const express = require('express');
const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create todo
router.post('/', async (req, res) => {
  const todo = new Todo({ title: req.body.title, userId: req.user.id });
  await todo.save();
  res.status(201).json(todo);
});

module.exports = router;`,
      },
      {
        id: "fs-todo-3",
        title: "Set up MongoDB",
        desc: "Connect Mongoose, define a Todo schema with title, done, userId fields.",
        hints: [
          "Use mongoose.connect(process.env.MONGO_URI) in your server entry file.",
          "Define the schema: { title: String, done: Boolean, userId: String, createdAt: Date }.",
          "Use mongoose.Schema timestamps option to auto-add createdAt and updatedAt fields.",
        ],
        starterCode: `const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  userId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);

// In server.js:
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));`,
      },
      {
        id: "fs-todo-4",
        title: "Add JWT authentication",
        desc: "Add /auth/register and /auth/login endpoints. Protect todo routes with middleware.",
        hints: [
          "Hash passwords with bcryptjs before saving: const hash = await bcrypt.hash(password, 10).",
          "Sign the JWT with: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }).",
          "In middleware, verify with jwt.verify(token, process.env.JWT_SECRET) and attach user to req.",
        ],
        starterCode: `// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// routes/auth.js - POST /auth/login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const valid = user && await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});`,
      },
      {
        id: "fs-todo-5",
        title: "Build React frontend",
        desc: "Create Login, Register, and TodoList components. Use Context for auth state.",
        hints: [
          "Create an AuthContext with { user, token, login, logout } and wrap App in the provider.",
          "Store the JWT in localStorage so the user stays logged in on page refresh.",
          "Use React Router: / shows TodoList (protected), /login and /register are public routes.",
        ],
        starterCode: `// context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);`,
      },
      {
        id: "fs-todo-6",
        title: "Connect frontend to API",
        desc: "Use axios or fetch to call the backend. Handle loading and error states.",
        hints: [
          "Set up an axios instance with baseURL and a request interceptor that adds the Authorization header.",
          "Use a custom hook useTodos() that returns { todos, loading, error, addTodo, toggleTodo, deleteTodo }.",
          "Show a spinner while loading and an error message if the request fails.",
        ],
        starterCode: `// api/axios.ts
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

export default api;

// hooks/useTodos.ts
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/todos').then(res => setTodos(res.data)).finally(() => setLoading(false));
  }, []);

  return { todos, loading };
}`,
      },
      {
        id: "fs-todo-7",
        title: "Deploy to Render / Vercel",
        desc: "Deploy the backend on Render and the frontend on Vercel. Set CORS and env vars.",
        hints: [
          "In Express, add cors({ origin: 'https://your-vercel-app.vercel.app' }) before your routes.",
          "On Render, add MONGO_URI and JWT_SECRET as environment variables in the dashboard.",
          "On Vercel, add REACT_APP_API_URL pointing to your Render service URL.",
        ],
        starterCode: `// server.js - add before routes
const cors = require('cors');
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// .env (server)
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
PORT=5000

// .env.local (client)
REACT_APP_API_URL=https://your-app.onrender.com`,
      },
    ],
  },
  {
    id: "fs-blog",
    title: "Blog Platform",
    desc: "A full-stack blog where users can create, edit, and publish posts with Markdown support and a comment system.",
    track: "Full Stack",
    difficulty: "Advanced",
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind", "NextAuth"],
    xpReward: 400,
    tasks: [
      {
        id: "fs-blog-1",
        title: "Bootstrap Next.js project",
        desc: "npx create-next-app with TypeScript + Tailwind. Set up folder structure.",
        hints: [
          "Run: npx create-next-app@latest blog --typescript --tailwind --app",
          "Create these folders: app/, components/, lib/, prisma/",
          "Install dependencies: npm install prisma @prisma/client next-auth react-markdown",
        ],
        starterCode: `npx create-next-app@latest blog --typescript --tailwind --app
cd blog
npm install prisma @prisma/client next-auth @auth/prisma-adapter react-markdown
npx prisma init

# Folder structure:
blog/
  app/
    (auth)/login/
    dashboard/
    posts/[slug]/
  components/
  lib/
    prisma.ts
  prisma/
    schema.prisma`,
      },
      {
        id: "fs-blog-2",
        title: "Design database schema",
        desc: "Define User, Post, Comment models in Prisma. Run migrations.",
        hints: [
          "Each Post should have: id, title, slug, body, published, createdAt, authorId.",
          "Add a unique constraint on slug: slug String @unique",
          "Run 'npx prisma migrate dev --name init' to create and apply the migration.",
        ],
        starterCode: `// prisma/schema.prisma
model User {
  id       String   @id @default(cuid())
  name     String?
  email    String   @unique
  posts    Post[]
  comments Comment[]
}

model Post {
  id        String    @id @default(cuid())
  title     String
  slug      String    @unique
  body      String
  published Boolean   @default(false)
  createdAt DateTime  @default(now())
  author    User      @relation(fields: [authorId], references: [id])
  authorId  String
  comments  Comment[]
}

model Comment {
  id        String   @id @default(cuid())
  body      String
  createdAt DateTime @default(now())
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
}`,
      },
      {
        id: "fs-blog-3",
        title: "Implement authentication",
        desc: "Integrate NextAuth with GitHub OAuth provider. Protect dashboard routes.",
        hints: [
          "Create app/api/auth/[...nextauth]/route.ts with GitHub provider config.",
          "Use middleware.ts to protect /dashboard routes: check session with getToken().",
          "Set NEXTAUTH_SECRET and GITHUB_ID/GITHUB_SECRET in your .env.local file.",
        ],
        starterCode: `// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };`,
      },
      {
        id: "fs-blog-4",
        title: "Build post CRUD API",
        desc: "Create /api/posts endpoints. Support create, read, update, delete with Prisma.",
        hints: [
          "Use Next.js Route Handlers in app/api/posts/route.ts for GET and POST.",
          "For PUT/DELETE, use app/api/posts/[id]/route.ts and check the user owns the post.",
          "Generate a slug from the title: slug = title.toLowerCase().replace(/\\s+/g, '-')",
        ],
        starterCode: `// app/api/posts/route.ts
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
  return Response.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, body } = await req.json();
  const slug = title.toLowerCase().replace(/\\s+/g, '-');
  const post = await prisma.post.create({
    data: { title, body, slug, authorId: session.user.email },
  });
  return Response.json(post);
}`,
      },
      {
        id: "fs-blog-5",
        title: "Markdown editor & rendering",
        desc: "Add react-markdown for preview. Allow Markdown in post body field.",
        hints: [
          "Use a split-pane view: left side textarea for input, right side ReactMarkdown for preview.",
          "Add remark-gfm plugin for GitHub-flavored Markdown (tables, checkboxes, etc.).",
          "Style the rendered markdown by passing a components prop to ReactMarkdown.",
        ],
        starterCode: `import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MarkdownEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-64 p-3 border rounded font-mono text-sm"
        placeholder="Write Markdown here..."
      />
      <div className="h-64 overflow-auto p-3 border rounded prose prose-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
      </div>
    </div>
  );
}`,
      },
      {
        id: "fs-blog-6",
        title: "Comment system",
        desc: "Allow authenticated users to post/delete comments. Render under each post.",
        hints: [
          "Add a comment form below the post with a textarea and submit button.",
          "POST to /api/posts/[id]/comments. Only show delete button if comment.authorId === session.user.id.",
          "Use optimistic updates: add the comment to local state immediately before the API call.",
        ],
        starterCode: `function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState('');
  const { data: session } = useSession();

  const submitComment = async () => {
    const res = await fetch(\`/api/posts/\${postId}/comments\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    });
    const comment = await res.json();
    setComments(prev => [...prev, comment]);
    setBody('');
  };

  return (
    <div>
      {comments.map(c => <div key={c.id}>{c.body}</div>)}
      {session && (
        <textarea value={body} onChange={e => setBody(e.target.value)} />
      )}
    </div>
  );
}`,
      },
      {
        id: "fs-blog-7",
        title: "SEO & deployment",
        desc: "Add og:title meta tags per post. Deploy on Vercel with a PostgreSQL on Railway.",
        hints: [
          "In Next.js App Router, export a generateMetadata() function from each page.",
          "On Railway, provision a PostgreSQL plugin and copy the DATABASE_URL to Vercel env vars.",
          "Set NEXTAUTH_URL to your Vercel deployment URL in both Railway and Vercel dashboards.",
        ],
        starterCode: `// app/posts/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: post.body.slice(0, 160),
      type: 'article',
    },
  };
}

// .env.local
DATABASE_URL="postgresql://user:pass@localhost:5432/blog"
NEXTAUTH_URL="https://your-blog.vercel.app"
NEXTAUTH_SECRET="your-secret"`,
      },
    ],
  },

  // ── Frontend ─────────────────────────────────────────────────────────────
  {
    id: "fe-portfolio",
    title: "Portfolio Website",
    desc: "A personal portfolio showcasing your projects, skills, and contact details with smooth animations and dark mode.",
    track: "Frontend",
    difficulty: "Beginner",
    techStack: ["HTML", "CSS", "JavaScript", "Tailwind"],
    xpReward: 150,
    tasks: [
      {
        id: "fe-port-1",
        title: "Design wireframe",
        desc: "Sketch sections: Hero, About, Skills, Projects, Contact. Decide color palette.",
        hints: [
          "Use tools like Figma, Excalidraw, or even pen and paper to sketch layouts.",
          "Choose 2-3 colors: one primary accent, one background, one text color.",
          "Keep the hero section simple: your name, title, and a call-to-action button.",
        ],
        starterCode: `<!-- Suggested sections -->
<!-- 1. Hero: Name, title, CTA button -->
<!-- 2. About: Photo, short bio, fun facts -->
<!-- 3. Skills: Grid of icons/badges -->
<!-- 4. Projects: Cards with image, title, links -->
<!-- 5. Contact: Email, social links, form -->

<!-- Color palette example -->
:root {
  --primary: #6366f1; /* indigo */
  --bg: #0f172a;       /* dark navy */
  --text: #f8fafc;     /* near white */
}`,
      },
      {
        id: "fe-port-2",
        title: "Set up HTML structure",
        desc: "Create index.html with semantic tags: header, main, section, footer.",
        hints: [
          "Always start with <!DOCTYPE html> and set lang='en' on the html tag.",
          "Use <section id='about'>, <section id='skills'> etc. for easy anchor linking.",
          "Add a <nav> inside <header> with links that scroll to each section.",
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Name – Developer</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="hero"><h1>Hi, I'm Your Name</h1></section>
    <section id="about"></section>
    <section id="skills"></section>
    <section id="projects"></section>
    <section id="contact"></section>
  </main>
  <footer>© 2025 Your Name</footer>
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        id: "fe-port-3",
        title: "Style with Tailwind",
        desc: "Install Tailwind via CDN. Add typography, spacing, and responsive breakpoints.",
        hints: [
          "Add Tailwind via CDN: <script src='https://cdn.tailwindcss.com'></script>",
          "Use responsive prefixes: sm:, md:, lg: to adjust layouts on different screens.",
          "Use gap-4, p-6, rounded-xl, shadow-lg on project cards for a clean look.",
        ],
        starterCode: `<!-- Add to <head> -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Hero section with Tailwind -->
<section id="hero" class="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-900 text-white">
  <h1 class="text-5xl font-bold mb-4">Hi, I'm <span class="text-indigo-400">Your Name</span></h1>
  <p class="text-xl text-slate-300 mb-8">Full Stack Developer</p>
  <a href="#projects" class="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold transition">
    View My Work
  </a>
</section>`,
      },
      {
        id: "fe-port-4",
        title: "Add scroll animations",
        desc: "Use Intersection Observer API to fade-in sections on scroll.",
        hints: [
          "Add class 'opacity-0 translate-y-8 transition-all duration-700' to each section initially.",
          "When the IntersectionObserver fires, remove those classes and add 'opacity-100 translate-y-0'.",
          "Set threshold: 0.1 so animations trigger when just 10% of the element is visible.",
        ],
        starterCode: `// script.js
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-8');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
  observer.observe(section);
});`,
      },
      {
        id: "fe-port-5",
        title: "Dark mode toggle",
        desc: "Implement a light/dark toggle that persists in localStorage.",
        hints: [
          "Add a toggle button in the navbar. On click, toggle a 'dark' class on <html>.",
          "In Tailwind config, set darkMode: 'class' to use class-based dark mode.",
          "On page load, check localStorage for 'theme' and apply it before rendering.",
        ],
        starterCode: `// script.js - Dark mode toggle
const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') html.classList.add('dark');

toggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// Tailwind config (in <script>)
tailwind.config = { darkMode: 'class' };`,
      },
      {
        id: "fe-port-6",
        title: "Deploy on GitHub Pages",
        desc: "Push repo to GitHub. Enable GitHub Pages in repository settings.",
        hints: [
          "Go to repo Settings → Pages → Source: Deploy from branch → Select 'main' and '/ (root)'.",
          "Your site will be live at https://yourusername.github.io/repo-name/",
          "If using custom domain, add a CNAME file with your domain name to the repo root.",
        ],
        starterCode: `# Deploy to GitHub Pages
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# Then in GitHub:
# Settings → Pages → Source → main branch → Save
# Live at: https://yourusername.github.io/portfolio/`,
      },
    ],
  },
  {
    id: "fe-weather",
    title: "Weather Dashboard",
    desc: "A React app that shows real-time weather for any city using the OpenWeatherMap API with a beautiful card UI.",
    track: "Frontend",
    difficulty: "Intermediate",
    techStack: ["React", "TypeScript", "OpenWeatherMap API", "Chart.js"],
    xpReward: 250,
    tasks: [
      {
        id: "fe-wx-1",
        title: "Create React + TS project",
        desc: "npx create-react-app with TypeScript template. Clean up boilerplate.",
        hints: [
          "Run: npx create-react-app weather-app --template typescript",
          "Delete App.test.tsx, logo.svg, reportWebVitals.ts from src/.",
          "Install axios and chart.js: npm install axios chart.js react-chartjs-2",
        ],
        starterCode: `npx create-react-app weather-app --template typescript
cd weather-app
npm install axios chart.js react-chartjs-2

# Clean up src/:
rm src/App.test.tsx src/logo.svg src/reportWebVitals.ts

# Create these files:
src/
  components/
    WeatherCard.tsx
    SearchBar.tsx
    ForecastChart.tsx
  hooks/
    useWeather.ts
  types/
    weather.ts`,
      },
      {
        id: "fe-wx-2",
        title: "Integrate OpenWeatherMap API",
        desc: "Register for a free API key. Fetch current weather by city name.",
        hints: [
          "Free API key at openweathermap.org/api. The free tier allows 60 calls/minute.",
          "Current weather URL: https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric",
          "Store the API key in a .env file as REACT_APP_WEATHER_KEY (never commit .env).",
        ],
        starterCode: `// hooks/useWeather.ts
import axios from 'axios';
import { useState } from 'react';

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
      );
      setData(res.data);
    } catch {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchWeather };
}`,
      },
      {
        id: "fe-wx-3",
        title: "Build WeatherCard component",
        desc: "Display temperature, humidity, wind speed, and weather icon.",
        hints: [
          "Weather icon URL: https://openweathermap.org/img/wn/{icon}@2x.png",
          "Round the temperature: Math.round(data.main.temp)",
          "Wind speed is in m/s — multiply by 3.6 to convert to km/h.",
        ],
        starterCode: `// components/WeatherCard.tsx
function WeatherCard({ data }: { data: WeatherData }) {
  const iconUrl = \`https://openweathermap.org/img/wn/\${data.weather[0].icon}@2x.png\`;

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="text-blue-100">{data.weather[0].description}</p>
        </div>
        <img src={iconUrl} alt="weather icon" className="w-16 h-16" />
      </div>
      <div className="mt-4 text-5xl font-black">{Math.round(data.main.temp)}°C</div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-blue-100">
        <span>💧 Humidity: {data.main.humidity}%</span>
        <span>💨 Wind: {Math.round(data.wind.speed * 3.6)} km/h</span>
      </div>
    </div>
  );
}`,
      },
      {
        id: "fe-wx-4",
        title: "Search functionality",
        desc: "Add a search bar with debounce. Handle 404 for unknown cities.",
        hints: [
          "Use useCallback with a setTimeout of 500ms to debounce the search input.",
          "Show an error message when the API returns a 404 (city not found).",
          "Add a loading spinner (or skeleton) while the request is in flight.",
        ],
        starterCode: `// components/SearchBar.tsx
import { useState, useCallback } from 'react';

function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    setValue(city);
    // Debounce: wait 500ms before calling
    const timer = setTimeout(() => {
      if (city.trim()) onSearch(city.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [onSearch]);

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder="Search city..."
      className="w-full border rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400"
    />
  );
}`,
      },
      {
        id: "fe-wx-5",
        title: "5-day forecast chart",
        desc: "Use Chart.js to render a temperature line chart for the 5-day forecast.",
        hints: [
          "Forecast API: https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={key}&units=metric",
          "The forecast returns 40 entries (every 3 hours). Filter to one per day: filter by time '12:00:00'.",
          "Register Chart.js components: import { Chart, LineElement, ... } from 'chart.js'; Chart.register(...);",
        ],
        starterCode: `import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

function ForecastChart({ forecast }: { forecast: ForecastItem[] }) {
  // Filter to noon entries only
  const daily = forecast.filter(f => f.dt_txt.includes('12:00:00'));

  const data = {
    labels: daily.map(f => new Date(f.dt * 1000).toLocaleDateString('en', { weekday: 'short' })),
    datasets: [{
      label: 'Temp (°C)',
      data: daily.map(f => Math.round(f.main.temp)),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  return <Line data={data} />;
}`,
      },
      {
        id: "fe-wx-6",
        title: "Responsive layout & deploy",
        desc: "Make the layout mobile-friendly. Deploy on Netlify.",
        hints: [
          "Use a max-w-2xl mx-auto px-4 container so the layout looks good on all screens.",
          "On Netlify: drag and drop the build folder, or connect GitHub for auto-deploys.",
          "Add your API key as REACT_APP_WEATHER_KEY in Netlify's Environment Variables settings.",
        ],
        starterCode: `// App.tsx - responsive container
function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🌤 Weather Dashboard</h1>
        <SearchBar onSearch={fetchWeather} />
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {data && <WeatherCard data={data} />}
        {forecast && <ForecastChart forecast={forecast} />}
      </div>
    </div>
  );
}

# Deploy on Netlify:
npm run build
# Drag 'build' folder to netlify.com/drop`,
      },
    ],
  },

  // ── App Development ───────────────────────────────────────────────────────
  {
    id: "app-calc",
    title: "Mobile Calculator App",
    desc: "A React Native calculator app with a slick UI, supporting basic and scientific operations with haptic feedback.",
    track: "App Development",
    difficulty: "Beginner",
    techStack: ["React Native", "Expo", "TypeScript"],
    xpReward: 200,
    tasks: [
      {
        id: "app-calc-1",
        title: "Scaffold Expo project",
        desc: "npx create-expo-app. Set up TypeScript config and folder structure.",
        hints: [
          "Run: npx create-expo-app Calculator --template expo-template-blank-typescript",
          "Install extras: npx expo install expo-haptics expo-status-bar",
          "Create src/components/ and src/utils/calculate.ts folders.",
        ],
        starterCode: `npx create-expo-app Calculator --template expo-template-blank-typescript
cd Calculator
npx expo install expo-haptics expo-status-bar

# Structure:
Calculator/
  src/
    components/
      CalcButton.tsx
      Display.tsx
    utils/
      calculate.ts
  App.tsx`,
      },
      {
        id: "app-calc-2",
        title: "Build button grid UI",
        desc: "Create a responsive button grid for digits, operators, and function keys.",
        hints: [
          "Use FlatList with numColumns={4} or a nested View with flexDirection:'row' for rows.",
          "Define button data as an array: [{ label: '7', type: 'digit' }, { label: '+', type: 'operator' },...]",
          "Use flex: 1 on buttons so they fill available space evenly in each row.",
        ],
        starterCode: `// components/CalcButton.tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const COLORS = {
  digit: '#333',
  operator: '#f97316',
  function: '#6b7280',
  equals: '#6366f1',
};

export function CalcButton({ label, type, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: COLORS[type] }]}
      onPress={() => onPress(label)}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, aspectRatio: 1, borderRadius: 50, margin: 4, justifyContent: 'center', alignItems: 'center' },
  label: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});`,
      },
      {
        id: "app-calc-3",
        title: "Implement calculation logic",
        desc: "Handle input parsing, operator precedence, and edge cases (divide by zero).",
        hints: [
          "Store the expression as a string and use eval() for simple parsing (sanitize input first).",
          "Check for division by zero before evaluating: if (expression.includes('/0')) return 'Error'",
          "Handle the case where the user presses an operator twice in a row.",
        ],
        starterCode: `// utils/calculate.ts
export function calculate(expression: string): string {
  if (!expression) return '0';
  // Replace × and ÷ with * and /
  const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
  // Check divide by zero
  if (/\/\s*0/.test(sanitized)) return 'Error';
  try {
    // eslint-disable-next-line no-eval
    const result = eval(sanitized);
    return Number.isFinite(result) ? String(result) : 'Error';
  } catch {
    return 'Error';
  }
}`,
      },
      {
        id: "app-calc-4",
        title: "Add scientific mode",
        desc: "Add toggle between Basic and Scientific modes with sin, cos, tan, √ etc.",
        hints: [
          "Use a boolean state 'isScientific'. When true, render an extra row of sci buttons above.",
          "For trig functions, convert degrees to radians: Math.sin(angle * Math.PI / 180)",
          "Square root: inject 'Math.sqrt(' into the expression when √ is pressed.",
        ],
        starterCode: `// Scientific buttons data
const SCI_BUTTONS = [
  { label: 'sin', fn: (x: number) => Math.sin(x * Math.PI / 180) },
  { label: 'cos', fn: (x: number) => Math.cos(x * Math.PI / 180) },
  { label: 'tan', fn: (x: number) => Math.tan(x * Math.PI / 180) },
  { label: '√',  fn: (x: number) => Math.sqrt(x) },
  { label: 'x²', fn: (x: number) => x ** 2 },
  { label: 'log', fn: (x: number) => Math.log10(x) },
];

// In App.tsx
const [isScientific, setIsScientific] = useState(false);

// Toggle button
<Switch value={isScientific} onValueChange={setIsScientific} />
{isScientific && <ScientificRow onPress={handleSci} />}`,
      },
      {
        id: "app-calc-5",
        title: "Haptic feedback",
        desc: "Use expo-haptics to give feedback on button press.",
        hints: [
          "Import: import * as Haptics from 'expo-haptics';",
          "Call Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) on digit press.",
          "Use ImpactFeedbackStyle.Heavy for the equals button for a satisfying feel.",
        ],
        starterCode: `import * as Haptics from 'expo-haptics';

// In CalcButton.tsx
const handlePress = async () => {
  if (type === 'equals') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } else if (type === 'operator') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } else {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  onPress(label);
};`,
      },
      {
        id: "app-calc-6",
        title: "Test on iOS & Android",
        desc: "Run on Expo Go. Fix layout issues for different screen sizes.",
        hints: [
          "Install Expo Go on your phone, then run 'npx expo start' and scan the QR code.",
          "Use Dimensions.get('window') to make button size relative to screen width.",
          "Test edge cases: very long numbers, rapid pressing, portrait vs landscape.",
        ],
        starterCode: `import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = (width - 40) / 4; // 4 columns with margins

// In styles:
button: {
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  borderRadius: BUTTON_SIZE / 2,
},

// Run on device:
npx expo start
# Scan QR code with Expo Go app

# Build APK (optional):
npx expo build:android`,
      },
    ],
  },
  {
    id: "app-habit",
    title: "Habit Tracker App",
    desc: "A cross-platform mobile app to create, track, and streak habits with push notifications and a calendar heatmap.",
    track: "App Development",
    difficulty: "Intermediate",
    techStack: ["React Native", "Expo", "AsyncStorage", "Reanimated"],
    xpReward: 300,
    tasks: [
      {
        id: "app-habit-1",
        title: "Project setup",
        desc: "Create Expo app. Install dependencies: AsyncStorage, react-native-calendars.",
        hints: [
          "npx create-expo-app HabitTracker --template expo-template-blank-typescript",
          "Install: npx expo install @react-native-async-storage/async-storage react-native-calendars",
          "Also install: expo-notifications react-native-reanimated",
        ],
        starterCode: `npx create-expo-app HabitTracker --template expo-template-blank-typescript
cd HabitTracker
npx expo install @react-native-async-storage/async-storage react-native-calendars expo-notifications react-native-reanimated

# babel.config.js - add reanimated plugin:
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};`,
      },
      {
        id: "app-habit-2",
        title: "Habit data model",
        desc: "Define Habit type (id, title, frequency, completedDates). Persist with AsyncStorage.",
        hints: [
          "completedDates should be a string array of ISO date strings: ['2025-03-01', '2025-03-02']",
          "Use AsyncStorage.setItem('habits', JSON.stringify(habits)) to save.",
          "Create a useHabits() hook that loads on mount and exposes add/toggle/delete functions.",
        ],
        starterCode: `// types/habit.ts
export interface Habit {
  id: string;
  title: string;
  color: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[]; // ISO: '2025-03-01'
  createdAt: string;
}

// hooks/useHabits.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const save = async (data: Habit[]) => {
    setHabits(data);
    await AsyncStorage.setItem('habits', JSON.stringify(data));
  };

  const toggleToday = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    save(habits.map(h => h.id === id
      ? { ...h, completedDates: h.completedDates.includes(today)
          ? h.completedDates.filter(d => d !== today)
          : [...h.completedDates, today] }
      : h
    ));
  };

  return { habits, toggleToday };
}`,
      },
      {
        id: "app-habit-3",
        title: "Habit list screen",
        desc: "Show all habits with completion status for today. Add swipe-to-delete.",
        hints: [
          "Use today's ISO date string to check if a habit has been completed: habit.completedDates.includes(today)",
          "For swipe-to-delete, use react-native-swipeable or Animated with PanResponder.",
          "Show a checkmark icon when completed and an empty circle when not.",
        ],
        starterCode: `const today = new Date().toISOString().split('T')[0];

function HabitItem({ habit, onToggle, onDelete }: HabitItemProps) {
  const isDone = habit.completedDates.includes(today);

  return (
    <View style={styles.row}>
      <View style={[styles.colorDot, { backgroundColor: habit.color }]} />
      <Text style={styles.title}>{habit.title}</Text>
      <TouchableOpacity onPress={() => onToggle(habit.id)}>
        <Text style={{ fontSize: 24 }}>{isDone ? '✅' : '⭕'}</Text>
      </TouchableOpacity>
    </View>
  );
}`,
      },
      {
        id: "app-habit-4",
        title: "Create habit modal",
        desc: "Form to add a habit with title, color, and daily/weekly frequency.",
        hints: [
          "Use a Modal component from React Native with a form inside.",
          "For color selection, show 6-8 color circles the user can tap.",
          "Generate a unique ID with: id = Date.now().toString()",
        ],
        starterCode: `const COLORS = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899'];

function AddHabitModal({ visible, onClose, onAdd }: ModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ id: Date.now().toString(), title, color, frequency, completedDates: [], createdAt: new Date().toISOString() });
    onClose();
    setTitle('');
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <TextInput value={title} onChangeText={setTitle} placeholder="Habit name" />
      <View style={{ flexDirection: 'row' }}>
        {COLORS.map(c => (
          <TouchableOpacity key={c} onPress={() => setColor(c)}
            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: c,
              borderWidth: color === c ? 3 : 0, borderColor: 'white', margin: 4 }} />
        ))}
      </View>
      <Button title="Add Habit" onPress={handleAdd} />
    </Modal>
  );
}`,
      },
      {
        id: "app-habit-5",
        title: "Calendar heatmap view",
        desc: "Display a monthly calendar with dots for each day a habit was completed.",
        hints: [
          "Use react-native-calendars' CalendarList or Calendar component.",
          "Transform completedDates into a markedDates object: { '2025-03-01': { marked: true, dotColor: habit.color } }",
          "Combine all habits' dates into a single markedDates object for the combined view.",
        ],
        starterCode: `import { Calendar } from 'react-native-calendars';

function HabitCalendar({ habits }: { habits: Habit[] }) {
  const markedDates = habits.reduce((acc, habit) => {
    habit.completedDates.forEach(date => {
      if (!acc[date]) acc[date] = { dots: [] };
      acc[date].dots.push({ color: habit.color });
    });
    return acc;
  }, {} as Record<string, { dots: Array<{ color: string }> }>);

  return (
    <Calendar
      markingType="multi-dot"
      markedDates={markedDates}
      theme={{ backgroundColor: '#fff', calendarBackground: '#fff' }}
    />
  );
}`,
      },
      {
        id: "app-habit-6",
        title: "Push notifications",
        desc: "Schedule daily reminders with expo-notifications for each habit.",
        hints: [
          "First request permissions: await Notifications.requestPermissionsAsync()",
          "Schedule with: Notifications.scheduleNotificationAsync({ content: {...}, trigger: { hour: 9, minute: 0, repeats: true } })",
          "Store notification IDs so you can cancel them if the habit is deleted.",
        ],
        starterCode: `import * as Notifications from 'expo-notifications';

export async function scheduleHabitReminder(habit: Habit) {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '🎯 Habit Reminder',
      body: \`Time to: \${habit.title}\`,
      data: { habitId: habit.id },
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });

  return id; // Save this to cancel later
}

export async function cancelHabitReminder(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}`,
      },
      {
        id: "app-habit-7",
        title: "Streak calculation",
        desc: "Compute current streak and longest streak. Display on habit card.",
        hints: [
          "Sort completedDates in descending order, then count consecutive days starting from today.",
          "For longest streak, iterate through sorted dates and track the max consecutive run.",
          "A day break resets the current streak counter to 0.",
        ],
        starterCode: `export function calculateStreaks(completedDates: string[]) {
  if (!completedDates.length) return { current: 0, longest: 0 };

  const sorted = [...completedDates].sort().reverse(); // newest first
  const today = new Date().toISOString().split('T')[0];

  let current = 0;
  let checkDate = today;

  for (const date of sorted) {
    if (date === checkDate) {
      current++;
      const d = new Date(checkDate);
      d.setDate(d.getDate() - 1);
      checkDate = d.toISOString().split('T')[0];
    } else break;
  }

  // Longest streak
  let longest = 0;
  let tempStreak = 1;
  const asc = [...completedDates].sort();
  for (let i = 1; i < asc.length; i++) {
    const diff = (new Date(asc[i]).getTime() - new Date(asc[i-1]).getTime()) / 86400000;
    if (diff === 1) { tempStreak++; longest = Math.max(longest, tempStreak); }
    else tempStreak = 1;
  }

  return { current, longest: Math.max(longest, current) };
}`,
      },
    ],
  },

  // ── Web Development ───────────────────────────────────────────────────────
  {
    id: "web-ecom",
    title: "E-commerce Landing Page",
    desc: "A pixel-perfect e-commerce landing page with hero, product grid, testimonials, and a working cart drawer.",
    track: "Web Development",
    difficulty: "Beginner",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    xpReward: 175,
    tasks: [
      {
        id: "web-ec-1",
        title: "Design mockup",
        desc: "Create a Figma (or paper) wireframe for hero, features, products, footer sections.",
        hints: [
          "Keep the hero section high-contrast: large text, clear CTA, product image on the right.",
          "Product cards should show: image, name, price, and an 'Add to Cart' button.",
          "Aim for a 3-column product grid on desktop, 1-column on mobile.",
        ],
        starterCode: `<!-- Wireframe sections -->
<!-- 1. Sticky nav: Logo | Links | Cart icon (badge) -->
<!-- 2. Hero: Headline + CTA left, Product image right -->
<!-- 3. Features: 3-column icon grid -->
<!-- 4. Products: 3-col grid of cards -->
<!-- 5. Testimonials: 3 quote cards -->
<!-- 6. Footer: Links, newsletter, socials -->

<!-- Color palette suggestion -->
:root {
  --brand: #f97316;    /* warm orange */
  --dark:  #1e1b4b;    /* deep indigo */
  --light: #fafafa;
  --card:  #ffffff;
}`,
      },
      {
        id: "web-ec-2",
        title: "Build HTML skeleton",
        desc: "Write semantic HTML5 with nav, hero, section, article, footer elements.",
        hints: [
          "Add id attributes to each section (id='products') for anchor-link navigation.",
          "Use <article> for each product card and <figure> for product images.",
          "The cart icon in nav needs a <span id='cart-count'> badge to show item count.",
        ],
        starterCode: `<nav class="sticky top-0 z-50 bg-white shadow">
  <div class="container">
    <a href="/" class="logo">ShopName</a>
    <ul class="nav-links">
      <li><a href="#products">Products</a></li>
    </ul>
    <button id="cart-btn">🛒 <span id="cart-count">0</span></button>
  </div>
</nav>

<section id="hero">
  <div class="hero-text">
    <h1>Shop the Best</h1>
    <a href="#products" class="btn">Shop Now</a>
  </div>
  <img src="hero-product.png" alt="hero product" />
</section>

<section id="products">
  <h2>Featured Products</h2>
  <div class="product-grid" id="product-grid">
    <!-- JS will inject cards here -->
  </div>
</section>`,
      },
      {
        id: "web-ec-3",
        title: "Style with CSS Grid",
        desc: "Use CSS Grid and Flexbox for the product card layout. Ensure responsiveness.",
        hints: [
          "Use grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) for auto-responsive columns.",
          "Product card hover: transform: translateY(-4px) + box-shadow for a lift effect.",
          "Add aspect-ratio: 1 to product images so they're always square.",
        ],
        starterCode: `.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
}

.product-card {
  background: var(--card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.product-card img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}`,
      },
      {
        id: "web-ec-4",
        title: "Add GSAP animations",
        desc: "Animate hero text and product cards on scroll using GSAP ScrollTrigger.",
        hints: [
          "Include GSAP via CDN: <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'></script>",
          "For scroll animations: gsap.from('.product-card', { scrollTrigger: '.product-grid', y: 60, opacity: 0, stagger: 0.1 })",
          "Animate the hero text on page load with a timeline: gsap.timeline().from('h1', { y: -40, opacity: 0 })",
        ],
        starterCode: `// Load GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero entrance animation
const heroTl = gsap.timeline();
heroTl
  .from('.hero-text h1', { y: -40, opacity: 0, duration: 0.8 })
  .from('.hero-text p', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.hero-text .btn', { scale: 0.8, opacity: 0, duration: 0.4 }, '-=0.3');

// Product cards on scroll
gsap.from('.product-card', {
  scrollTrigger: {
    trigger: '#products',
    start: 'top 80%',
  },
  y: 60,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
});`,
      },
      {
        id: "web-ec-5",
        title: "Cart drawer",
        desc: "Implement a sliding cart drawer with add/remove items and total calculation.",
        hints: [
          "The cart drawer is a fixed right-side panel, hidden by default (transform: translateX(100%)).",
          "Toggle it with a CSS class that sets transform: translateX(0) and show an overlay behind it.",
          "Store cart items in a JavaScript array: cart = [{ id, name, price, qty }]",
        ],
        starterCode: `// Cart state
let cart = [];

// Toggle drawer
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart-drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
});

// Add to cart
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
  // Re-render cart items...
}`,
      },
      {
        id: "web-ec-6",
        title: "Deploy on Netlify",
        desc: "Push to GitHub. Connect to Netlify for automatic deployments.",
        hints: [
          "No build step needed — Netlify will serve your HTML/CSS/JS files directly.",
          "In Netlify, set Base directory to '.' and Publish directory to '.' (or wherever index.html is).",
          "Enable form notifications if you have a contact form (Netlify Forms is free).",
        ],
        starterCode: `# Deploy steps:
git init && git add . && git commit -m "E-commerce site"
git remote add origin https://github.com/YOU/ecommerce-site.git
git push -u origin main

# In Netlify:
# 1. New site → Import from Git → GitHub → Select repo
# 2. Build command: (leave blank)
# 3. Publish directory: . (or the folder with index.html)
# 4. Deploy site!

# Your site: https://your-site-name.netlify.app`,
      },
    ],
  },
  {
    id: "web-restaurant",
    title: "Restaurant Website",
    desc: "A full restaurant website with menu, online reservation form, gallery, and Google Maps embed.",
    track: "Web Development",
    difficulty: "Intermediate",
    techStack: ["HTML", "CSS", "JavaScript", "EmailJS"],
    xpReward: 225,
    tasks: [
      {
        id: "web-rest-1",
        title: "Plan sections & content",
        desc: "Outline: Hero, Menu (tabs), About, Gallery, Reservations, Contact.",
        hints: [
          "Write the menu content as a JS data array: { category, name, price, description, image }",
          "Plan the color scheme around the restaurant's vibe (warm earthy tones for Italian, etc.).",
          "Decide on the reservation fields: name, email, date, time, party size, special requests.",
        ],
        starterCode: `// Menu data structure
const menuItems = [
  { id: 1, category: 'Starters', name: 'Bruschetta', price: 8.99, desc: 'Toasted bread with tomatoes', img: 'bruschetta.jpg' },
  { id: 2, category: 'Mains', name: 'Pasta Carbonara', price: 16.99, desc: 'Classic Roman pasta', img: 'carbonara.jpg' },
  { id: 3, category: 'Desserts', name: 'Tiramisu', price: 7.99, desc: 'Classic Italian dessert', img: 'tiramisu.jpg' },
  // Add more items...
];

// Sections: Hero, Menu, About, Gallery, Reservations, Contact`,
      },
      {
        id: "web-rest-2",
        title: "Build responsive navigation",
        desc: "Create a sticky navbar with hamburger menu for mobile.",
        hints: [
          "Use position: fixed; top: 0; width: 100% for the sticky nav.",
          "The hamburger button (☰) toggles a CSS class on the nav to show/hide mobile menu.",
          "Add backdrop-filter: blur(10px) to the nav for a frosted glass effect.",
        ],
        starterCode: `<!-- HTML -->
<nav id="navbar">
  <a href="/" class="logo">La Cucina</a>
  <button class="hamburger" id="ham-btn">☰</button>
  <ul class="nav-menu" id="nav-menu">
    <li><a href="#menu">Menu</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#reservations">Reserve</a></li>
  </ul>
</nav>

<script>
document.getElementById('ham-btn').addEventListener('click', () => {
  document.getElementById('nav-menu').classList.toggle('open');
});
</script>

<style>
.nav-menu { display: flex; gap: 2rem; }
@media (max-width: 768px) {
  .nav-menu { display: none; flex-direction: column; }
  .nav-menu.open { display: flex; }
}
</style>`,
      },
      {
        id: "web-rest-3",
        title: "Menu with tab filters",
        desc: "Show menu items by category (Starters, Mains, Desserts, Drinks) with tab buttons.",
        hints: [
          "Filter the menuItems array by category when a tab is clicked.",
          "Re-render the grid with the filtered items using innerHTML.",
          "Add an 'active' CSS class to the selected tab button.",
        ],
        starterCode: `const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];
let activeCategory = 'All';

function renderMenu() {
  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(i => i.category === activeCategory);

  document.getElementById('menu-grid').innerHTML = filtered.map(item =>
    '<div class="menu-card">' +
    '<img src="' + item.img + '" alt="' + item.name + '" />' +
    '<div class="menu-info">' +
    '<h3>' + item.name + '</h3>' +
    '<p>' + item.desc + '</p>' +
    '<span class="price">$' + item.price + '</span>' +
    '</div></div>'
  ).join('');
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeCategory = btn.dataset.category;
    renderMenu();
  });
});`,
      },
      {
        id: "web-rest-4",
        title: "Photo gallery lightbox",
        desc: "Build a CSS grid gallery with a JS lightbox for full-screen viewing.",
        hints: [
          "Gallery grid: grid-template-columns: repeat(3, 1fr); with images having aspect-ratio: 1",
          "The lightbox is a fixed overlay with a centered <img>. Toggle visibility on click.",
          "Add keyboard support: close on Escape key, prev/next on arrow keys.",
        ],
        starterCode: `// Lightbox implementation
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach((img, i) => {
  img.addEventListener('click', () => {
    currentIndex = i;
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
});

function showImage(index) {
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}`,
      },
      {
        id: "web-rest-5",
        title: "Reservation form",
        desc: "Add a date/time/party-size form. Send confirmation email via EmailJS.",
        hints: [
          "Sign up at emailjs.com (free tier: 200 emails/month). Get Service ID, Template ID, Public Key.",
          "Call: emailjs.send(serviceId, templateId, { name, email, date, time, party }) on form submit.",
          "Validate: date must be in the future, party size 1-20, email format must be valid.",
        ],
        starterCode: `<!-- Include EmailJS SDK in <head> -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>emailjs.init('YOUR_PUBLIC_KEY');</script>

// Reservation form submission
document.getElementById('reservation-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    party: document.getElementById('party').value,
  };

  try {
    await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', data);
    showSuccess('Reservation confirmed! Check your email.');
  } catch (err) {
    showError('Something went wrong. Please call us.');
  }
});`,
      },
      {
        id: "web-rest-6",
        title: "Google Maps embed",
        desc: "Embed a Google Maps iframe for restaurant location.",
        hints: [
          "Go to maps.google.com, search your location, click Share → Embed a map → Copy HTML.",
          "Set width='100%' and height='300' on the iframe for responsive embedding.",
          "Style the iframe container with border-radius and overflow: hidden for clean edges.",
        ],
        starterCode: `<!-- Contact section with map -->
<section id="contact">
  <div class="contact-grid">
    <div class="contact-info">
      <h2>Find Us</h2>
      <p>📍 123 Main Street, City, Country</p>
      <p>📞 +1 (555) 123-4567</p>
      <p>📧 hello@lacucina.com</p>
      <p>🕐 Mon–Sun: 12pm–10pm</p>
    </div>
    <div class="map-container" style="border-radius: 12px; overflow: hidden;">
      <!-- Paste your Google Maps embed here -->
      <iframe
        src="https://www.google.com/maps/embed?pb=..."
        width="100%"
        height="300"
        style="border:0;"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
  </div>
</section>`,
      },
    ],
  },

  // ── Python Developer ──────────────────────────────────────────────────────
  {
    id: "py-scraper",
    title: "Web Scraper Tool",
    desc: "A Python CLI tool that scrapes product prices from e-commerce sites and sends email alerts when prices drop.",
    track: "Python Developer",
    difficulty: "Intermediate",
    techStack: ["Python", "BeautifulSoup", "Requests", "SQLite", "smtplib"],
    xpReward: 275,
    tasks: [
      {
        id: "py-sc-1",
        title: "Set up virtual environment",
        desc: "Create a venv, install requests, beautifulsoup4, and lxml.",
        hints: [
          "Run: python3 -m venv venv && source venv/bin/activate (or venv\\Scripts\\activate on Windows)",
          "Create requirements.txt: requests, beautifulsoup4, lxml, python-dotenv",
          "Add venv/ to your .gitignore so you don't commit it.",
        ],
        starterCode: `# Setup commands
python3 -m venv venv
source venv/bin/activate   # Mac/Linux
# venv\Scripts\activate    # Windows

pip install requests beautifulsoup4 lxml python-dotenv
pip freeze > requirements.txt

# Project structure:
price-scraper/
  scraper.py
  database.py
  alerts.py
  main.py
  .env
  requirements.txt`,
      },
      {
        id: "py-sc-2",
        title: "Fetch & parse HTML",
        desc: "Use requests.get() to fetch a page. Parse with BeautifulSoup to find price elements.",
        hints: [
          "Add headers to mimic a browser: headers = {'User-Agent': 'Mozilla/5.0 ...'}",
          "Find price element: soup.find('span', {'class': 'price'}).get_text(strip=True)",
          "Clean price string: price_str.replace('$','').replace(',','').strip()",
        ],
        starterCode: `import requests
from bs4 import BeautifulSoup
import re

def fetch_price(url: str) -> float | None:
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'lxml')

        # Adjust selector for your target site
        price_elem = soup.find('span', class_='a-price-whole')  # Amazon example
        if not price_elem:
            return None

        price_str = re.sub(r'[^\d.]', '', price_elem.get_text())
        return float(price_str)
    except Exception as e:
        print(f'Error fetching price: {e}')
        return None`,
      },
      {
        id: "py-sc-3",
        title: "Store prices in SQLite",
        desc: "Create a DB with product, price, timestamp columns. Insert scraped data each run.",
        hints: [
          "Use sqlite3 module (built-in): conn = sqlite3.connect('prices.db')",
          "Create table: CREATE TABLE IF NOT EXISTS prices (id, url, price, timestamp)",
          "Use datetime.now().isoformat() for the timestamp.",
        ],
        starterCode: `import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('prices.db')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS prices (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            url       TEXT NOT NULL,
            name      TEXT,
            price     REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    return conn

def insert_price(conn, url: str, name: str, price: float):
    conn.execute(
        'INSERT INTO prices (url, name, price, timestamp) VALUES (?, ?, ?, ?)',
        (url, name, price, datetime.now().isoformat())
    )
    conn.commit()

def get_lowest_price(conn, url: str) -> float | None:
    row = conn.execute('SELECT MIN(price) FROM prices WHERE url = ?', (url,)).fetchone()
    return row[0] if row else None`,
      },
      {
        id: "py-sc-4",
        title: "CLI argument parsing",
        desc: "Use argparse to accept --url and --target-price flags.",
        hints: [
          "Use argparse.ArgumentParser() and add_argument() for each flag.",
          "Make --target-price optional with a default of None (alert on any price drop).",
          "Add --check-interval flag (default: 3600 seconds) for how often to run.",
        ],
        starterCode: `import argparse

def parse_args():
    parser = argparse.ArgumentParser(description='Product Price Scraper')
    parser.add_argument('--url', required=True, help='Product page URL to monitor')
    parser.add_argument('--target-price', type=float, default=None,
                        help='Send alert when price drops below this value')
    parser.add_argument('--email', required=True, help='Email to send alerts to')
    parser.add_argument('--interval', type=int, default=3600,
                        help='Check interval in seconds (default: 3600)')
    return parser.parse_args()

# Usage:
# python main.py --url https://... --target-price 49.99 --email you@example.com`,
      },
      {
        id: "py-sc-5",
        title: "Email alert system",
        desc: "Use smtplib/MIME to send an email when the current price drops below target.",
        hints: [
          "Use smtplib.SMTP_SSL('smtp.gmail.com', 465) for Gmail.",
          "Store credentials in .env and load with python-dotenv: load_dotenv(); os.getenv('EMAIL_PASS')",
          "Enable 'App Passwords' in your Google account (not your main password).",
        ],
        starterCode: `import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
load_dotenv()

def send_alert(to_email: str, product_name: str, price: float, url: str):
    sender = os.getenv('EMAIL_USER')
    password = os.getenv('EMAIL_PASS')  # Gmail App Password

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'💰 Price Drop: {product_name}'
    msg['From'] = sender
    msg['To'] = to_email

    html = f'''
    <h2>Price Drop Alert! 🎉</h2>
    <p><b>{product_name}</b> is now <b>{price:.2f}</b></p>
    <a href="{url}">View Product →</a>
    '''
    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, password)
        server.sendmail(sender, to_email, msg.as_string())
    print('Alert email sent!')
`,
      },
      {
        id: "py-sc-6",
        title: "Schedule with cron",
        desc: "Write a shell script to run the scraper every 6 hours via crontab.",
        hints: [
          "Edit crontab with: crontab -e",
          "Cron syntax for every 6 hours: 0 */6 * * * /path/to/run.sh",
          "Always use absolute paths in cron scripts (cron has a minimal PATH).",
        ],
        starterCode: `#!/bin/bash
# run.sh

cd /home/user/price-scraper
source venv/bin/activate

python main.py \
  --url "https://example.com/product" \
  --target-price 49.99 \
  --email "you@example.com" >> logs/scraper.log 2>&1

# Add to crontab (crontab -e):
# Run every 6 hours:
# 0 */6 * * * /home/user/price-scraper/run.sh

# Make executable:
# chmod +x run.sh`,
      },
    ],
  },
  {
    id: "py-dataviz",
    title: "Data Visualization Dashboard",
    desc: "An interactive Streamlit dashboard that visualizes a public dataset with filters, charts, and statistical summaries.",
    track: "Python Developer",
    difficulty: "Intermediate",
    techStack: ["Python", "Pandas", "Plotly", "Streamlit", "NumPy"],
    xpReward: 300,
    tasks: [
      {
        id: "py-dv-1",
        title: "Choose & load dataset",
        desc: "Pick a CSV from Kaggle or UCI. Load with pandas.read_csv() and explore with .info().",
        hints: [
          "Good beginner datasets: Titanic, Iris, Netflix Movies, or World Happiness Report.",
          "df.info() shows column types and null counts; df.describe() gives statistics.",
          "df.head(10) shows the first 10 rows so you can understand the structure.",
        ],
        starterCode: `import pandas as pd
import numpy as np

# Load dataset (example: Netflix dataset)
df = pd.read_csv('netflix_titles.csv')

# Explore structure
print(df.shape)       # (rows, columns)
print(df.info())      # column types and nulls
print(df.head())      # first 5 rows
print(df.describe())  # statistics for numeric columns
print(df.isnull().sum())  # null counts per column

# Save cleaned version
df.to_csv('data_cleaned.csv', index=False)`,
      },
      {
        id: "py-dv-2",
        title: "Data cleaning",
        desc: "Handle missing values, parse dates, rename columns. Document changes.",
        hints: [
          "Fill missing strings with 'Unknown': df['col'].fillna('Unknown', inplace=True)",
          "Parse dates: df['date'] = pd.to_datetime(df['date'], errors='coerce')",
          "Rename columns to snake_case: df.columns = df.columns.str.lower().str.replace(' ', '_')",
        ],
        starterCode: `# Data cleaning pipeline
def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    # 1. Rename columns to snake_case
    df.columns = df.columns.str.lower().str.replace(' ', '_').str.replace('-', '_')

    # 2. Drop rows missing critical fields
    df.dropna(subset=['title', 'type'], inplace=True)

    # 3. Fill optional missing values
    df['director'].fillna('Unknown', inplace=True)
    df['country'].fillna('Unknown', inplace=True)

    # 4. Parse date column
    df['date_added'] = pd.to_datetime(df['date_added'], errors='coerce')
    df['year_added'] = df['date_added'].dt.year

    # 5. Clean duration column
    df['duration'] = df['duration'].str.extract(r'(\d+)').astype(float)

    return df

df = clean_data(df)
print(f"Clean dataset: {df.shape[0]} rows, {df.isnull().sum().sum()} nulls remaining")`,
      },
      {
        id: "py-dv-3",
        title: "Build Streamlit layout",
        desc: "Create sidebar filters (dropdowns, sliders, date range). Render title and KPI metrics.",
        hints: [
          "Use st.sidebar.selectbox(), st.sidebar.slider(), st.sidebar.multiselect() for filters.",
          "Display KPIs with st.metric(): st.metric('Total Movies', len(filtered_df))",
          "Use st.columns(3) to show 3 KPI metrics side by side.",
        ],
        starterCode: `import streamlit as st
import pandas as pd

st.set_page_config(page_title='Netflix Dashboard', layout='wide')
st.title('🎬 Netflix Content Dashboard')

df = pd.read_csv('data_cleaned.csv')

# Sidebar filters
st.sidebar.header('Filters')
content_type = st.sidebar.selectbox('Content Type', ['All', 'Movie', 'TV Show'])
year_range = st.sidebar.slider('Year Added', 2008, 2021, (2015, 2021))

# Apply filters
filtered = df.copy()
if content_type != 'All':
    filtered = filtered[filtered['type'] == content_type]
filtered = filtered[filtered['year_added'].between(*year_range)]

# KPI metrics
col1, col2, col3 = st.columns(3)
col1.metric('Total Titles', len(filtered))
col2.metric('Movies', len(filtered[filtered['type']=='Movie']))
col3.metric('TV Shows', len(filtered[filtered['type']=='TV Show']))`,
      },
      {
        id: "py-dv-4",
        title: "Plotly charts",
        desc: "Add at least 3 chart types: bar, line, scatter. Wire sidebar filters to chart data.",
        hints: [
          "Use px.bar(), px.line(), px.scatter() from plotly.express for quick charts.",
          "Pass filtered_df to each chart so they react to sidebar changes automatically.",
          "Add color= parameter to add a dimension: px.bar(df, x='year', y='count', color='type')",
        ],
        starterCode: `import plotly.express as px

# Chart 1: Content added per year (line chart)
yearly = filtered.groupby(['year_added', 'type']).size().reset_index(name='count')
fig1 = px.line(yearly, x='year_added', y='count', color='type',
               title='Content Added Per Year', markers=True)
st.plotly_chart(fig1, use_container_width=True)

# Chart 2: Top countries (bar chart)
top_countries = filtered['country'].value_counts().head(10).reset_index()
fig2 = px.bar(top_countries, x='country', y='count',
              title='Top 10 Content-Producing Countries', color='count',
              color_continuous_scale='Viridis')
st.plotly_chart(fig2, use_container_width=True)

# Chart 3: Rating distribution (scatter/histogram)
fig3 = px.histogram(filtered, x='rating', color='type', barmode='group',
                    title='Content Rating Distribution')
st.plotly_chart(fig3, use_container_width=True)`,
      },
      {
        id: "py-dv-5",
        title: "Statistical summary table",
        desc: "Show a filtered DataFrame summary with mean, median, std using st.dataframe().",
        hints: [
          "Use df.describe() to get statistics, then transpose it: df.describe().T",
          "Style the table: st.dataframe(summary, use_container_width=True)",
          "Add a 'View raw data' expander with st.expander(): with st.expander('Raw Data'): st.dataframe(filtered)",
        ],
        starterCode: `# Statistical summary section
st.subheader('📊 Statistical Summary')

numeric_cols = filtered.select_dtypes(include='number')
if not numeric_cols.empty:
    summary = numeric_cols.describe().T.round(2)
    st.dataframe(summary, use_container_width=True)
else:
    st.info('No numeric columns to summarize.')

# Value counts for categorical columns
st.subheader('📋 Category Breakdown')
col_select = st.selectbox('Select column', ['type', 'rating', 'country'])
value_counts = filtered[col_select].value_counts().head(20)
st.bar_chart(value_counts)

# Raw data expander
with st.expander('🔍 View Raw Data'):
    st.dataframe(filtered.reset_index(drop=True), use_container_width=True)
    st.caption(f'Showing {len(filtered)} rows')`,
      },
      {
        id: "py-dv-6",
        title: "Deploy on Streamlit Cloud",
        desc: "Push to GitHub. Connect repo to share.streamlit.io for one-click deploy.",
        hints: [
          "Include requirements.txt with: streamlit, pandas, plotly, numpy",
          "At share.streamlit.io, click 'New app' → connect GitHub → select repo and main file.",
          "If your dataset is large, host it on Google Drive and use gdown to fetch it on startup.",
        ],
        starterCode: `# requirements.txt
streamlit>=1.30
pandas>=2.0
plotly>=5.0
numpy>=1.24

# Deploy steps:
git add . && git commit -m "Add Streamlit dashboard"
git push origin main

# At share.streamlit.io:
# 1. Sign in with GitHub
# 2. New app → select your repo
# 3. Main file path: app.py
# 4. Click Deploy!

# Tip: add a .streamlit/config.toml for theming:
# [theme]
# primaryColor = "#6366f1"
# backgroundColor = "#0f172a"`,
      },
    ],
  },

  // ── Java Developer ────────────────────────────────────────────────────────
  {
    id: "java-library",
    title: "Library Management System",
    desc: "A Java console app to manage books, members, issue/return records with file-based persistence.",
    track: "Java Developer",
    difficulty: "Beginner",
    techStack: ["Java", "OOP", "File I/O", "Collections"],
    xpReward: 200,
    tasks: [
      {
        id: "java-lib-1",
        title: "Design class hierarchy",
        desc: "Define Book, Member, IssuedRecord classes. Draw a UML diagram.",
        hints: [
          "Book: id, isbn, title, author, available (boolean), genre",
          "Member: id, name, email, phone, List<String> issuedBookIds",
          "IssuedRecord: id, bookId, memberId, issueDate, returnDate (nullable)",
        ],
        starterCode: `// Book.java
public class Book {
    private String id;
    private String isbn;
    private String title;
    private String author;
    private boolean available;
    private String genre;

    public Book(String id, String isbn, String title, String author, String genre) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.available = true;
    }

    // Getters and setters...
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public String getTitle() { return title; }
    public String getId() { return id; }
}`,
      },
      {
        id: "java-lib-2",
        title: "Book CRUD operations",
        desc: "Implement addBook(), removeBook(), searchBook() in BookManager class.",
        hints: [
          "Use a HashMap<String, Book> for O(1) lookups by book ID.",
          "searchBook() should support both title and author search (case-insensitive).",
          "Return Optional<Book> from findById() to avoid null pointer exceptions.",
        ],
        starterCode: `import java.util.*;

public class BookManager {
    private final Map<String, Book> books = new HashMap<>();

    public void addBook(Book book) {
        books.put(book.getId(), book);
        System.out.println("Book added: " + book.getTitle());
    }

    public boolean removeBook(String id) {
        if (books.remove(id) != null) {
            System.out.println("Book removed.");
            return true;
        }
        System.out.println("Book not found.");
        return false;
    }

    public List<Book> searchBook(String query) {
        String q = query.toLowerCase();
        return books.values().stream()
            .filter(b -> b.getTitle().toLowerCase().contains(q)
                      || b.getAuthor().toLowerCase().contains(q))
            .toList();
    }

    public Optional<Book> findById(String id) {
        return Optional.ofNullable(books.get(id));
    }
}`,
      },
      {
        id: "java-lib-3",
        title: "Member management",
        desc: "Add member registration and ID generation. Store in a HashMap.",
        hints: [
          "Generate IDs with: String id = 'MEM' + String.format('%04d', ++counter)",
          "Validate email format with a simple regex before adding.",
          "Keep a separate Set<String> of issued book IDs per member to prevent duplicates.",
        ],
        starterCode: `public class MemberManager {
    private final Map<String, Member> members = new HashMap<>();
    private int counter = 0;

    public Member register(String name, String email, String phone) {
        if (!email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        String id = String.format("MEM%04d", ++counter);
        Member member = new Member(id, name, email, phone);
        members.put(id, member);
        System.out.println("Member registered: " + name + " (" + id + ")");
        return member;
    }

    public Optional<Member> findById(String id) {
        return Optional.ofNullable(members.get(id));
    }

    public List<Member> getAllMembers() {
        return new ArrayList<>(members.values());
    }
}`,
      },
      {
        id: "java-lib-4",
        title: "Issue & return flow",
        desc: "Implement issueBook() and returnBook() with date tracking using LocalDate.",
        hints: [
          "Check book.isAvailable() before issuing. If false, print an error.",
          "Set returnDate to null on issue; set it to LocalDate.now() on return.",
          "Calculate overdue days: ChronoUnit.DAYS.between(issueDate, LocalDate.now())",
        ],
        starterCode: `import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

public class IssueManager {
    private final List<IssuedRecord> records = new ArrayList<>();
    private int counter = 0;

    public boolean issueBook(Book book, Member member) {
        if (!book.isAvailable()) {
            System.out.println("Book '" + book.getTitle() + "' is not available.");
            return false;
        }
        book.setAvailable(false);
        String id = String.format("ISS%04d", ++counter);
        records.add(new IssuedRecord(id, book.getId(), member.getId(), LocalDate.now(), null));
        System.out.println("Book issued to " + member.getName() + " until " + LocalDate.now().plusDays(14));
        return true;
    }

    public void returnBook(String bookId, Book book) {
        records.stream()
            .filter(r -> r.getBookId().equals(bookId) && r.getReturnDate() == null)
            .findFirst()
            .ifPresent(r -> {
                r.setReturnDate(LocalDate.now());
                book.setAvailable(true);
                long days = ChronoUnit.DAYS.between(r.getIssueDate(), LocalDate.now());
                if (days > 14) System.out.println("Overdue by " + (days - 14) + " days!");
                else System.out.println("Book returned. Thanks!");
            });
    }
}`,
      },
      {
        id: "java-lib-5",
        title: "File persistence",
        desc: "Serialize library data to JSON files using Gson or manual CSV write.",
        hints: [
          "Add Gson dependency: compile 'com.google.code.gson:gson:2.10.1' in build.gradle.",
          "Save: new FileWriter('books.json') + gson.toJson(bookList)",
          "Load: gson.fromJson(new FileReader('books.json'), new TypeToken<List<Book>>(){}.getType())",
        ],
        starterCode: `import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import java.io.*;
import java.util.*;

public class DataPersistence {
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public static <T> void saveToFile(List<T> data, String filename) {
        try (Writer writer = new FileWriter(filename)) {
            gson.toJson(data, writer);
            System.out.println("Saved " + data.size() + " records to " + filename);
        } catch (IOException e) {
            System.err.println("Failed to save: " + e.getMessage());
        }
    }

    public static <T> List<T> loadFromFile(String filename, Class<T> clazz) {
        File file = new File(filename);
        if (!file.exists()) return new ArrayList<>();
        try (Reader reader = new FileReader(filename)) {
            return gson.fromJson(reader, TypeToken.getParameterized(List.class, clazz).getType());
        } catch (IOException e) {
            System.err.println("Failed to load: " + e.getMessage());
            return new ArrayList<>();
        }
    }
}`,
      },
      {
        id: "java-lib-6",
        title: "Console menu UI",
        desc: "Build a text-based menu loop with Scanner for all operations.",
        hints: [
          "Use a while(true) loop with a switch statement for the menu.",
          "Clear the screen between menu displays with System.out.print('\u001b[H\u001b[2J').",
          "Always call scanner.nextLine() after nextInt() to consume the newline character.",
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        BookManager bookMgr = new BookManager();
        MemberManager memMgr = new MemberManager();
        IssueManager issMgr = new IssueManager();

        while (true) {
            System.out.println("\n===== Library System =====");
            System.out.println("1. Add Book");
            System.out.println("2. Search Book");
            System.out.println("3. Register Member");
            System.out.println("4. Issue Book");
            System.out.println("5. Return Book");
            System.out.println("0. Exit");
            System.out.print("Choice: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline

            switch (choice) {
                case 1 -> { /* add book */ }
                case 2 -> { /* search */ }
                case 0 -> { System.out.println("Goodbye!"); return; }
                default -> System.out.println("Invalid choice.");
            }
        }
    }
}`,
      },
    ],
  },
  {
    id: "java-chat",
    title: "Chat Application",
    desc: "A multi-client Java chat app using sockets — supports private messages, rooms, and a GUI with Swing.",
    track: "Java Developer",
    difficulty: "Advanced",
    techStack: ["Java", "Sockets", "Multithreading", "Swing"],
    xpReward: 450,
    tasks: [
      {
        id: "java-chat-1",
        title: "TCP server setup",
        desc: "Create a ServerSocket that accepts multiple clients using a thread per client.",
        hints: [
          "Use ServerSocket ss = new ServerSocket(8080) and loop: Socket client = ss.accept()",
          "Wrap each accepted socket in a new Thread so clients don't block each other.",
          "Keep a thread-safe list of all connected handlers: Collections.synchronizedList(new ArrayList<>())",
        ],
        starterCode: `import java.net.*;
import java.io.*;
import java.util.*;

public class ChatServer {
    private static final int PORT = 8080;
    static final List<ClientHandler> clients = Collections.synchronizedList(new ArrayList<>());

    public static void main(String[] args) throws IOException {
        System.out.println("Server started on port " + PORT);
        try (ServerSocket server = new ServerSocket(PORT)) {
            while (true) {
                Socket socket = server.accept();
                System.out.println("New connection: " + socket.getInetAddress());
                ClientHandler handler = new ClientHandler(socket);
                clients.add(handler);
                new Thread(handler).start();
            }
        }
    }

    public static void broadcast(String message, ClientHandler sender) {
        synchronized (clients) {
            for (ClientHandler client : clients) {
                if (client != sender) client.sendMessage(message);
            }
        }
    }
}`,
      },
      {
        id: "java-chat-2",
        title: "Client handler threads",
        desc: "Implement ClientHandler Runnable. Read messages and broadcast to all connected clients.",
        hints: [
          "Use BufferedReader to read lines from the socket's InputStream.",
          "Use PrintWriter(socket.getOutputStream(), true) for auto-flush writing.",
          "Remove the handler from the list and close the socket in a finally block.",
        ],
        starterCode: `public class ClientHandler implements Runnable {
    private final Socket socket;
    private PrintWriter out;
    String username;
    String room = "general";

    public ClientHandler(Socket socket) { this.socket = socket; }

    @Override
    public void run() {
        try (
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        ) {
            out = new PrintWriter(socket.getOutputStream(), true);
            out.println("Enter your username:");
            username = in.readLine();
            ChatServer.broadcast(username + " joined the chat!", this);

            String line;
            while ((line = in.readLine()) != null) {
                if (line.startsWith("/msg ")) handlePrivate(line);
                else if (line.startsWith("/join ")) handleJoin(line);
                else ChatServer.broadcast("[" + username + "]: " + line, this);
            }
        } catch (IOException e) {
            System.out.println(username + " disconnected.");
        } finally {
            ChatServer.clients.remove(this);
            ChatServer.broadcast(username + " left the chat.", this);
        }
    }

    public void sendMessage(String msg) { out.println(msg); }
}`,
      },
      {
        id: "java-chat-3",
        title: "Broadcast & private messaging",
        desc: "Parse /msg <user> prefix for private messages. Route accordingly in the server.",
        hints: [
          "Parse /msg format: String[] parts = line.split(' ', 3) → parts[1]=username, parts[2]=message",
          "Find the target client: clients.stream().filter(c -> c.username.equals(target)).findFirst()",
          "Show [Private from X] to recipient and [Private to X] to sender.",
        ],
        starterCode: `// In ClientHandler:
private void handlePrivate(String line) {
    // Format: /msg <username> <message>
    String[] parts = line.split(" ", 3);
    if (parts.length < 3) {
        sendMessage("Usage: /msg <username> <message>");
        return;
    }
    String target = parts[1];
    String msg = parts[2];

    ChatServer.clients.stream()
        .filter(c -> c.username.equalsIgnoreCase(target))
        .findFirst()
        .ifPresentOrElse(
            c -> {
                c.sendMessage("[Private from " + username + "]: " + msg);
                sendMessage("[Private to " + target + "]: " + msg);
            },
            () -> sendMessage("User '" + target + "' not found.")
        );
}

private void handleJoin(String line) {
    String[] parts = line.split(" ", 2);
    if (parts.length < 2) return;
    room = parts[1];
    sendMessage("Joined room: " + room);
    ChatServer.broadcast(username + " joined #" + room, this);
}`,
      },
      {
        id: "java-chat-4",
        title: "Chat rooms",
        desc: "Add /join <room> command. Server tracks rooms with a Map<String, List<ClientHandler>>.",
        hints: [
          "Use ConcurrentHashMap<String, List<ClientHandler>> rooms in the server.",
          "When broadcasting, only send to clients in the same room.",
          "Show available rooms with /rooms command.",
        ],
        starterCode: `// In ChatServer:
static final Map<String, List<ClientHandler>> rooms = new ConcurrentHashMap<>();

public static void broadcastToRoom(String message, String room, ClientHandler sender) {
    List<ClientHandler> roomClients = rooms.getOrDefault(room, Collections.emptyList());
    synchronized (roomClients) {
        for (ClientHandler client : roomClients) {
            if (client != sender) client.sendMessage(message);
        }
    }
}

public static void joinRoom(ClientHandler client, String roomName) {
    // Leave current room
    rooms.getOrDefault(client.room, new ArrayList<>()).remove(client);
    // Join new room
    rooms.computeIfAbsent(roomName, k -> Collections.synchronizedList(new ArrayList<>())).add(client);
    client.room = roomName;
}`,
      },
      {
        id: "java-chat-5",
        title: "Swing GUI client",
        desc: "Build a JFrame with a message area (JTextArea), input field, and send button.",
        hints: [
          "Use JScrollPane wrapping JTextArea for the message display area.",
          "Set messageArea.setEditable(false) so users can't type in the display.",
          "Use SwingUtilities.invokeLater() when updating the UI from the network thread.",
        ],
        starterCode: `import javax.swing.*;
import java.awt.*;

public class ChatClient extends JFrame {
    private final JTextArea messageArea = new JTextArea();
    private final JTextField inputField = new JTextField();
    private final JButton sendBtn = new JButton("Send");

    public ChatClient() {
        setTitle("Java Chat");
        setSize(500, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        messageArea.setEditable(false);
        messageArea.setFont(new Font("Monospaced", Font.PLAIN, 13));

        JScrollPane scroll = new JScrollPane(messageArea);
        JPanel bottom = new JPanel(new BorderLayout());
        bottom.add(inputField, BorderLayout.CENTER);
        bottom.add(sendBtn, BorderLayout.EAST);

        add(scroll, BorderLayout.CENTER);
        add(bottom, BorderLayout.SOUTH);

        sendBtn.addActionListener(e -> sendMessage());
        inputField.addActionListener(e -> sendMessage());

        setVisible(true);
    }

    private void sendMessage() {
        String text = inputField.getText().trim();
        if (!text.isEmpty()) {
            // TODO: send to server via socket
            inputField.setText("");
        }
    }

    public void appendMessage(String msg) {
        SwingUtilities.invokeLater(() -> messageArea.append(msg + "\n"));
    }
}`,
      },
      {
        id: "java-chat-6",
        title: "Username & connection protocol",
        desc: "On connect, prompt for a username. Announce join/leave to the room.",
        hints: [
          "On connect, server sends 'Enter your username:'. Client reads first response as username.",
          "Validate username: no spaces, min 3 chars, not already taken.",
          "Send a /users command that lists all connected users in the current room.",
        ],
        starterCode: `// Connection handshake in ClientHandler.run():
out.println("ENTER_USERNAME");
String proposed = in.readLine();

// Validate username
while (proposed == null || proposed.trim().length() < 3
       || proposed.contains(" ")
       || ChatServer.clients.stream().anyMatch(c -> c.username != null && c.username.equals(proposed))) {
    out.println("USERNAME_TAKEN_OR_INVALID");
    proposed = in.readLine();
}

username = proposed.trim();
out.println("WELCOME " + username);
ChatServer.joinRoom(this, "general");
ChatServer.broadcastToRoom("🟢 " + username + " joined #general", "general", this);`,
      },
      {
        id: "java-chat-7",
        title: "Test multi-client scenario",
        desc: "Open 3+ client windows. Verify rooms, private messages, and disconnection handling.",
        hints: [
          "Run the server, then open multiple terminal windows each running the client.",
          "Test: /join <room> in one client, verify other room clients don't see messages.",
          "Force-close a client window and verify the server broadcasts a leave message.",
        ],
        starterCode: `# Test checklist:
# 1. Start server: java ChatServer
# 2. Open 3 client terminals: java ChatClient (or run jar 3 times)
# 3. Test broadcast: Type in client1, verify client2 & client3 receive it
# 4. Test private: /msg client2_username Hello! (only client2 should see it)
# 5. Test rooms:
#    - client1: /join sports
#    - client2: /join sports
#    - client3 stays in general
#    - Type in client1 - only client2 should receive it
# 6. Test disconnect: Close client1 window
#    - client2 and client3 should see "client1 left the chat"

# Common issues:
# - ConcurrentModificationException: Use synchronized or ConcurrentHashMap
# - GUI freezing: Use SwingWorker for socket I/O
# - Port in use: Change PORT or kill the process on that port`,
      },
    ],
  },
];

export const TRACKS = [
  "All",
  "Full Stack",
  "Frontend",
  "App Development",
  "Web Development",
  "Python Developer",
  "Java Developer",
] as const;
export type TrackFilter = (typeof TRACKS)[number];
