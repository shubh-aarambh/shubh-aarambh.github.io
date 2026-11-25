import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  PlayCircle,
  X,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ProjectPreview } from './ProjectPreviews';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  goSync?: {
    detected: boolean;
    syncing: boolean;
    lastChecked: string | null;
    onSync: () => void;
  };
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  goSync,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-6 shadow-2xl sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-accent">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    github.com/shubh-aarambh/{project.repoName} · {project.pushedAt}
                  </span>
                </div>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-accent">
                  {project.tagline}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-accent hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Interactive Flagship Preview if available */}
            {project.previewType && (
              <div className="mt-6">
                <ProjectPreview
                  type={project.previewType}
                  goSync={
                    project.previewType === 'golang' && goSync
                      ? { ...goSync, repoName: project.repoName }
                      : undefined
                  }
                />
              </div>
            )}

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.description}
            </p>

            {/* Architecture Blueprint Box */}
            <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/[0.06] p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                <Cpu className="h-3.5 w-3.5" />
                System Architecture Flow
              </div>
              <p className="mt-2 font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                {project.architectureNote}
              </p>
            </div>

            {/* Engineering Highlights */}
            <div className="mt-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Key Engineering Highlights
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mt-6">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Technologies &amp; Languages
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-[var(--border-subtle)] bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-[var(--text-primary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-5">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-slate-950 transition-all hover:brightness-110"
              >
                <Github className="h-4 w-4" />
                Open GitHub Repository
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 font-mono text-xs font-semibold text-emerald-400 hover:bg-emerald-500/25"
                >
                  <ExternalLink className="h-4 w-4" />
                  Launch Live Deployment
                </a>
              )}

              {project.demoVideoUrl && (
                <a
                  href={project.demoVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5 font-mono text-xs font-semibold text-rose-400 hover:bg-rose-500/25"
                >
                  <PlayCircle className="h-4 w-4" />
                  Watch Video Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
