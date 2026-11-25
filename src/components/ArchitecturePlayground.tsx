import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Bot,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { soundEngine } from '../utils/soundEngine';

interface ArchNode {
  id: string;
  label: string;
  sub: string;
  latency: string;
  icon: React.ElementType;
  detail: string;
  tradeoff: string;
}

interface ArchBlueprint {
  id: string;
  name: string;
  repo: string;
  badge: string;
  summary: string;
  totalLatency: string;
  nodes: ArchNode[];
}

const BLUEPRINTS: ArchBlueprint[] = [
  {
    id: 'pulsematrix',
    name: 'PulseMatrix AI (Go 1.22)',
    repo: 'pulsematrix-ai',
    badge: 'GO 1.22 · SQLITE · GEMINI · RENDER',
    summary:
      'Trace how a GPay/PhonePe webhook or bank SMS flows through Go 1.22 Gorilla Mux, Gemini 1.5 AI parsing, statistical anomaly detection, and pure-Go SQLite (<25MB RAM).',
    totalLatency: '14ms Go / Live Render',
    nodes: [
      {
        id: 'ingest',
        label: 'Webhooks & SMS',
        sub: 'GPay · PhonePe · Stripe',
        latency: '+2ms',
        icon: Globe,
        detail: 'Receives live payment webhooks or pasted bank SMS notifications through authenticated endpoints.',
        tradeoff: 'Unified ingestion normalizes 7+ payment providers into a single canonical expense event.',
      },
      {
        id: 'go-mux',
        label: 'Go 1.22 + RBAC JWT',
        sub: 'Gorilla Mux + Bcrypt',
        latency: '+3ms',
        icon: Server,
        detail: 'Isolates User (/login) and Admin (/admin/login) portals with HTTP-Only JWT cookies and rate protection.',
        tradeoff: 'Compiled Go binary delivers high concurrency with <25MB Docker memory footprint.',
      },
      {
        id: 'gemini-fx',
        label: 'Gemini AI + Anomaly',
        sub: 'NLP + Heuristic + Live FX',
        latency: '+6ms',
        icon: Bot,
        detail: 'Extracts merchant & category via Gemini 1.5 Flash (regex fallback if offline), converts multi-currency FX, and flags +50% spend spikes.',
        tradeoff: 'Deterministic heuristic fallback guarantees 100% uptime even without external LLM keys.',
      },
      {
        id: 'sqlite',
        label: 'Pure-Go SQLite',
        sub: 'modernc.org/sqlite (CGO-Free)',
        latency: '+3ms',
        icon: Database,
        detail: 'Stores transactions, recurring subscriptions, and audit telemetry in an embedded zero-CGO SQLite database.',
        tradeoff: 'CGO-free SQLite produces static, ultra-portable Docker images deployable on Render in seconds.',
      },
    ],
  },
  {
    id: 'eks',
    name: 'StudyTrack Cloud-Native EKS',
    repo: 'Study-Track',
    badge: 'AWS EKS · TERRAFORM · HELM',
    summary:
      'Trace how a student API request travels through AWS ELB Ingress, Kubernetes Pods, PostgreSQL persistence, and Prometheus telemetry.',
    totalLatency: '24ms p95',
    nodes: [
      {
        id: 'elb',
        label: 'AWS ELB Ingress',
        sub: 'ap-south-1 Load Balancer',
        latency: '+4ms',
        icon: Cloud,
        detail: 'Terminates public traffic and routes `/` to React SPA and `/api` + `/docs` to FastAPI.',
        tradeoff: 'Managed AWS ALB eliminates manual Nginx proxy SPOFs across availability zones.',
      },
      {
        id: 'k8s',
        label: 'EKS FastAPI Pods',
        sub: 'Helm Deployment (2 replicas)',
        latency: '+9ms',
        icon: Server,
        detail: 'Stateless Python FastAPI workers packaged via multi-stage Dockerfiles & Helm charts.',
        tradeoff: 'Horizontal scaling decouples compute bursts from database storage.',
      },
      {
        id: 'pg',
        label: 'PostgreSQL PVC',
        sub: 'Relational Coursework Store',
        latency: '+8ms',
        icon: Database,
        detail: 'Persists coursework deadlines, completion percentages, and KPI queries safely across pod restarts.',
        tradeoff: 'Persistent Volume Claims guarantee durability independently of pod lifecycle.',
      },
      {
        id: 'prom',
        label: 'Prometheus Metrics',
        sub: 'Real-time Observability',
        latency: '+3ms',
        icon: Activity,
        detail: 'Continuously scrapes pod health, latency histograms, and container CPU/memory telemetry.',
        tradeoff: 'Pull-based scraping keeps instrumentation lightweight with zero request blocking.',
      },
    ],
  },
  {
    id: 'agent',
    name: 'Auto-HainJi Hybrid Agent',
    repo: 'Auto-HainJi',
    badge: 'PLAYWRIGHT · GROQ · PRISMA',
    summary:
      'Watch how the deterministic-first loop slashes LLM cost and falls back to Groq/Gemini only when a selector mutates.',
    totalLatency: '140ms det / 680ms heal',
    nodes: [
      {
        id: 'ui',
        label: 'Telemetry UI',
        sub: 'Next.js 16 + WebSockets',
        latency: '+2ms',
        icon: Globe,
        detail: 'Streams live step states, logs, and browser snapshots to a high-contrast operator console.',
        tradeoff: 'WebSockets avoid HTTP polling overhead during rapid multi-step browser automation.',
      },
      {
        id: 'planner',
        label: 'Hybrid Planner',
        sub: 'Deterministic → LLM Recovery',
        latency: '+18ms',
        icon: Bot,
        detail: 'Executes known selectors deterministically; triggers Groq Llama / Gemini only on DOM drift.',
        tradeoff: '90%+ faster & cheaper than running an LLM vision call on every click.',
      },
      {
        id: 'registry',
        label: 'Tool Registry',
        sub: 'Playwright Action Engine',
        latency: '+95ms',
        icon: Cpu,
        detail: 'Executes sandboxed browser primitives (`goto`, `click`, `extract`) via managed Chromium contexts.',
        tradeoff: 'Composable SDK-style tool interfaces make adding new browser actions trivial.',
      },
      {
        id: 'replay',
        label: 'SQLite Replay DB',
        sub: 'Prisma Session Timeline',
        latency: '+11ms',
        icon: ShieldCheck,
        detail: 'Persists step logs and screenshots so engineers can scrub `/replay` post-execution.',
        tradeoff: 'Embedded SQLite + Prisma provides zero-ops local durability for session debugging.',
      },
    ],
  },
  {
    id: 'hld',
    name: 'Distributed Search Typeahead',
    repo: 'HLD',
    badge: 'MD5 HASH RING · TRIE · DOCKER',
    summary:
      'Simulate sub-millisecond prefix reads partitioned via MD5 Consistent Hashing while writes flush asynchronously.',
    totalLatency: '0.4ms p99 read',
    nodes: [
      {
        id: 'edge',
        label: 'GET /suggest',
        sub: 'Prefix Query Gateway',
        latency: '+0.1ms',
        icon: Globe,
        detail: 'Accepts real-time keystroke prefixes and normalizes tokens before shard resolution.',
        tradeoff: 'Read path is strictly isolated from write aggregation to protect p99 latency.',
      },
      {
        id: 'ring',
        label: 'MD5 Hash Ring',
        sub: 'Consistent Shard Router',
        latency: '+0.1ms',
        icon: Layers,
        detail: 'Maps prefix partitions onto virtual ring nodes so adding/removing servers remaps minimal keys.',
        tradeoff: 'Prevents cache stampedes compared to naive `hash(key) % N` modulo sharding.',
      },
      {
        id: 'trie',
        label: 'In-Memory Trie',
        sub: 'Recency-Weighted Top-K',
        latency: '+0.2ms',
        icon: Cpu,
        detail: 'Returns pre-ranked suggestions weighted with exponential recency decay for trending queries.',
        tradeoff: 'Pre-computing Top-K at prefix nodes trades modest RAM for O(L) read speed.',
      },
      {
        id: 'batch',
        label: 'Async Batch Writer',
        sub: 'Decoupled Analytics Buffer',
        latency: 'Async',
        icon: Database,
        detail: 'Buffers search clickstreams in memory and flushes aggregated frequency deltas periodically.',
        tradeoff: 'Eliminates write-lock contention on the live serving Trie during traffic spikes.',
      },
    ],
  },
];

export const ArchitecturePlayground: React.FC = () => {
  const [bpIdx, setBpIdx] = useState(0);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [simulating, setSimulating] = useState(false);

  const blueprint = BLUEPRINTS[bpIdx];
  const activeNode = blueprint.nodes[activeNodeIdx];

  useEffect(() => {
    if (!simulating) return;
    let step = 0;
    setActiveNodeIdx(0);
    soundEngine.playHop(0);

    const id = window.setInterval(() => {
      step += 1;
      if (step >= blueprint.nodes.length) {
        window.clearInterval(id);
        setSimulating(false);
        soundEngine.playSuccess();
      } else {
        setActiveNodeIdx(step);
        soundEngine.playHop(step);
      }
    }, 850);

    return () => window.clearInterval(id);
  }, [blueprint.nodes.length, simulating]);

  const handleSelectBlueprint = (idx: number) => {
    setSimulating(false);
    setBpIdx(idx);
    setActiveNodeIdx(0);
    soundEngine.playClick();
  };

  return (
    <section id="architecture" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"
        >
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              04 // LIVE ARCHITECTURE SANDBOX
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Simulate Real Request Pipelines
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            Pick one of my production architectures and fire a live packet trace to inspect
            every hop, latency budget, and engineering trade-off.
          </p>
        </motion.div>

        {/* Architecture Switcher Pills */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {BLUEPRINTS.map((bp, idx) => (
              <button
                key={bp.id}
                type="button"
                onClick={() => handleSelectBlueprint(idx)}
                className={`cursor-pointer rounded-xl border px-4 py-2 font-mono text-xs font-semibold transition-all ${
                  bpIdx === idx
                    ? 'border-accent bg-accent text-slate-950 shadow-lg shadow-cyan-500/15'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                }`}
              >
                {bp.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSimulating(false);
                setTimeout(() => setSimulating(true), 20);
              }}
              className="glow-accent inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-4 py-2 font-mono text-xs font-bold text-slate-950 transition-transform hover:scale-[1.02]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {simulating ? 'Tracing Packet...' : 'Simulate Live Request'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSimulating(false);
                setActiveNodeIdx(0);
                soundEngine.playClick();
              }}
              aria-label="Reset simulation"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-accent hover:text-accent"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Sandbox Canvas Card */}
        <SpotlightCard className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="font-mono text-[11px] font-semibold text-accent">
                {blueprint.badge}
              </span>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {blueprint.summary}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-400">
              Budget: {blueprint.totalLatency}
            </div>
          </div>

          {/* 4-Hop Interactive Pipeline Flow */}
          <div className="relative my-7 grid gap-4 md:grid-cols-4">
            {/* Connecting Line (Desktop) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-10 right-10 top-1/2 hidden h-[2px] -translate-y-1/2 bg-[var(--border-subtle)] md:block"
            >
              <motion.div
                className="h-full bg-accent shadow-[0_0_12px_rgba(var(--accent-rgb),0.9)]"
                animate={{
                  width: `${(activeNodeIdx / (blueprint.nodes.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </div>

            {blueprint.nodes.map((node, idx) => {
              const Icon = node.icon;
              const isCurrent = idx === activeNodeIdx;
              const isPassed = idx < activeNodeIdx;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => {
                    setSimulating(false);
                    setActiveNodeIdx(idx);
                    soundEngine.playClick();
                  }}
                  className={`relative z-10 flex cursor-pointer flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isCurrent
                      ? 'scale-[1.02] border-accent bg-accent/15 shadow-xl shadow-cyan-500/15'
                      : isPassed
                        ? 'border-emerald-500/40 bg-emerald-500/[0.06]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)]/90 hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                        isCurrent
                          ? 'border-accent bg-accent text-slate-950'
                          : isPassed
                            ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                            : 'border-[var(--border-subtle)] bg-white/[0.03] text-accent'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-accent/25 text-accent'
                          : 'bg-white/[0.05] text-[var(--text-muted)]'
                      }`}
                    >
                      HOP 0{idx + 1} · {node.latency}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--text-primary)]">
                      {node.label}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-[var(--text-muted)]">
                      {node.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Node Deep-Dive Panel */}
          <div className="grid gap-4 rounded-2xl border border-[var(--border-subtle)] bg-black/25 p-4 sm:grid-cols-2 sm:p-5">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Active Component · {activeNode.label}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
                {activeNode.detail}
              </p>
            </div>
            <div className="border-t border-[var(--border-subtle)] pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Engineering Trade-Off &amp; Why
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeNode.tradeoff}
              </p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

