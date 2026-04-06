export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  videos: { label: string; url: string }[];
  notes: string;
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
        ],
        notes:
          "HTML provides structure (headings, paragraphs, links, images). CSS controls layout (Flexbox, Grid), colors, and typography. Always use semantic elements like <header>, <main>, <article>. Mobile-first design: write base styles for small screens, use media queries to scale up.",
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
        ],
        notes:
          "Key concepts: variables (let/const), arrow functions, destructuring, spread/rest, template literals, promises, async/await. DOM API: querySelector, addEventListener, classList. Fetch API for HTTP calls. Understand the event loop and closures.",
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
        ],
        notes:
          "Core: JSX, props, state, useEffect, useContext, custom hooks. Virtual DOM diffing makes React fast. Lift state up when sharing between siblings. Use React Router for navigation. Redux Toolkit or Zustand for complex global state.",
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
        ],
        notes:
          "TypeScript adds static typing to JS. Use interfaces for object shapes, type for unions/aliases, generics for reusable functions. In React: type props with interface, use useState<T>(), handle event types like React.ChangeEvent<HTMLInputElement>.",
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
        ],
        notes:
          "Tailwind utility classes replace custom CSS. Use flex, grid, gap, p-, m-, rounded, shadow, hover: variants. Component libraries like shadcn/ui, Radix UI provide accessible primitives. Dark mode with dark: prefix. Responsive with sm:, md:, lg: breakpoints.",
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
          "Python is dynamically typed. Key: lists, tuples, dicts, sets, f-strings, list/dict comprehensions. Functions with *args and **kwargs. File I/O with open(). Exception handling with try/except/finally. Use virtual environments (venv) for each project.",
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
        ],
        notes:
          "Define classes with __init__, use self. Inheritance with super(). Magic methods: __str__, __repr__, __len__, __eq__. Dataclasses reduce boilerplate. Properties with @property. Abstract classes using ABC module. Composition > inheritance.",
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
        ],
        notes:
          "Use pathlib for file paths, os for environment, subprocess for shell commands. re module for regex. BeautifulSoup + requests for web scraping. Schedule tasks with schedule library or cron. openpyxl/csv for spreadsheet automation.",
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
        ],
        notes:
          "Decorators wrap functions (@login_required). Generators use yield for lazy iteration — memory efficient. asyncio for non-blocking I/O. Type hints with typing module improve IDE support. Context managers with __enter__/__exit__ or @contextmanager.",
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
        ],
        notes:
          "Node.js runs JS on the server via V8. Express adds routing and middleware. Middleware chain: app.use(). Router for modular routes. Error handling middleware has 4 params (err, req, res, next). Use dotenv for environment variables. Nodemon for dev auto-reload.",
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
        ],
        notes:
          "SQL: tables, JOINs, indexes, transactions, normalization (1NF-3NF). Use Prisma or Sequelize as ORM. NoSQL MongoDB: documents, collections, aggregation pipeline. Choose SQL for relational data, NoSQL for flexible/scale-out. Always index columns used in WHERE clauses.",
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
        ],
        notes:
          "Hash passwords with bcrypt (never store plaintext). JWT: sign with secret, verify on each request, keep tokens short-lived. Refresh tokens in HttpOnly cookies. OAuth2 for social login. CORS: whitelist allowed origins. Rate limiting prevents brute-force. HTTPS everywhere.",
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
        ],
        notes:
          "REST: use nouns in URLs (/users/123), proper HTTP verbs (GET/POST/PUT/DELETE), status codes (200/201/400/404/500). Version APIs (/api/v1/). Document with Swagger/OpenAPI. GraphQL: single endpoint, queries/mutations/subscriptions, resolver functions, schema-first design.",
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
        ],
        notes:
          "Client-server model: browser (client) sends HTTP requests, server responds with JSON or HTML. Understand request lifecycle: DNS → TCP → HTTP headers → response. REST verbs, status codes, CORS. JSON as data interchange. Environment variables for secrets. Version control with Git.",
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
        ],
        notes:
          "MERN: MongoDB, Express, React, Node. PERN replaces MongoDB with PostgreSQL. Connect frontend to backend via Axios/fetch. Proxy in package.json during development. Use .env for API URLs. Structure: /client (React), /server (Express). Deploy together on Railway or Render.",
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
        ],
        notes:
          "Dockerize apps with Dockerfile + docker-compose for multi-service apps. Vercel/Netlify for static frontend. Railway/Render for Node backends. GitHub Actions for CI: run tests on every PR, deploy on merge to main. Environment secrets stored in platform dashboards, never in code.",
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
          "NumPy: ndarray for fast vectorized math, broadcasting, indexing, slicing. Pandas: DataFrame (table), Series (column). Operations: read_csv, head, describe, groupby, merge, fillna, dropna. Always explore data first with .info(), .describe(), .value_counts().",
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
        ],
        notes:
          "Matplotlib: plt.plot, plt.bar, plt.scatter, subplots, figure size. Seaborn: statistical plots (heatmap, pairplot, boxplot) with better defaults. Plotly: interactive charts for dashboards. Always label axes, add titles, use color intentionally. Save with plt.savefig().",
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
        ],
        notes:
          "Mean, median, mode, variance, standard deviation. Probability: conditional probability, Bayes theorem. Distributions: normal, binomial, Poisson. Hypothesis testing: null hypothesis, p-value, t-test, chi-square. Correlation vs causation. Linear regression: slope, intercept, R².",
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
        ],
        notes:
          "Supervised: labelled data (classification, regression). Unsupervised: find patterns (clustering, dimensionality reduction). Train/val/test split prevents data leakage. Overfitting: model memorizes training data — fix with regularization, more data, dropout. Underfitting: model too simple.",
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
        ],
        notes:
          "Pipeline: fit() on train data, transform()/predict() on test. Key models: LinearRegression, LogisticRegression, DecisionTreeClassifier, RandomForestClassifier, SVC, KMeans. Evaluation: accuracy, precision, recall, F1, confusion matrix, cross_val_score. Feature scaling: StandardScaler, MinMaxScaler.",
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
        ],
        notes:
          "Neural net: layers of neurons with activation functions (ReLU, Sigmoid, Softmax). Backpropagation updates weights via gradient descent. Frameworks: PyTorch (research-friendly, dynamic graph), TensorFlow/Keras (production-friendly). CNNs for images, RNNs/LSTMs for sequences, Transformers for NLP.",
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
        ],
        notes:
          "Navigation: ls, cd, pwd, mkdir, rm, cp, mv. Permissions: chmod 755, chown. Process: ps, kill, top, htop. Package managers: apt, yum. Bash scripts: shebang #!/bin/bash, variables, loops, if/else, functions, cron jobs for scheduling. SSH for remote access.",
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
        ],
        notes:
          "Docker: image (blueprint), container (running instance). Dockerfile: FROM, RUN, COPY, CMD. docker-compose for multi-container. Kubernetes: pods (smallest unit), deployments (desired state), services (networking), ingress (HTTP routing). kubectl commands. Helm charts for packaging.",
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
          "CI: auto-run tests on every push. CD: auto-deploy when tests pass. GitHub Actions: .github/workflows/*.yml files. Define jobs → steps → actions. Use secrets for API keys. Artifacts for build outputs. Matrix strategy to test across Node versions. Blue-green deployments for zero downtime.",
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
        ],
        notes:
          "Kotlin: val (immutable), var (mutable). Null safety: String? vs String, safe call ?., Elvis operator ?:. Data classes auto-generate equals/hashCode/toString/copy. Coroutines: launch, async/await, suspend functions — replaces callbacks. Extension functions add methods to existing classes.",
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
        ],
        notes:
          "Compose replaces XML layouts. @Composable functions describe UI. State with remember { mutableStateOf() }. Recomposition happens automatically when state changes. LazyColumn for lists. Navigation with NavHost. ViewModel + StateFlow for MVVM architecture. Material 3 components.",
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
        ],
        notes:
          "Swift: type-safe, compiled. Optionals (?) force-unwrap with ! (avoid — use if let or guard let). Structs are value types, classes are reference types — prefer structs. Protocols define contracts (like interfaces). Closures are first-class functions. error handling with do/try/catch.",
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
        ],
        notes:
          "SwiftUI: declarative, like React for iOS. @State for local state, @ObservableObject + @Published for shared state. NavigationStack for push navigation. List for scrollable data. AsyncImage for remote images. Combine framework for reactive streams. Preview with #Preview macro.",
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
        ],
        notes:
          "OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP (reliable, ordered) vs UDP (fast, no guarantee). IP addressing, subnetting, CIDR. DNS resolves domains to IPs. HTTP(S) on port 80/443. Firewalls filter by IP/port/protocol. NAT for private networks.",
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
        ],
        notes:
          "OWASP Top 10: SQL injection, XSS, broken auth, security misconfig, insecure deserialization. Recon: passive (OSINT) vs active (nmap scans). Tools: Wireshark, Burp Suite, Metasploit. Always get written permission before testing. Responsible disclosure for bug bounties. CVE database for vulnerabilities.",
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
        ],
        notes:
          "Blockchain: immutable chain of blocks, each containing transactions + previous block hash. Consensus: Proof of Work (mining, energy-heavy), Proof of Stake (validators stake tokens). Public/private key cryptography for wallets. Ethereum enables programmable contracts. Gas fees pay for computation.",
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
          "Solidity: statically typed, compiled to EVM bytecode. contract keyword like class. Types: uint, address, mapping, struct, array. Functions: view (read-only), pure (no state), payable. Events for frontend listening. ERC-20 standard for tokens. Hardhat/Foundry for testing and deployment. OpenZeppelin for audited contracts.",
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
        ],
        notes:
          "IaaS (infrastructure): EC2, raw VMs. PaaS (platform): Heroku, App Engine, managed runtimes. SaaS (software): Gmail, Salesforce. Regions are geographic locations; availability zones are isolated data centers within a region. High availability: deploy across multiple AZs. Cost: pay-as-you-go vs reserved instances.",
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
        ],
        notes:
          "EC2: virtual machines. S3: object storage (static files, backups). Lambda: serverless functions, triggered by events. RDS: managed SQL databases (PostgreSQL, MySQL). IAM: users, roles, policies — principle of least privilege. VPC: isolated network with subnets, security groups, route tables. CloudWatch for monitoring.",
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
        ],
        notes:
          "LLMs predict next token using transformer architecture. System prompt sets behavior. Techniques: zero-shot (no examples), few-shot (2-5 examples), chain-of-thought (reason step by step). Temperature controls randomness (0 = deterministic, 1 = creative). Token limits: chunk long documents. Use structured output (JSON mode).",
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
        ],
        notes:
          "RAG: embed documents as vectors, store in vector DB (Pinecone, Weaviate, Chroma), at query time embed question and retrieve nearest docs, pass context to LLM. Embeddings: text → dense float array (e.g., 1536 dims for text-embedding-ada-002). Cosine similarity measures relevance. Chunk documents at 500-1000 tokens with overlap.",
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
        ],
        notes:
          "LangChain: compose LLM calls into chains. PromptTemplate, LLMChain, RetrievalQA. Memory: ConversationBufferMemory, ConversationSummaryMemory. Agents: give LLM tools (search, calculator, code exec), it decides what to call. LCEL: pipe operator | for composing. LangSmith for tracing and debugging.",
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
        ],
        notes:
          "Unity: GameObjects are entities, Components add behavior. MonoBehaviour: Start() runs once, Update() runs every frame. Rigidbody for physics. Collider for collision detection. Transform for position/rotation/scale. Input.GetAxis / Input.GetKeyDown. Scenes for levels. Prefabs for reusable objects.",
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
        ],
        notes:
          "Core loop: the repeated cycle players do (shoot → loot → upgrade). Player motivation: mastery, autonomy, relatedness (Self-Determination Theory). Flow state: challenge matches skill. Juice: screen shake, particles, sounds that make actions feel good. Level design: teach mechanics before testing them. Playtest early and often.",
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
        ],
        notes:
          "Visual hierarchy: size, weight, color direct attention. Color: use a 60-30-10 rule (dominant/secondary/accent). Typography: limit to 2 font families, 3-4 sizes. Spacing: 4px/8px grid system keeps layouts consistent. Contrast ratio: 4.5:1 for normal text (WCAG AA). White space is not wasted space — it creates focus.",
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
        ],
        notes:
          "Figma: web-based, real-time collaboration. Auto Layout: flex-like container that adapts to content. Components: reusable with variants (states like default/hover/active). Styles for consistent colors/typography/effects. Prototypes: link frames with interactions. Inspect panel for developers. Dev Mode exports CSS/tokens.",
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
        ],
        notes:
          "Qualitative: interviews, usability tests, diary studies. Quantitative: surveys, analytics, A/B tests. 5 users catch 85% of usability issues. User personas: fictional characters representing user groups. Customer journey map: touchpoints + emotions + pain points. Jobs-to-be-done framework: what job is the user hiring this product for?",
      },
    ],
  },
];
