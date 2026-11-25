import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  Compass,
  Copy,
  FileText,
  FolderGit2,
  Github,
  Linkedin,
  Moon,
  Palette,
  Search,
  Sun,
} from 'lucide-react';
import { PROFILE, ProjectItem } from '../data/portfolioData';
import { AccentTheme } from './Navbar';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  isDark: boolean;
  onToggleDark: () => void;
  onCycleAccent: () => void;
  accent: AccentTheme;
  onSelectProject: (project: ProjectItem) => void;
  onCopyEmail: () => void;
  onOpenResume: () => void;
  onOpenAssistant: () => void;
}

interface CommandItem {
  id: string;
  group: 'Navigation' | 'Projects' | 'Actions';
  label: string;
  hint: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  projects,
  isDark,
  onToggleDark,
  onCycleAccent,
  accent,
  onSelectProject,
  onCopyEmail,
  onOpenResume,
  onOpenAssistant,
}) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  const items: CommandItem[] = useMemo(() => {
    const nav: CommandItem[] = [
      {
        id: 'nav-about',
        group: 'Navigation',
        label: 'Jump to Engineering DNA & Stats',
        hint: '#about',
        icon: Compass,
        action: () => (window.location.hash = '#about'),
      },
      {
        id: 'nav-flagship',
        group: 'Navigation',
        label: 'Jump to Flagship Architecture Builds',
        hint: '#flagship',
        icon: Compass,
        action: () => (window.location.hash = '#flagship'),
      },
      {
        id: 'nav-vault',
        group: 'Navigation',
        label: 'Jump to Complete GitHub Vault',
        hint: '#vault',
        icon: Compass,
        action: () => (window.location.hash = '#vault'),
      },
      {
        id: 'nav-arch',
        group: 'Navigation',
        label: 'Jump to Live Architecture Sandbox',
        hint: '#architecture',
        icon: Compass,
        action: () => (window.location.hash = '#architecture'),
      },
      {
        id: 'nav-journey',
        group: 'Navigation',
        label: 'Jump to Engineering Timeline',
        hint: '#journey',
        icon: Compass,
        action: () => (window.location.hash = '#journey'),
      },
      {
        id: 'nav-contact',
        group: 'Navigation',
        label: 'Jump to Contact Hub',
        hint: '#contact',
        icon: Compass,
        action: () => (window.location.hash = '#contact'),
      },
    ];

    const proj: CommandItem[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      group: 'Projects',
      label: p.title,
      hint: `${p.repoName} · ${p.primaryLanguage}`,
      icon: FolderGit2,
      action: () => onSelectProject(p),
    }));

    const actions: CommandItem[] = [
      {
        id: 'act-ai',
        group: 'Actions',
        label: 'Ask Shubh AI Portfolio Copilot',
        hint: 'Assistant',
        icon: Bot,
        action: onOpenAssistant,
      },
      {
        id: 'act-resume',
        group: 'Actions',
        label: 'Open Interactive Resume / Save PDF',
        hint: 'Resume',
        icon: FileText,
        action: onOpenResume,
      },
      {
        id: 'act-linkedin',
        group: 'Actions',
        label: 'Open LinkedIn Profile (Shubh Shukla)',
        hint: 'LinkedIn',
        icon: Linkedin,
        action: () => window.open(PROFILE.linkedinUrl, '_blank', 'noreferrer'),
      },
      {
        id: 'act-email',
        group: 'Actions',
        label: `Copy Email (${PROFILE.email})`,
        hint: 'Clipboard',
        icon: Copy,
        action: onCopyEmail,
      },
      {
        id: 'act-theme',
        group: 'Actions',
        label: isDark ? 'Switch to Daylight Mode' : 'Switch to Obsidian Dark Mode',
        hint: 'Theme',
        icon: isDark ? Sun : Moon,
        action: onToggleDark,
      },
      {
        id: 'act-accent',
        group: 'Actions',
        label: `Cycle Accent Color (Current: ${accent})`,
        hint: 'Palette',
        icon: Palette,
        action: onCycleAccent,
      },
      {
        id: 'act-github',
        group: 'Actions',
        label: 'Open GitHub Profile (@shubh-aarambh)',
        hint: 'External',
        icon: Github,
        action: () => window.open(PROFILE.githubUrl, '_blank', 'noreferrer'),
      },
    ];

    return [...actions, ...proj, ...nav];
  }, [
    accent,
    isDark,
    onCopyEmail,
    onCycleAccent,
    onOpenAssistant,
    onOpenResume,
    onSelectProject,
    onToggleDark,
    projects,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 10);
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => (filtered.length ? (i + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) =>
          filtered.length ? (i - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[activeIdx]) {
        e.preventDefault();
        filtered[activeIdx].action();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, filtered, onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-20 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5">
              <Search className="h-4 w-4 text-accent" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, actions, or jump to section..."
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
              />
              <kbd className="rounded-md border border-[var(--border-subtle)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-[var(--text-muted)]">
                  No matching commands or repositories.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const active = idx === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active
                          ? 'bg-accent/15 text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] hover:bg-white/5'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            active ? 'text-accent' : 'text-[var(--text-muted)]'
                          }`}
                        />
                        <span className="truncate text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="ml-2 shrink-0 font-mono text-[10px] text-[var(--text-muted)]">
                        {item.hint}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-black/20 px-4 py-2 font-mono text-[10px] text-[var(--text-muted)]">
              <span>↑↓ Navigate · ↵ Select</span>
              <span className="text-accent">Shubh Portfolio OS</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
