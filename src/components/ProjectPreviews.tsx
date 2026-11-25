import React, { useEffect, useState } from 'react';
import {
  Activity,
  BookOpen,
  Bot,
  Building2,
  Check,
  Cloud,
  Cpu,
  Database,
  FileText,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Search,
  Server,
  Sparkles,
} from 'lucide-react';

interface PreviewProps {
  type: 'eks' | 'agent' | 'typeahead' | 'rag' | 'reserve' | 'library' | 'golang';
  goSync?: {
    detected: boolean;
    syncing: boolean;
    lastChecked: string | null;
    onSync: () => void;
    repoName?: string;
  };
}

/* 1. StudyTrack — Interactive AWS EKS Topology & Telemetry */
const EksPreview: React.FC = () => {
  const [selectedPod, setSelectedPod] = useState<'ingress' | 'api' | 'db'>('api');

  const podInfo = {
    ingress: {
      title: 'AWS ELB Ingress (ap-south-1)',
      detail: 'Routing HTTP/HTTPS traffic → React SPA & FastAPI /docs',
      metric: '99.98% uptime · 24ms p95',
    },
    api: {
      title: 'FastAPI + React K8s Pods',
      detail: 'Deployed via Helm charts & GitHub Actions Docker builds',
      metric: '2/2 Ready · Prometheus scraped',
    },
    db: {
      title: 'PostgreSQL + Terraform VPC',
      detail: 'Persistent Volume Claim storing coursework KPIs & deadlines',
      metric: 'Healthy · 0 failed probes',
    },
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#060a14] p-4 font-mono text-xs text-slate-200">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          EKS CLUSTER · LIVE TOPOLOGY
        </span>
        <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
          click nodes
        </span>
      </div>

      {/* Interactive Cluster Nodes */}
      <div className="my-4 grid grid-cols-3 items-center gap-2">
        {[
          { id: 'ingress' as const, label: 'AWS ELB', sub: 'Ingress', icon: Cloud },
          { id: 'api' as const, label: 'EKS Pods', sub: 'FastAPI/UI', icon: Server },
          { id: 'db' as const, label: 'Postgres', sub: 'PVC + Prom', icon: Database },
        ].map((node) => {
          const active = selectedPod === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPod(node.id);
              }}
              className={`cursor-pointer rounded-xl border p-2.5 text-left transition-all ${
                active
                  ? 'border-accent bg-accent/15 shadow-lg shadow-cyan-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25'
              }`}
            >
              <node.icon
                className={`mb-1.5 h-4 w-4 ${active ? 'text-accent' : 'text-slate-400'}`}
              />
              <div className="font-semibold text-white">{node.label}</div>
              <div className="text-[10px] text-slate-400">{node.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Active Node Telemetry */}
      <div className="rounded-lg border border-white/10 bg-black/40 p-2.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-accent">{podInfo[selectedPod].title}</span>
          <Activity className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <p className="mt-1 text-[11px] text-slate-400">{podInfo[selectedPod].detail}</p>
        <div className="mt-1.5 text-[10px] text-emerald-400">
          ● {podInfo[selectedPod].metric}
        </div>
      </div>
    </div>
  );
};

/* 2. Auto-HainJi — Hybrid Deterministic-AI Playwright Telemetry */
const AGENT_STEPS = [
  { mode: 'DET', tool: 'browser.goto', status: 'OK · 140ms', log: 'Navigated → target workflow' },
  { mode: 'DET', tool: 'dom.click', status: 'MISS', log: 'Selector shifted — triggering fallback' },
  { mode: 'LLM', tool: 'groq.recover', status: 'HEALED', log: 'Llama-3.1 inferred semantic button' },
  { mode: 'BUS', tool: 'prisma.save', status: 'REPLAY', log: 'Persisted DOM + screenshot to SQLite' },
];

const AgentPreview: React.FC = () => {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setStep((s) => (s + 1) % AGENT_STEPS.length), 1800);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#060a14] p-4 font-mono text-xs text-slate-200">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
          <Bot className="h-3.5 w-3.5" />
          HYBRID EVENT BUS · WS STREAM
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setRunning((r) => !r);
          }}
          className="inline-flex cursor-pointer items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-200 hover:bg-accent/20 hover:text-accent"
        >
          {running ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
          {running ? 'Live' : 'Paused'}
        </button>
      </div>

      <div className="my-3 space-y-1.5">
        {AGENT_STEPS.map((item, idx) => {
          const isCurrent = idx === step;
          return (
            <div
              key={item.tool}
              className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 transition-all ${
                isCurrent
                  ? 'border-accent/60 bg-accent/15 text-white'
                  : 'border-white/5 bg-white/[0.02] text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                    item.mode === 'LLM'
                      ? 'bg-amber-400/20 text-amber-300'
                      : item.mode === 'BUS'
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : 'bg-cyan-400/20 text-cyan-300'
                  }`}
                >
                  {item.mode}
                </span>
                <span className="truncate text-[11px]">{item.tool}</span>
              </div>
              <span className="shrink-0 text-[10px] text-slate-300">{item.status}</span>
            </div>
          );
        })}
      </div>

      <div className="truncate rounded-lg bg-black/40 px-2.5 py-1.5 text-[11px] text-slate-300">
        <span className="text-accent">▸</span> {AGENT_STEPS[step].log}
      </div>
    </div>
  );
};

/* 3. HLD — Live Interactive Consistent Hash Ring & Typeahead Simulator */
const CORPUS = [
  'kubernetes ingress',
  'kubernetes helm chart',
  'react server components',
  'rag vector qdrant',
  'redis consistent hashing',
  'auto-hainji playwright',
  'aws eks terraform',
  'node typescript hld',
  'nextjs framer motion',
  'studytrack fastapi',
];

function computeShard(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 997;
  }
  return (hash % 4) + 1;
}

const TypeaheadPreview: React.FC = () => {
  const [query, setQuery] = useState('ku');
  const q = query.trim().toLowerCase();
  const shard = computeShard(q || 'a');
  const matches = CORPUS.filter((item) => item.includes(q)).slice(0, 3);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#060a14] p-4 font-mono text-xs text-slate-200"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
          <Cpu className="h-3.5 w-3.5" />
          TRY LIVE TYPEAHEAD SHARDING
        </span>
        <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
          Shard #{shard} · 0.4ms
        </span>
      </div>

      {/* Live Search Input */}
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-2.5 py-1.5 focus-within:border-accent">
        <Search className="h-3.5 w-3.5 text-accent" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type prefix: ku, re, aw, ra..."
          aria-label="Test consistent hashing typeahead"
          className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
        />
      </div>

      {/* Consistent Hash Ring Pills + Matches */}
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((node) => (
          <div
            key={node}
            className={`rounded-md border py-1 text-center text-[10px] transition-all ${
              shard === node
                ? 'border-accent bg-accent/20 font-bold text-accent'
                : 'border-white/10 bg-white/[0.02] text-slate-500'
            }`}
          >
            N0{node}
          </div>
        ))}
      </div>

      <div className="mt-2.5 space-y-1">
        {matches.length > 0 ? (
          matches.map((m, i) => (
            <div
              key={m}
              className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1 text-[11px]"
            >
              <span className="truncate text-slate-200">{m}</span>
              <span className="text-[10px] text-slate-500">score {(0.98 - i * 0.06).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <div className="rounded bg-white/[0.03] px-2 py-1.5 text-[11px] text-slate-400">
            Queued async batch write for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

/* 4. NotebookLM 2.0 — Interactive RAG Vector Retrieval Visualizer */
const RAG_SAMPLES = [
  {
    q: 'Summarize chunking strategy',
    chunks: [
      { id: 'vec#14', score: '0.94', text: 'RecursiveCharacterTextSplitter (1000 / 200 overlap)' },
      { id: 'vec#08', score: '0.89', text: 'Qdrant cosine similarity top-K retrieval' },
    ],
    source: 'Qdrant Vector Match → Groq Llama-3.1',
  },
  {
    q: 'Latest 2026 benchmarks?',
    chunks: [
      { id: 'web#01', score: 'FALLBACK', text: 'Low doc similarity → routed to Tavily Web Search' },
      { id: 'web#02', score: 'GROUNDED', text: 'Synthesized live citation response in 410ms' },
    ],
    source: 'Web Fallback Triggered → Tavily + Groq',
  },
];

const RagPreview: React.FC = () => {
  const [sampleIdx, setSampleIdx] = useState(0);
  const current = RAG_SAMPLES[sampleIdx];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#060a14] p-4 font-mono text-xs text-slate-200"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
          <FileText className="h-3.5 w-3.5" />
          RAG VECTOR PIPELINE · QDRANT
        </span>
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
      </div>

      {/* Toggle Sample Query */}
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {RAG_SAMPLES.map((s, idx) => (
          <button
            key={s.q}
            type="button"
            onClick={() => setSampleIdx(idx)}
            className={`cursor-pointer truncate rounded-lg border px-2 py-1.5 text-left text-[10px] transition-all ${
              sampleIdx === idx
                ? 'border-accent bg-accent/15 text-white'
                : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25'
            }`}
          >
            "{s.q}"
          </button>
        ))}
      </div>

      {/* Retrieved Vector Chunks */}
      <div className="my-2.5 space-y-1.5">
        {current.chunks.map((c) => (
          <div
            key={c.id}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5"
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-accent">{c.id}</span>
              <span className="text-emerald-400">{c.score}</span>
            </div>
            <div className="mt-0.5 truncate text-[11px] text-slate-300">{c.text}</div>
          </div>
        ))}
      </div>

      <div className="rounded-md bg-black/40 px-2.5 py-1 text-[10px] text-amber-300">
        ⚡ {current.source}
      </div>
    </div>
  );
};

/* 5. Reserve-Space — Interactive Campus Resource Slot Booker */
const ROOMS = [
  { id: 'hall', name: 'Seminar Hall A', cap: '120 seats' },
  { id: 'lab', name: 'AI Compute Lab', cap: '40 rigs' },
  { id: 'pod', name: 'Project Room 04', cap: '12 seats' },
];

const SLOTS = ['10:00 AM', '12:30 PM', '03:00 PM', '05:30 PM'];

const ReservePreview: React.FC = () => {
  const [roomIdx, setRoomIdx] = useState(0);
  const [booked, setBooked] = useState<Record<string, boolean>>({
    'hall-10:00 AM': true,
    'lab-12:30 PM': true,
  });

  const activeRoom = ROOMS[roomIdx];

  const toggleSlot = (slot: string) => {
    const key = `${activeRoom.id}-${slot}`;
    setBooked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#060a14] p-4 font-mono text-xs text-slate-200"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
          <Building2 className="h-3.5 w-3.5" />
          RESERVE-SPACE · LIVE BOOKER
        </span>
        <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
          JWT + MongoDB
        </span>
      </div>

      {/* Room Switcher */}
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {ROOMS.map((room, idx) => (
          <button
            key={room.id}
            type="button"
            onClick={() => setRoomIdx(idx)}
            className={`cursor-pointer rounded-lg border px-2 py-1.5 text-left transition-all ${
              roomIdx === idx
                ? 'border-accent bg-accent/15 text-white'
                : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25'
            }`}
          >
            <div className="truncate text-[10px] font-semibold">{room.name}</div>
            <div className="text-[9px] text-slate-400">{room.cap}</div>
          </button>
        ))}
      </div>

      {/* Interactive Slot Grid */}
      <div className="my-3 grid grid-cols-2 gap-1.5">
        {SLOTS.map((slot) => {
          const isReserved = !!booked[`${activeRoom.id}-${slot}`];
          return (
            <button
              key={slot}
              type="button"
              onClick={() => toggleSlot(slot)}
              className={`flex cursor-pointer items-center justify-between rounded-lg border px-2.5 py-2 text-[11px] transition-all ${
                isReserved
                  ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                  : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-accent/60 hover:text-white'
              }`}
            >
              <span>{slot}</span>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase">
                {isReserved ? (
                  <>
                    <Check className="h-3 w-3" /> Booked
                  </>
                ) : (
                  'Open'
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-md bg-black/40 px-2.5 py-1.5 text-[10px] text-slate-300">
        <span className="text-accent">●</span> Click any slot to reserve {activeRoom.name}
      </div>
    </div>
  );
};

/* 6. Library Manager — Interactive JPQL Inner Join & Spring JPA Inspector */
const LIBRARY_VIEWS = {
  join: {
    query: 'SELECT b.title, a.name, b.isbn FROM Book b INNER JOIN b.author a',
    rows: [
      { col1: 'Clean Code', col2: 'Robert C. Martin', meta: 'ISBN-978013' },
      { col1: 'Designing Data Apps', col2: 'Martin Kleppmann', meta: 'ISBN-978144' },
      { col1: 'Effective Java', col2: 'Joshua Bloch', meta: 'ISBN-978013' },
    ],
    footer: 'JPQL INNER JOIN · 10 seeded authors × 10 books · 0.8ms H2',
  },
  authors: {
    query: 'SELECT a FROM Author a LEFT JOIN FETCH a.books',
    rows: [
      { col1: 'Robert C. Martin', col2: 'CascadeType.ALL', meta: '1:N → 2 books' },
      { col1: 'Martin Kleppmann', col2: 'CascadeType.ALL', meta: '1:N → 1 book' },
      { col1: 'Joshua Bloch', col2: 'CascadeType.ALL', meta: '1:N → 2 books' },
    ],
    footer: 'Spring Data JPA @OneToMany · Global Exception Handler active',
  },
};

const LibraryPreview: React.FC = () => {
  const [view, setView] = useState<'join' | 'authors'>('join');
  const current = LIBRARY_VIEWS[view];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#060a14] p-4 font-mono text-xs text-slate-200"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
          <BookOpen className="h-3.5 w-3.5" />
          SPRING JPA · JPQL INSPECTOR
        </span>
        <div className="flex gap-1">
          {(['join', 'authors'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setView(tab)}
              className={`cursor-pointer rounded px-2 py-0.5 text-[10px] uppercase transition-colors ${
                view === tab
                  ? 'bg-accent text-slate-950 font-bold'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {tab === 'join' ? 'Inner Join' : 'Authors'}
            </button>
          ))}
        </div>
      </div>

      {/* JPQL Query Box */}
      <div className="mt-2.5 truncate rounded-lg border border-amber-400/25 bg-amber-400/10 px-2.5 py-1.5 text-[10px] text-amber-200">
        {current.query}
      </div>

      {/* Relational Rows */}
      <div className="my-2.5 space-y-1.5">
        {current.rows.map((r) => (
          <div
            key={r.col1}
            className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px]"
          >
            <div className="min-w-0 truncate">
              <span className="font-semibold text-white">{r.col1}</span>
              <span className="mx-1.5 text-slate-500">→</span>
              <span className="text-slate-300">{r.col2}</span>
            </div>
            <span className="shrink-0 text-[10px] text-accent">{r.meta}</span>
          </div>
        ))}
      </div>

      <div className="truncate rounded-md bg-black/40 px-2.5 py-1 text-[10px] text-emerald-400">
        ✓ {current.footer}
      </div>
    </div>
  );
};

/* 7. Go Project — Live GitHub Auto-Sync & Goroutine Pipeline Preview */
const GolangSyncPreview: React.FC<{ goSync?: PreviewProps['goSync'] }> = ({
  goSync,
}) => {
  const detected = !!goSync?.detected;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[#060a14] p-4 font-mono text-xs text-slate-200"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] ${
            detected ? 'text-emerald-400' : 'text-amber-300'
          }`}
        >
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          {detected ? 'GO REPO SYNCED LIVE' : 'GITHUB GO PUSH WATCHER'}
        </span>
        <button
          type="button"
          onClick={() => goSync?.onSync()}
          disabled={goSync?.syncing}
          className="inline-flex cursor-pointer items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-200 transition-colors hover:bg-accent/20 hover:text-accent disabled:opacity-50"
        >
          <RefreshCw
            className={`h-2.5 w-2.5 ${goSync?.syncing ? 'animate-spin' : ''}`}
          />
          {goSync?.syncing ? 'Checking...' : 'Sync Now'}
        </button>
      </div>

      {/* Go Code / Telemetry Block */}
      <div className="my-3 rounded-lg border border-white/10 bg-black/50 p-3 text-[11px] leading-relaxed">
        <div className="text-slate-400">// github.com/shubh-aarambh</div>
        <div>
          <span className="text-cyan-400">package</span>{' '}
          <span className="text-white">main</span>
        </div>
        <div className="mt-1">
          <span className="text-cyan-400">func</span>{' '}
          <span className="text-amber-300">watchPush</span>() {'{'}
        </div>
        <div className="pl-3 text-slate-300">
          status := <span className="text-emerald-400">&quot;{detected ? 'PUSHED_LIVE' : 'BUILDING_IN_GO'}&quot;</span>
        </div>
        <div className="pl-3 text-slate-300">
          repo := <span className="text-accent">&quot;{goSync?.repoName || 'awaiting git push'}&quot;</span>
        </div>
        <div>{'}'}</div>
      </div>

      <div className="flex items-center justify-between rounded-md bg-black/40 px-2.5 py-1.5 text-[10px]">
        <span className={detected ? 'text-emerald-400' : 'text-amber-300'}>
          {detected
            ? '✓ Auto-promoted to Flagship!'
            : '● Auto-highlights on first Go git push'}
        </span>
        {goSync?.lastChecked && (
          <span className="text-slate-500">@{goSync.lastChecked}</span>
        )}
      </div>
    </div>
  );
};

export const ProjectPreview: React.FC<PreviewProps> = ({ type, goSync }) => {
  switch (type) {
    case 'eks':
      return <EksPreview />;
    case 'agent':
      return <AgentPreview />;
    case 'typeahead':
      return <TypeaheadPreview />;
    case 'rag':
      return <RagPreview />;
    case 'reserve':
      return <ReservePreview />;
    case 'library':
      return <LibraryPreview />;
    case 'golang':
      return <GolangSyncPreview goSync={goSync} />;
  }
};

