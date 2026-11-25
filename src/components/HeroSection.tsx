import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronRight,
  Cpu,
  FileText,
  GitBranch,
  Github,
  Globe,
  Layers,
  Linkedin,
  MapPin,
  Sparkles,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { MARQUEE_TECH, PROFILE, PROJECTS } from '../data/portfolioData';
import { NeuralCanvas } from './NeuralCanvas';
import { SpotlightCard } from './SpotlightCard';

interface HeroSectionProps {
  onOpenCommand: () => void;
  onOpenResume: () => void;
  onSelectProject: (id: string) => void;
}

interface TermLine {
  type: 'cmd' | 'out' | 'accent';
  text: string;
}

const INITIAL_LINES: TermLine[] = [
  { type: 'cmd', text: 'gh profile --scan shubh-aarambh' },
  { type: 'accent', text: '✓ Connected to github.com/shubh-aarambh (Bengaluru, IN)' },
  {
    type: 'out',
    text: '  20 public repos · 5 live deploys · Go 1.22 + TS + AWS EKS',
  },
  {
    type: 'out',
    text: '  Latest: PulseMatrix AI → pulsematrix-ai.onrender.com',
  },
  {
    type: 'out',
    text: '  Type "help", "projects", "stack", or "resume" below ↓',
  },
];

const LIVE_DEPLOY_BAR = [
  {
    name: 'PulseMatrix AI',
    platform: 'Go · Render',
    url: 'https://pulsematrix-ai.onrender.com',
  },
  {
    name: 'StudyTrack',
    platform: 'AWS EKS',
    url: 'http://a554166002e3d4c6bbb0bde1c641c9c1-147430934.ap-south-1.elb.amazonaws.com/',
  },
  {
    name: 'Reserve-Space',
    platform: 'MERN · Vercel',
    url: 'https://reserve-space.vercel.app/',
  },
  {
    name: 'ScreenTop AI',
    platform: 'Gemini · Vercel',
    url: 'https://screen-top.vercel.app',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCommand,
  onOpenResume,
  onSelectProject,
}) => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [termLines, setTermLines] = useState<TermLine[]>(INITIAL_LINES);
  const [input, setInput] = useState('');
  const termEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % PROFILE.roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [termLines]);

  const executeCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const next: TermLine[] = [...termLines, { type: 'cmd', text: raw.trim() }];

    if (cmd === 'help') {
      next.push(
        { type: 'accent', text: 'Available commands:' },
        { type: 'out', text: '  whoami     → Profile & engineering ethos' },
        { type: 'out', text: '  projects   → List top flagship builds' },
        { type: 'out', text: '  stack      → Core languages & cloud tools' },
        { type: 'out', text: '  neofetch   → System specs & GitHub telemetry' },
        { type: 'out', text: '  contact    → Direct email & GitHub' },
        { type: 'out', text: '  clear      → Reset terminal output' }
      );
    } else if (cmd === 'whoami') {
      next.push(
        { type: 'accent', text: `${PROFILE.name} (@${PROFILE.handle})` },
        { type: 'out', text: `  ${PROFILE.education}` },
        { type: 'out', text: `  Motto: ${PROFILE.motto.join(' ')}` }
      );
    } else if (cmd === 'projects') {
      next.push({ type: 'accent', text: 'Flagship Builds (click cards below to inspect):' });
      PROJECTS.filter((p) => p.featured).forEach((p, idx) => {
        next.push({
          type: 'out',
          text: `  0${idx + 1}. ${p.repoName.padEnd(14)} — ${p.category} (${p.primaryLanguage})`,
        });
      });
    } else if (cmd === 'stack') {
      next.push(
        { type: 'accent', text: 'Primary Stack:' },
        { type: 'out', text: '  Langs : TypeScript · JavaScript · Java · Python · C++11' },
        { type: 'out', text: '  AI    : Playwright Agents · LangChain · Qdrant · Groq · Gemini' },
        { type: 'out', text: '  Cloud : AWS EKS · Terraform · Kubernetes · Helm · Prometheus' }
      );
    } else if (cmd === 'neofetch') {
      next.push(
        { type: 'accent', text: '  shubh@bengaluru' },
        { type: 'out', text: '  OS      : Scaler School of Technology (CS 24-28)' },
        { type: 'out', text: '  REPOS   : 18 Public Repositories on GitHub' },
        { type: 'out', text: '  UPTIME  : Building since Aug 2024' },
        { type: 'out', text: '  SHELL   : zsh + Docker + kubectl + Playwright' }
      );
    } else if (cmd === 'contact') {
      next.push(
        { type: 'accent', text: `  Email    : ${PROFILE.email}` },
        { type: 'out', text: `  LinkedIn : ${PROFILE.linkedinUrl}` },
        { type: 'out', text: `  GitHub   : ${PROFILE.githubUrl}` }
      );
    } else if (cmd === 'linkedin') {
      next.push({ type: 'accent', text: `Opening LinkedIn (${PROFILE.linkedinHandle})...` });
      window.open(PROFILE.linkedinUrl, '_blank', 'noreferrer');
    } else if (cmd === 'resume' || cmd === 'cv') {
      next.push({ type: 'accent', text: 'Opening Interactive Printable Resume...' });
      onOpenResume();
    } else if (cmd === 'clear') {
      setTermLines([
        { type: 'accent', text: 'Terminal cleared. Type "help" for commands.' },
      ]);
      setInput('');
      return;
    } else if (cmd.startsWith('open ')) {
      const target = cmd.replace('open ', '').trim();
      const match = PROJECTS.find(
        (p) =>
          p.id.includes(target) ||
          p.repoName.toLowerCase().includes(target) ||
          p.title.toLowerCase().includes(target)
      );
      if (match) {
        next.push({ type: 'accent', text: `Opening dossier for ${match.title}...` });
        onSelectProject(match.id);
      } else {
        next.push({ type: 'out', text: `Project "${target}" not found. Try "open study-track".` });
      }
    } else {
      next.push({
        type: 'out',
        text: `zsh: command not found: ${cmd} (type "help")`,
      });
    }

    setTermLines(next.slice(-14));
    setInput('');
  };

  return (
    <section
      id="top"
      className="hero-spotlight-dome relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Interactive particle constellation background */}
      <NeuralCanvas />

      {/* Ambient radial lighting blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: 'rgba(var(--accent-rgb), 0.16)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-48 h-80 w-80 rounded-full blur-[130px]"
        style={{ background: 'rgba(var(--accent-secondary-rgb), 0.14)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Hero Column */}
          <div className="lg:col-span-7">
            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-3.5 py-1.5 backdrop-blur-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-xs font-medium tracking-wide text-[var(--text-primary)]">
                AVAILABLE FOR SWE · AI · DEVOPS
              </span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-secondary)]">
                <MapPin className="h-3 w-3 text-accent" />
                Bengaluru, IN
              </span>
            </motion.div>

            {/* Kinetic Display Name */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.5rem]"
            >
              <span className="block text-[var(--text-primary)]">SHUBH</span>
              <span className="text-gradient-hero block">SHUKLA</span>
            </motion.h1>

            {/* Animated Role Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-5 flex items-center gap-3"
            >
              <span className="inline-flex h-7 items-center rounded-lg border border-accent/40 bg-accent/10 px-2.5 font-mono text-xs font-semibold text-accent">
                ROLE //
              </span>
              <div className="relative h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="block font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--text-primary)] sm:text-2xl"
                  >
                    {PROFILE.roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Editorial Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
            >
              {PROFILE.bio}
            </motion.p>

            {/* Motto Strip from GitHub Bio */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]"
            >
              {PROFILE.motto.map((phrase, idx) => (
                <React.Fragment key={phrase}>
                  <span className="text-[var(--text-secondary)]">{phrase}</span>
                  {idx < PROFILE.motto.length - 1 && (
                    <span className="text-accent">◆</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#flagship"
                className="glow-accent group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-slate-950 transition-all hover:scale-[1.02] hover:brightness-110"
              >
                Explore Flagship Builds
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-xl transition-all hover:border-accent hover:bg-[var(--bg-card-hover)]"
              >
                <FileText className="h-4 w-4 text-accent" />
                Resume / PDF
              </button>

              <button
                type="button"
                onClick={onOpenCommand}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-xl transition-all hover:border-accent"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                Ctrl+K
              </button>

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#0A66C2]/40 bg-[#0A66C2]/10 px-4 py-3 font-mono text-xs font-semibold text-[#38a3ff] transition-all hover:border-[#0A66C2] hover:bg-[#0A66C2]/20"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] px-4 py-3 font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                <Github className="h-4 w-4" />@{PROFILE.handle}
              </a>
            </motion.div>

            {/* Live Deployed Apps Quick-Launch Strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                LIVE NOW:
              </span>
              {LIVE_DEPLOY_BAR.map((app) => (
                <a
                  key={app.name}
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-3 py-1 font-mono text-[11px] text-[var(--text-primary)] transition-all hover:border-emerald-400 hover:bg-emerald-500/15"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  <span className="font-semibold">{app.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    · {app.platform}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-emerald-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Hero Column: Profile Card + Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            {/* Compact GitHub Identity Header Card */}
            <SpotlightCard className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="animate-pulse-ring absolute -inset-1 rounded-2xl border border-accent/60" />
                  <img
                    src={PROFILE.avatarUrl}
                    alt="Shubh Shukla GitHub Avatar"
                    className="relative h-16 w-16 rounded-2xl border border-[var(--border-strong)] object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="truncate font-[family-name:var(--font-heading)] text-base font-bold text-[var(--text-primary)]">
                      {PROFILE.name}
                    </h2>
                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                      LIVE SCAN
                    </span>
                  </div>
                  <p className="truncate font-mono text-xs text-accent">
                    github.com/{PROFILE.handle}
                  </p>
                  <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">
                    Scaler School of Technology · B.Sc. CS
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Interactive Live Terminal */}
            <SpotlightCard className="overflow-hidden border-[var(--border-strong)]">
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-black/30 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)]">
                  <TerminalIcon className="h-3 w-3 text-accent" />
                  shubh@bengaluru:~
                </div>
                <div className="flex gap-1">
                  {['projects', 'stack', 'neofetch'].map((quick) => (
                    <button
                      key={quick}
                      type="button"
                      onClick={() => executeCommand(quick)}
                      className="cursor-pointer rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)] transition-colors hover:bg-accent/20 hover:text-accent"
                    >
                      {quick}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="h-64 overflow-y-auto bg-[#070a12]/90 p-4 font-mono text-xs leading-relaxed text-slate-300">
                {termLines.map((line, idx) => (
                  <div key={idx} className="mb-1.5 break-words">
                    {line.type === 'cmd' ? (
                      <div>
                        <span className="text-emerald-400">➜</span>{' '}
                        <span className="text-accent">~</span>{' '}
                        <span className="text-white">{line.text}</span>
                      </div>
                    ) : line.type === 'accent' ? (
                      <div className="text-accent">{line.text}</div>
                    ) : (
                      <div className="whitespace-pre-wrap text-slate-300/90">
                        {line.text}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={termEndRef} />
              </div>

              {/* Command Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeCommand(input);
                }}
                className="flex items-center gap-2 border-t border-[var(--border-subtle)] bg-[#06080f] px-4 py-2.5 font-mono text-xs"
              >
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Try "whoami", "projects", "open study-track"...'
                  aria-label="Interactive portfolio terminal input"
                  className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none"
                />
              </form>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* 4-Metric Telemetry Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 grid grid-cols-2 gap-3.5 sm:grid-cols-4"
        >
          {[
            {
              icon: GitBranch,
              value: `${PROFILE.stats.publicRepos}`,
              label: 'Public GitHub Repos',
              sub: 'Scanned live',
            },
            {
              icon: Cpu,
              value: `${PROFILE.stats.yearlyContributions}+`,
              label: 'Yearly Contributions',
              sub: `${PROFILE.stats.commits} commits · ${PROFILE.stats.pullRequests} PRs`,
            },
            {
              icon: Layers,
              value: `${PROFILE.stats.languagesCount}+`,
              label: 'Languages & IaC',
              sub: 'Go · TS · Py · Java · C++',
            },
            {
              icon: Globe,
              value: `${PROFILE.stats.liveDeployments}`,
              label: 'Live Deployments',
              sub: 'Render · AWS EKS · Vercel',
            },
          ].map((stat) => (
            <SpotlightCard key={stat.label} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[var(--text-primary)]">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-[var(--text-muted)]">
                    {stat.sub}
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.03] p-2 text-accent">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>

        {/* Kinetic Tech Stack Marquee */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] py-3 backdrop-blur-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />
          <div className="animate-marquee flex items-center gap-6">
            {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, idx) => (
              <div
                key={`${tech}-${idx}`}
                className="flex items-center gap-2 font-mono text-xs font-medium tracking-wider text-[var(--text-secondary)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

