import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  FileText,
  Linkedin,
  MessageSquareText,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { PROFILE, ProjectItem } from '../data/portfolioData';

interface PortfolioAssistantProps {
  open: boolean;
  onToggle: (next: boolean) => void;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenResume: () => void;
  onCopyEmail: () => void;
}

interface AssistantAction {
  label: string;
  onClick: () => void;
}

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  actions?: AssistantAction[];
}

const STARTER_PROMPTS = [
  'Why hire Shubh?',
  'Explain AWS EKS StudyTrack',
  'Show AI & RAG projects',
  'Tell me about Reserve-Space & Library Manager',
  'How do I connect on LinkedIn?',
];

export const PortfolioAssistant: React.FC<PortfolioAssistantProps> = ({
  open,
  onToggle,
  projects,
  onSelectProject,
  onOpenResume,
  onCopyEmail,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hey! I'm Shubh's interactive portfolio copilot. Ask me anything about his GitHub builds (AWS EKS, Playwright Agents, Reserve-Space, Library Manager, Go project), stack, or how to reach him.`,
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const findProject = (id: string) => projects.find((p) => p.id === id);

  const buildReply = (raw: string): Omit<ChatMessage, 'id' | 'role'> => {
    const q = raw.toLowerCase();

    if (q.includes('linkedin') || q.includes('contact') || q.includes('email') || q.includes('hire') && q.includes('reach')) {
      return {
        text: `You can connect with Shubh directly on LinkedIn (${PROFILE.linkedinHandle}), check his 18 repos on GitHub (@${PROFILE.handle}), or email him at ${PROFILE.email}. He is based in Bengaluru and open to SWE, AI, and DevOps roles!`,
        actions: [
          {
            label: 'Open LinkedIn',
            onClick: () => window.open(PROFILE.linkedinUrl, '_blank', 'noreferrer'),
          },
          { label: 'Copy Email', onClick: onCopyEmail },
          { label: 'View Resume PDF', onClick: onOpenResume },
        ],
      };
    }

    if (q.includes('resume') || q.includes('cv')) {
      return {
        text: `Shubh's interactive ATS-ready resume summarizes his Scaler School of Technology CS degree, flagship AWS EKS / AI Agent / Full-Stack systems, and core stack — ready to print or save as PDF.`,
        actions: [{ label: 'Open Printable Resume', onClick: onOpenResume }],
      };
    }

    if (q.includes('study') || q.includes('eks') || q.includes('devops') || q.includes('aws') || q.includes('kubernetes')) {
      const p = findProject('study-track');
      return {
        text: `StudyTrack is Shubh's flagship Cloud-Native DevOps Capstone deployed live on AWS EKS (ap-south-1). It combines Terraform IaC, Helm charts, Dockerized FastAPI + React + PostgreSQL, GitHub Actions CI/CD, and Prometheus telemetry.`,
        actions: [
          ...(p ? [{ label: 'Open StudyTrack Dossier', onClick: () => onSelectProject(p) }] : []),
          {
            label: 'View Live AWS App',
            onClick: () =>
              p?.liveUrl && window.open(p.liveUrl, '_blank', 'noreferrer'),
          },
        ],
      };
    }

    if (q.includes('reserve') || q.includes('room') || q.includes('library') || q.includes('spring') || q.includes('java')) {
      const reserve = findProject('reserve-space');
      const library = findProject('library-spring');
      return {
        text: `Both Reserve-Space (live MERN campus room/lab booking platform with JWT & Admin Dashboard on Vercel) and Library Manager (Spring Boot + JPA + custom JPQL inner-join queries + H2) are highlighted in the Flagship section with interactive widgets!`,
        actions: [
          ...(reserve ? [{ label: 'Inspect Reserve-Space', onClick: () => onSelectProject(reserve) }] : []),
          ...(library ? [{ label: 'Inspect Library Manager', onClick: () => onSelectProject(library) }] : []),
        ],
      };
    }

    if (q.includes('go') || q.includes('golang')) {
      const goProj = findProject('go-upcoming');
      return {
        text: goProj && !goProj.inProgress
          ? `Shubh's Go project (${goProj.repoName}) is live and synced straight from GitHub! Open its dossier to inspect the repo.`
          : `Shubh is actively building a Go (Golang) systems project right now! The portfolio auto-syncs with github.com/${PROFILE.handle} and will automatically highlight it live the moment he pushes the code.`,
        actions: goProj
          ? [{ label: 'Inspect Go Spotlight', onClick: () => onSelectProject(goProj) }]
          : [],
      };
    }

    if (q.includes('ai') || q.includes('rag') || q.includes('agent') || q.includes('playwright') || q.includes('notebook')) {
      const hainji = findProject('auto-hainji');
      const rag = findProject('notebooklm-rag');
      const cli = findProject('ai-agent-cli');
      return {
        text: `Shubh has built 4 real AI projects: Auto-HainJi (autonomous Playwright browser agent with Groq/Gemini hybrid recovery & SQLite replay), NotebookLM 2.0 (LangChain + Qdrant RAG + Tavily web fallback), AI Agent CLI Tool (ReAct terminal coding agent), and ScreenTop (Gemini + OMDB).`,
        actions: [
          ...(hainji ? [{ label: 'Inspect Auto-HainJi', onClick: () => onSelectProject(hainji) }] : []),
          ...(rag ? [{ label: 'Inspect NotebookLM 2.0', onClick: () => onSelectProject(rag) }] : []),
          ...(cli ? [{ label: 'Inspect AI CLI Agent', onClick: () => onSelectProject(cli) }] : []),
        ],
      };
    }

    if (q.includes('why') || q.includes('hire') || q.includes('strength') || q.includes('stack') || q.includes('skill')) {
      return {
        text: `Shubh bridges low-level CS fundamentals with modern shipping speed: he's written a raw C++11 HTTP/1.1 server from scratch, an MD5 Consistent Hash Ring HLD engine, Spring Boot APIs, autonomous Playwright & Qdrant RAG agents, and live AWS EKS Kubernetes infrastructure — all backed by TypeScript, Python, Java, C++, and Go.`,
        actions: [
          { label: 'View Printable Resume', onClick: onOpenResume },
          {
            label: 'Connect on LinkedIn',
            onClick: () => window.open(PROFILE.linkedinUrl, '_blank', 'noreferrer'),
          },
        ],
      };
    }

    // Fallback: match any project by keyword
    const matched = projects.find(
      (p) =>
        q.includes(p.repoName.toLowerCase()) ||
        q.includes(p.title.toLowerCase().split(' ')[0]) ||
        p.techStack.some((t) => q.includes(t.toLowerCase()))
    );

    if (matched) {
      return {
        text: `${matched.title}: ${matched.tagline}. Built with ${matched.techStack.slice(0, 5).join(', ')}.`,
        actions: [{ label: `Inspect ${matched.repoName}`, onClick: () => onSelectProject(matched) }],
      };
    }

    return {
      text: `Great question! Shubh is a CS undergrad at Scaler School of Technology (Bengaluru) specializing in Full-Stack Engineering, AI Agents/RAG, Distributed Systems, and Cloud-Native DevOps. Want to inspect his Resume, Flagship projects, or connect on LinkedIn?`,
      actions: [
        { label: 'View Resume', onClick: onOpenResume },
        {
          label: 'LinkedIn Profile',
          onClick: () => window.open(PROFILE.linkedinUrl, '_blank', 'noreferrer'),
        },
        { label: 'Copy Email', onClick: onCopyEmail },
      ],
    };
  };

  const sendPrompt = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = buildReply(trimmed);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: trimmed },
      { id: `a-${Date.now() + 1}`, role: 'assistant', ...reply },
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="mb-3 flex h-[470px] w-[340px] flex-col overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] shadow-2xl sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-black/25 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-accent/40 bg-accent/15 text-accent">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--text-primary)]">
                    Shubh AI Copilot
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  </div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)]">
                    Trained on @shubh-aarambh GitHub
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggle(false)}
                aria-label="Close AI Copilot"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-accent hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-accent font-semibold text-slate-950'
                        : 'border border-[var(--border-subtle)] bg-white/[0.04] text-[var(--text-primary)]'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.actions.map((act) => (
                        <button
                          key={act.label}
                          type="button"
                          onClick={act.onClick}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
                        >
                          {act.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Quick Starter Chips */}
            <div className="flex gap-1.5 overflow-x-auto border-t border-[var(--border-subtle)] bg-black/15 px-3 py-2">
              {STARTER_PROMPTS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendPrompt(q)}
                  className="shrink-0 cursor-pointer rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-[var(--text-secondary)] transition-colors hover:border-accent hover:text-accent"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendPrompt(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--border-subtle)] bg-black/25 px-3 py-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, Go, EKS, LinkedIn..."
                className="w-full bg-transparent text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent text-slate-950 transition-transform hover:scale-105"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dock Controls */}
      <div className="flex items-center justify-end gap-2">
        <a
          href={PROFILE.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          title="Connect on LinkedIn"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[#0A66C2] shadow-xl backdrop-blur-xl transition-transform hover:scale-105 hover:border-[#0A66C2]"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={onOpenResume}
          title="Interactive Resume / PDF"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-xl backdrop-blur-xl transition-transform hover:scale-105 hover:border-accent hover:text-accent"
        >
          <FileText className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onToggle(!open)}
          className="glow-accent inline-flex h-11 cursor-pointer items-center gap-2 rounded-2xl bg-accent px-4 font-mono text-xs font-bold text-slate-950 shadow-2xl transition-transform hover:scale-105"
        >
          {open ? (
            <>
              <X className="h-4 w-4" /> Close
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Ask Shubh AI</span>
              <MessageSquareText className="h-4 w-4 sm:hidden" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

