export type ProjectCategory =
  | 'All'
  | 'AI & Agents'
  | 'Cloud & DevOps'
  | 'Systems & HLD'
  | 'Full-Stack';

export interface ProjectItem {
  id: string;
  repoName: string;
  title: string;
  tagline: string;
  description: string;
  category: Exclude<ProjectCategory, 'All'>;
  featured: boolean;
  inProgress?: boolean;
  previewType?: 'eks' | 'agent' | 'typeahead' | 'rag' | 'reserve' | 'library' | 'golang';
  year: string;
  pushedAt: string;
  primaryLanguage: string;
  languages: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  highlights: string[];
  architectureNote: string;
  metrics: { label: string; value: string }[];
}

export const PROFILE = {
  name: 'Shubh Shukla',
  firstName: 'Shubh',
  lastName: 'Shukla',
  handle: 'shubh-aarambh',
  roleHeadline: 'Full-Stack, AI Agents & Cloud-Native Systems Engineer',
  roles: [
    'AI Agent Architect',
    'Cloud & DevOps Engineer',
    'Distributed Systems Builder',
    'Full-Stack Developer',
  ],
  motto: ['Eager to learn.', 'Love to win.', 'Nothing to lose.'],
  bio: 'Computer Science undergrad at Scaler School of Technology in Bengaluru. I engineer end-to-end systems — from autonomous browser & RAG AI agents to distributed HLD engines, raw C++11 HTTP servers, and production AWS EKS Kubernetes infrastructure.',
  location: 'Bengaluru, India',
  timezone: 'Asia/Kolkata',
  education: 'Scaler School of Technology · B.Sc. CS (2024–2028)',
  email: 'shubhshukla1006@gmail.com',
  collegeEmail: 'shubh.24bcs10093@sst.scaler.com',
  githubUrl: 'https://github.com/shubh-aarambh',
  linkedinUrl: 'https://www.linkedin.com/in/shubh-shukla-94b03830a/',
  linkedinHandle: 'shubh-shukla-94b03830a',
  avatarUrl: 'https://avatars.githubusercontent.com/u/177705668?v=4',
  githubJoined: 'Aug 2024',
  stats: {
    publicRepos: 18,
    yearlyContributions: 82,
    commits: 64,
    pullRequests: 7,
    liveDeployments: 4,
    languagesCount: 10,
  },
};

// Real aggregated language distribution computed directly from shubh-aarambh repositories
export const LANGUAGE_BREAKDOWN = [
  { name: 'TypeScript', percent: 45.2, bytes: '466 KB', color: '#3178c6' },
  { name: 'JavaScript', percent: 24.4, bytes: '251 KB', color: '#f7df1e' },
  { name: 'Java', percent: 9.6, bytes: '99 KB', color: '#f89820' },
  { name: 'Python', percent: 7.0, bytes: '72 KB', color: '#3776ab' },
  { name: 'CSS / HTML', percent: 9.4, bytes: '97 KB', color: '#38bdf8' },
  { name: 'C++ & IaC', percent: 4.4, bytes: '45 KB', color: '#10b981' },
];

// Real last 26 weeks of GitHub contribution activity scanned via GitHub GraphQL API
export const GITHUB_HEATMAP_WEEKS: number[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0],
  [0, 5, 9, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 8, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 33, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [10, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'study-track',
    repoName: 'Study-Track',
    title: 'StudyTrack — Cloud-Native DevOps Capstone',
    tagline: 'Production AWS EKS SaaS with Terraform, Helm, CI/CD & Prometheus',
    description:
      'End-to-end cloud-native academic coursework & deadline management platform engineered with full Infrastructure-as-Code and Kubernetes observability. Features React frontend, FastAPI microservices, PostgreSQL persistence, Helm charts, AWS EKS ALB Ingress, and Prometheus monitoring.',
    category: 'Cloud & DevOps',
    featured: true,
    previewType: 'eks',
    year: '2026',
    pushedAt: 'Oct 2026',
    primaryLanguage: 'Python',
    languages: ['Python', 'JavaScript', 'HCL', 'Dockerfile', 'Shell', 'CSS'],
    techStack: [
      'AWS EKS',
      'Kubernetes',
      'Terraform',
      'Helm',
      'Docker',
      'FastAPI',
      'React',
      'PostgreSQL',
      'Prometheus',
      'GitHub Actions',
    ],
    githubUrl: 'https://github.com/shubh-aarambh/Study-Track',
    liveUrl:
      'http://a554166002e3d4c6bbb0bde1c641c9c1-147430934.ap-south-1.elb.amazonaws.com/',
    highlights: [
      'Provisioned AWS EKS cluster & VPC networking declaratively via Terraform HCL modules.',
      'Packaged FastAPI backend, React frontend, and PostgreSQL into multi-stage Docker images deployed with Helm charts.',
      'Configured live AWS ELB Ingress routing with interactive Swagger REST API docs (/docs) and Prometheus telemetry.',
      'Built automated CI/CD workflows, health checks, and operational KPIs for coursework tracking.',
    ],
    architectureNote:
      'AWS ELB Ingress → Kubernetes Service Mesh → React Pod + FastAPI Pod → PostgreSQL Persistent Volume + Prometheus Scraper.',
    metrics: [
      { label: 'IaC & K8s', value: 'Terraform + Helm' },
      { label: 'Region', value: 'ap-south-1' },
      { label: 'Stack', value: 'FastAPI · React · PG' },
    ],
  },
  {
    id: 'auto-hainji',
    repoName: 'Auto-HainJi',
    title: 'Auto-HainJi — Autonomous Browser Agent',
    tagline: 'Hybrid deterministic-AI Playwright agent with live telemetry & session replay',
    description:
      'Production-grade autonomous website automation agent capable of controlling real Chromium browsers via Playwright. Uses a decoupled Event Bus, composable Tool Registry, SQLite/Prisma session replay timeline, and a hybrid deterministic-first execution loop that invokes Groq (Llama), Gemini, or OpenAI only for intelligent recovery.',
    category: 'AI & Agents',
    featured: true,
    previewType: 'agent',
    year: '2026',
    pushedAt: 'Jun 2026',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'JavaScript', 'CSS'],
    techStack: [
      'Next.js 16',
      'TypeScript',
      'Playwright',
      'Groq Llama',
      'Gemini AI',
      'OpenAI',
      'Prisma',
      'SQLite',
      'WebSockets',
      'Zustand',
      'Framer Motion',
    ],
    githubUrl: 'https://github.com/shubh-aarambh/Auto-HainJi',
    highlights: [
      'Hybrid Deterministic-AI Planner cuts latency and LLM cost by executing known steps deterministically with LLM self-healing fallback.',
      'Event-Driven Bus streams real-time logs, screenshots, and step state transitions over WebSockets.',
      'Step-by-step /replay timeline persists full session records and snapshots in SQLite via Prisma.',
      'Composable Tool Registry modeled on modern Agent SDK architectures.',
    ],
    architectureNote:
      'Telemetry UI (Next.js + WS) ⇄ Event Bus ⇄ Hybrid Planner (Deterministic / Groq / Gemini) ⇄ Tool Registry ⇄ Playwright Engine + Prisma Replay DB.',
    metrics: [
      { label: 'Codebase', value: '100+ KB TS' },
      { label: 'LLMs', value: 'Groq · Gemini · GPT' },
      { label: 'Replay', value: 'Prisma + SQLite' },
    ],
  },
  {
    id: 'hld-typeahead',
    repoName: 'HLD',
    title: 'Search Typeahead & Distributed Telemetry',
    tagline: 'Sub-millisecond autocomplete engine with Consistent Hash Ring & batch writes',
    description:
      'Complete High-Level Design (HLD) implementation of a distributed, analytics-driven Search Typeahead system in TypeScript & Docker. Achieves sub-millisecond prefix reads through MD5 Consistent Hashing across shard nodes while decoupling heavy query-frequency write traffic via asynchronous batching and recency-aware ranking.',
    category: 'Systems & HLD',
    featured: true,
    previewType: 'typeahead',
    year: '2026',
    pushedAt: 'Jun 2026',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'JavaScript', 'CSS', 'HTML', 'Dockerfile'],
    techStack: [
      'TypeScript',
      'Node.js',
      'Express',
      'Consistent Hashing',
      'Trie Data Structures',
      'Docker Compose',
      'Telemetry UI',
    ],
    githubUrl: 'https://github.com/shubh-aarambh/HLD',
    highlights: [
      'Implemented MD5 Consistent Hash Ring to partition prefix lookups evenly across distributed shard nodes.',
      'Designed recency-aware exponential decay ranking so trending searches surface immediately without stale bias.',
      'Decoupled read/write paths using buffered batch writes to protect sub-millisecond p99 read latency.',
      'Containerized with Docker & bundled with a real-time analytics dashboard and dataset generator.',
    ],
    architectureNote:
      'GET /suggest → Consistent Hash Ring (MD5) → In-Memory Prefix Shard Nodes | Async Query Logger → Batch Aggregator → Recency Ranker.',
    metrics: [
      { label: 'Routing', value: 'MD5 Hash Ring' },
      { label: 'Read Path', value: 'Sub-ms Trie' },
      { label: 'Writes', value: 'Async Batched' },
    ],
  },
  {
    id: 'notebooklm-rag',
    repoName: 'GenAi-3AD',
    title: 'NotebookLM 2.0 — Full-Stack RAG Studio',
    tagline: 'Document intelligence platform with Qdrant Vector DB, Groq Llama-3.1 & web fallback',
    description:
      'Full-stack Retrieval-Augmented Generation (RAG) suite spanning both Next.js 16 (GenAi-3) and Express 5 (GenAi-3AD) architectures. Ingests unseen PDF & text documents, chunks and embeds them into Qdrant Vector DB via LangChain, streams ultra-fast grounded answers with Groq Llama-3.1-8B / OpenAI, and falls back to Tavily/DuckDuckGo live web search when context is absent.',
    category: 'AI & Agents',
    featured: true,
    previewType: 'rag',
    year: '2026',
    pushedAt: 'Jun 2026',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'JavaScript', 'CSS', 'HTML'],
    techStack: [
      'Next.js 16',
      'Express 5',
      'LangChain',
      'Qdrant Vector DB',
      'Groq Llama-3.1',
      'OpenAI Embeddings',
      'PDF.js',
      'Tavily Search',
      'Framer Motion',
    ],
    githubUrl: 'https://github.com/shubh-aarambh/GenAi-3AD',
    highlights: [
      'Full end-to-end RAG pipeline: PDF/TXT ingestion → recursive text chunking → dense vector embeddings → Qdrant similarity retrieval.',
      'Sub-second conversational inference powered by Groq llama-3.1-8b-instant with smart web-search fallback.',
      'Glassmorphic conversational UI built across Next.js 16 + Framer Motion (also archived in GenAi-3).',
      'Handles completely unseen multi-page PDF documents with grounded citations.',
    ],
    architectureNote:
      'PDF Upload → Chunk Splitter → Embedding Model → Qdrant Vector Store → Top-K Cosine Retrieval → Groq / OpenAI Synthesis (+ Web Fallback).',
    metrics: [
      { label: 'Vector DB', value: 'Qdrant' },
      { label: 'Inference', value: 'Llama-3.1-8B' },
      { label: 'Pipeline', value: 'LangChain RAG' },
    ],
  },
  {
    id: 'ai-agent-cli',
    repoName: 'ai-agent-cli-tool-main',
    title: 'AI Agent CLI Tool',
    tagline: 'Cursor/Windsurf-style autonomous terminal coding agent with tool-calling loop',
    description:
      'Conversational terminal coding agent built in Node.js + OpenAI SDK that reasons in an iterative START → THINK → TOOL → OBSERVE → OUTPUT loop. Autonomously creates folders, writes HTML/CSS/JS files to disk, and clones complex websites from natural-language prompts.',
    category: 'AI & Agents',
    featured: false,
    year: '2026',
    pushedAt: 'May 2026',
    primaryLanguage: 'JavaScript',
    languages: ['JavaScript', 'HTML'],
    techStack: ['Node.js', 'OpenAI SDK', 'Tool Calling', 'CLI', 'Axios'],
    githubUrl: 'https://github.com/shubh-aarambh/ai-agent-cli-tool-main',
    demoVideoUrl: 'https://youtu.be/r6nMpDXKROk',
    highlights: [
      'Multi-step ReAct-style execution loop (START → THINK → TOOL → OBSERVE → OUTPUT).',
      'Built-in filesystem tools (createFolder, writeFile) producing runnable websites on disk.',
      'Verified with full live terminal walkthrough video demo on YouTube.',
    ],
    architectureNote: 'Interactive CLI REPL ⇄ Reasoning Loop ⇄ OpenAI Function Calls ⇄ Local Filesystem Tools.',
    metrics: [
      { label: 'Pattern', value: 'ReAct Loop' },
      { label: 'Demo', value: 'YouTube Video' },
    ],
  },
  {
    id: 'cpp-http-server',
    repoName: 'cn-project-shubh',
    title: 'Multi-Threaded HTTP/1.1 Server in C++',
    tagline: 'Low-level POSIX socket web server with thread pool, keep-alive & security guards',
    description:
      'Built from scratch in C++11 without external web frameworks using raw POSIX sockets and pthreads. Supports persistent HTTP/1.1 keep-alive connections, configurable thread pool queuing, binary image streaming (PNG/JPEG), JSON POST uploads, path-traversal prevention, and Host header validation.',
    category: 'Systems & HLD',
    featured: false,
    year: '2025',
    pushedAt: 'Oct 2025',
    primaryLanguage: 'C++',
    languages: ['C++', 'HTML', 'Shell', 'Makefile'],
    techStack: ['C++11', 'POSIX Sockets', 'pthreads', 'HTTP/1.1', 'Makefile', 'Bash'],
    githubUrl: 'https://github.com/shubh-aarambh/cn-project-shubh',
    highlights: [
      'Custom concurrent thread pool with synchronized connection queue for high-throughput requests.',
      'Full HTTP/1.1 keep-alive connection management with configurable idle timeouts.',
      'Hardened against directory traversal attacks, oversized payloads, and spoofed Host headers.',
      'Includes automated Bash integration test suite (test_server.sh) & Makefile build pipeline.',
    ],
    architectureNote: 'Master Listener Socket → Bounded Task Queue → Worker Thread Pool → HTTP/1.1 Parser & Security Filter.',
    metrics: [
      { label: 'Language', value: 'C++11 Raw' },
      { label: 'Concurrency', value: 'Thread Pool' },
    ],
  },
  {
    id: 'reserve-space',
    repoName: 'room_allocation',
    title: 'Reserve-Space — Resource Booking Platform',
    tagline: 'Full-stack MERN college room, lab & equipment reservation suite',
    description:
      'Production full-stack web application enabling students and faculty to browse, schedule, and manage campus rooms, labs, and equipment. Features JWT authentication, role-based Admin Dashboard, auto-seeding, real-time toast feedback, and responsive dark mode.',
    category: 'Full-Stack',
    featured: true,
    previewType: 'reserve',
    year: '2025',
    pushedAt: 'Oct 2025',
    primaryLanguage: 'JavaScript',
    languages: ['JavaScript', 'CSS', 'HTML'],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'bcryptjs'],
    githubUrl: 'https://github.com/shubh-aarambh/room_allocation',
    liveUrl: 'https://reserve-space.vercel.app/',
    highlights: [
      'Complete MERN architecture with decoupled shubh_Frontend and shubh_Backend services.',
      'Secure JWT + bcryptjs auth flow separating standard users from resource administrators.',
      'Deployed live on Vercel with intuitive slot scheduling and conflict-free reservations.',
      'Built-in Admin Dashboard for managing rooms, labs, equipment, and live user bookings.',
    ],
    architectureNote: 'React/Vite SPA (Vercel) ⇄ Express REST API + JWT Auth ⇄ MongoDB/Mongoose Cluster.',
    metrics: [
      { label: 'Codebase', value: '141 KB MERN' },
      { label: 'Auth', value: 'JWT + Admin' },
      { label: 'Status', value: 'Live on Vercel' },
    ],
  },
  {
    id: 'screentop',
    repoName: 'ScreenTop',
    title: 'ScreenTop — AI Movie Discovery Engine',
    tagline: 'Natural-language film recommendations powered by Gemini AI & OMDB',
    description:
      'Interactive movie discovery platform where users describe their exact mood in plain English (e.g., "Interstellar but funny"). Google Gemini AI interprets vibe, pacing, and themes, then hydrates rich film metadata and posters from the OMDB API inside a polished React + shadcn/ui experience.',
    category: 'AI & Agents',
    featured: false,
    year: '2025',
    pushedAt: 'Apr 2025',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'CSS', 'JavaScript', 'HTML'],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Gemini AI', 'OMDB API'],
    githubUrl: 'https://github.com/shubh-aarambh/ScreenTop',
    liveUrl: 'https://screen-top.vercel.app',
    highlights: [
      'Semantic vibe-matching via Google Gemini AI prompt engineering.',
      'Real-time movie enrichment with OMDB API ratings, synopsis, and cast metadata.',
      '188+ KB TypeScript + Radix/shadcn-ui component architecture deployed live on Vercel.',
    ],
    architectureNote: 'Prompt Input → Gemini AI Semantic Extractor → OMDB Metadata Hydrator → Responsive Card Grid.',
    metrics: [
      { label: 'Codebase', value: '193 KB TS' },
      { label: 'Status', value: 'Live on Vercel' },
    ],
  },
  {
    id: 'ridesharing',
    repoName: 'rideSharing',
    title: 'RideShare — Spring Boot Microservice API',
    tagline: 'Role-based passenger & driver ride lifecycle backend with MongoDB & JWT',
    description:
      'Clean layered Spring Boot 3.3 backend in Java 17 implementing a complete ride-hailing workflow. Supports JWT authentication, dual role enforcement (ROLE_USER & ROLE_DRIVER), ride request dispatch, driver acceptance, trip completion, Jakarta input validation, and global exception handling.',
    category: 'Systems & HLD',
    featured: false,
    year: '2025',
    pushedAt: 'Dec 2025',
    primaryLanguage: 'Java',
    languages: ['Java'],
    techStack: ['Java 17', 'Spring Boot 3.3', 'Spring Security', 'MongoDB', 'JWT', 'Jakarta Validation', 'Maven'],
    githubUrl: 'https://github.com/shubh-aarambh/rideSharing',
    highlights: [
      'Clean layered architecture: Controller → Service → Repository → DTO → Security Config.',
      'Stateless JWT security filter enforcing separate endpoints for Passengers and Drivers.',
      'Structured global exception handlers with Jakarta Bean Validation across request DTOs.',
    ],
    architectureNote: 'JWT Filter Chain → REST Controllers → Ride State Machine Service → MongoDB Repositories.',
    metrics: [
      { label: 'Runtime', value: 'Java 17 / SB 3.3' },
      { label: 'Auth', value: 'RBAC + JWT' },
    ],
  },
  {
    id: 'fintrack',
    repoName: 'fintrack',
    title: 'FinTrack — Personal Finance Analytics',
    tagline: 'Interactive expense, cashflow & visual budgeting web app in TypeScript',
    description:
      'Modern personal finance dashboard built with React, TypeScript, Vite, Tailwind CSS, and Recharts. Tracks income vs. expenses, renders interactive category charts, and delivers instant toast notifications and clean multi-route navigation.',
    category: 'Full-Stack',
    featured: false,
    year: '2025',
    pushedAt: 'Apr 2025',
    primaryLanguage: 'TypeScript',
    languages: ['TypeScript', 'JavaScript', 'CSS', 'HTML'],
    techStack: ['React', 'TypeScript', 'Vite', 'Recharts', 'Tailwind CSS', 'React Router'],
    githubUrl: 'https://github.com/shubh-aarambh/fintrack',
    highlights: [
      '124+ KB strongly-typed TypeScript application with modular financial views.',
      'Interactive Recharts visualizations for spending trends and budget allocation.',
      'Fast client-side state updates with instant UX feedback.',
    ],
    architectureNote: 'React Router Views → Typed Transaction Store → Recharts Analytics Engine.',
    metrics: [
      { label: 'Codebase', value: '135 KB TS' },
      { label: 'Charts', value: 'Recharts' },
    ],
  },
  {
    id: 'library-spring',
    repoName: 'db-bits-sga-2',
    title: 'Library Manager — Spring Boot & JPA',
    tagline: 'Relational Books & Authors CRUD platform with custom JPQL inner joins',
    description:
      'Full-stack Spring Boot web application built for relational database engineering. Implements one-to-many Author–Book JPA entities, custom JPQL inner-join views, cascading deletes, duplicate ISBN integrity handling, automated 10x10 database seeding, H2 inspector, and unit tests.',
    category: 'Full-Stack',
    featured: true,
    previewType: 'library',
    year: '2026',
    pushedAt: 'May 2026',
    primaryLanguage: 'Java',
    languages: ['Java', 'CSS'],
    techStack: ['Java 11', 'Spring Boot', 'Spring Data JPA', 'JPQL', 'H2 Database', 'JSP', 'JUnit'],
    githubUrl: 'https://github.com/shubh-aarambh/db-bits-sga-2',
    highlights: [
      'Custom JPQL Inner Join queries combining Author and Book tables cleanly.',
      'Global exception handling for DataIntegrityViolationException & ResourceNotFoundException.',
      'Auto-seeded relational schema (10 Authors × 10 Books) with integrated /h2-console inspector.',
      'Cascading relational deletes & pre-populated update forms backed by JUnit tests.',
    ],
    architectureNote: 'Spring MVC / JSP Views → Service Layer → Spring Data JPA & JPQL → H2 Relational Store.',
    metrics: [
      { label: 'Codebase', value: '82 KB Java' },
      { label: 'Queries', value: 'Custom JPQL' },
      { label: 'ORM', value: 'Spring JPA/H2' },
    ],
  },
  {
    id: 'go-upcoming',
    repoName: 'go-project (watching GitHub...)',
    title: 'Go Systems Project — Active Build',
    tagline: 'Currently in active development · Auto-highlights live once pushed to GitHub',
    description:
      'Upcoming high-concurrency backend & systems project being engineered in Go (Golang). This highlighted spotlight automatically monitors github.com/shubh-aarambh via the GitHub API and promotes the repository live with its real name, description, and source link the moment code is pushed.',
    category: 'Systems & HLD',
    featured: true,
    inProgress: true,
    previewType: 'golang',
    year: '2026',
    pushedAt: 'In Progress',
    primaryLanguage: 'Go',
    languages: ['Go'],
    techStack: ['Go (Golang)', 'Goroutines & Channels', 'Concurrency', 'REST / Systems', 'GitHub Auto-Sync'],
    githubUrl: 'https://github.com/shubh-aarambh?tab=repositories',
    highlights: [
      'Actively under construction in Go (Golang) — engineered for speed and concurrency.',
      'Portfolio auto-sync watches github.com/shubh-aarambh for any newly pushed Go repository.',
      'Automatically hydrates repo name, description, live URL, and push timestamp upon push.',
    ],
    architectureNote: 'Local Go Workspace → git push origin main → GitHub API Auto-Discovery → Live Portfolio Flagship.',
    metrics: [
      { label: 'Language', value: 'Go (Golang)' },
      { label: 'Sync', value: 'GitHub Live API' },
      { label: 'Status', value: 'Building Now' },
    ],
  },
  {
    id: 'emergency-flight',
    repoName: 'project2',
    title: 'Emergency Flight & Crisis Finder',
    tagline: 'Multi-API real-time flight tracker, nearby hospitals, hotels & live weather',
    description:
      'Rapid-response travel & emergency web utility integrating AviationStack, OpenWeatherMap, and Google Maps & Places APIs. Allows travelers in urgent situations to look up flights by IATA code, check live city weather, and pinpoint nearby hospitals and hotels on an interactive map.',
    category: 'Full-Stack',
    featured: false,
    year: '2025',
    pushedAt: 'Feb 2025',
    primaryLanguage: 'JavaScript',
    languages: ['JavaScript', 'CSS', 'HTML'],
    techStack: ['JavaScript ES6', 'AviationStack API', 'OpenWeatherMap API', 'Google Maps API', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/shubh-aarambh/project2',
    liveUrl: 'https://project2-three-alpha.vercel.app',
    highlights: [
      'Aggregates 3 live external REST APIs into a single crisis-ready lookup interface.',
      'Real-time IATA flight schedule status alongside localized weather telemetry.',
      'Deployed live on Vercel for instant browser access.',
    ],
    architectureNote: 'Vanilla ES6 Client → Parallel Fetch (AviationStack + OpenWeatherMap + Google Places).',
    metrics: [
      { label: 'APIs', value: '3 Live Feeds' },
      { label: 'Status', value: 'Live on Vercel' },
    ],
  },
  {
    id: 'devops-labs',
    repoName: 'devops',
    title: 'DevOps Engineering Labs (20 Modules)',
    tagline: 'Documented hands-on labs from Linux & Networking to Docker & Kubernetes',
    description:
      'Comprehensive 20-session DevOps engineering portfolio documenting real terminal workflows, Bash automation scripts, TCP/IP networking diagnostics, Docker multi-container networking & volumes, and Kubernetes core object manifests with verified outputs.',
    category: 'Cloud & DevOps',
    featured: false,
    year: '2026',
    pushedAt: 'Oct 2026',
    primaryLanguage: 'Shell',
    languages: ['Shell', 'Dockerfile', 'HCL', 'Python', 'JavaScript'],
    techStack: ['Linux', 'Bash Scripting', 'Networking', 'Docker', 'Kubernetes', 'Terraform', 'Git'],
    githubUrl: 'https://github.com/shubh-aarambh/devops',
    highlights: [
      '20 structured lab modules covering Linux internals, Shell automation, and Networking.',
      'Hands-on Dockerfiles, bridge networking, persistent volumes, and K8s deployments.',
      'Directly culminated in the live AWS EKS StudyTrack production capstone.',
    ],
    architectureNote: 'Linux → Shell Automation → Networking → Docker Containers → Kubernetes Orchestration.',
    metrics: [
      { label: 'Modules', value: '20 Labs' },
      { label: 'Focus', value: 'K8s & Docker' },
    ],
  },
  {
    id: 'resume-analyzer',
    repoName: 'Resume-Analyzer',
    title: 'Resume Analyzer & Skill Matcher',
    tagline: 'Drag-and-drop resume keyword scoring tool with actionable gap insights',
    description:
      'Sleek drag-and-drop web utility supporting PDF, DOC, and DOCX uploads that evaluates resumes against role-specific keyword profiles, renders animated match-score telemetry, and highlights missing skills for ATS optimization.',
    category: 'Full-Stack',
    featured: false,
    year: '2025',
    pushedAt: 'Jan 2025',
    primaryLanguage: 'JavaScript',
    languages: ['JavaScript', 'CSS', 'HTML'],
    techStack: ['HTML5', 'CSS3 Animations', 'JavaScript ES6', 'File API'],
    githubUrl: 'https://github.com/shubh-aarambh/Resume-Analyzer',
    highlights: [
      'Drag-and-drop multi-format upload zone with visual hover feedback.',
      'Animated match-score progress bar and missing-skill recommendation cards.',
    ],
    architectureNote: 'HTML5 Drag-and-Drop File API → Keyword Matcher → Animated Score Telemetry.',
    metrics: [
      { label: 'Formats', value: 'PDF · DOC · DOCX' },
      { label: 'Type', value: 'Zero-Dep UI' },
    ],
  },
];

export const SKILL_DOMAINS = [
  {
    id: 'ai',
    title: 'AI Agents & RAG',
    subtitle: 'Autonomous workflows & semantic retrieval',
    items: [
      'Playwright Agents',
      'LangChain',
      'Qdrant Vector DB',
      'Groq (Llama 3.1)',
      'Google Gemini AI',
      'OpenAI Tool Calling',
      'RAG Pipelines',
      'Tavily Search',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    subtitle: 'Declarative infra & container orchestration',
    items: [
      'AWS EKS & ELB',
      'Kubernetes',
      'Terraform (HCL)',
      'Helm Charts',
      'Docker & Compose',
      'Prometheus',
      'GitHub Actions',
      'Linux & Bash',
    ],
  },
  {
    id: 'systems',
    title: 'Systems & Backend',
    subtitle: 'Low-level networking, HLD & JVM APIs',
    items: [
      'C++11 / POSIX Sockets',
      'Consistent Hashing',
      'Java 17 & Spring Boot 3',
      'FastAPI (Python)',
      'Node.js & Express 5',
      'WebSockets',
      'PostgreSQL & MongoDB',
      'Prisma & JPA / JPQL',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    subtitle: 'High-craft interfaces & kinetic motion',
    items: [
      'React 19',
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS v4',
      'Framer Motion',
      'Zustand',
      'shadcn/ui & Radix',
      'Vite & Recharts',
    ],
  },
];

export const TIMELINE_MILESTONES = [
  {
    period: 'Oct – Nov 2026',
    era: 'Cloud-Native & Production DevOps',
    title: 'AWS EKS Capstone & 20-Lab Infrastructure Mastery',
    description:
      'Architected and deployed StudyTrack live on AWS EKS with Terraform, Helm charts, FastAPI, React, PostgreSQL, and Prometheus observability alongside 20 documented Linux/Docker/Kubernetes labs.',
    tags: ['AWS EKS', 'Terraform', 'Helm', 'Prometheus', 'FastAPI'],
  },
  {
    period: 'May – Jun 2026',
    era: 'Autonomous AI Agents & Distributed HLD',
    title: 'Playwright Agents, NotebookLM RAG & Consistent Hash Typeahead',
    description:
      'Built Auto-HainJi (hybrid deterministic-AI browser agent with replay telemetry), NotebookLM 2.0 (Qdrant + LangChain + Groq RAG), an autonomous ReAct CLI coding agent, and a distributed MD5 Consistent Hash Ring Search Typeahead engine.',
    tags: ['Playwright', 'LangChain', 'Qdrant', 'Next.js 16', 'HLD'],
  },
  {
    period: 'Oct – Dec 2025',
    era: 'Systems Programming & Scalable Backends',
    title: 'C++11 HTTP/1.1 Server, Spring Boot RideShare & Reserve-Space',
    description:
      'Wrote a multi-threaded HTTP/1.1 server from scratch in C++ using POSIX sockets, launched Reserve-Space (MERN campus booking platform live on Vercel), and built a JWT-secured Spring Boot 3.3 RideShare API.',
    tags: ['C++11', 'POSIX Sockets', 'Spring Boot', 'MongoDB', 'React'],
  },
  {
    period: 'Jan – Apr 2025',
    era: 'Full-Stack & Applied AI Foundations',
    title: 'ScreenTop AI, FinTrack, Emergency Flight Finder & Resume Analyzer',
    description:
      'Shipped multiple public Vercel apps combining Gemini AI + OMDB (ScreenTop), Recharts personal finance tracking (FinTrack), multi-API crisis flight discovery, and ATS resume keyword analysis.',
    tags: ['TypeScript', 'Gemini AI', 'React', 'Vercel', 'REST APIs'],
  },
];

export const MARQUEE_TECH = [
  'TypeScript',
  'React 19',
  'Next.js 16',
  'AWS EKS',
  'Kubernetes',
  'Terraform',
  'Docker',
  'Playwright',
  'LangChain',
  'Qdrant',
  'FastAPI',
  'Spring Boot',
  'C++11',
  'PostgreSQL',
  'MongoDB',
  'Prometheus',
  'Helm',
  'Groq Llama',
  'Gemini AI',
  'Node.js',
];

