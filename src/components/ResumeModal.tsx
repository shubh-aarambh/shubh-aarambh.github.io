import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Printer,
  X,
} from 'lucide-react';
import { PROFILE, ProjectItem, SKILL_DOMAINS } from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onNotify: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  open,
  onClose,
  projects,
  onNotify,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const highlighted = projects.filter((p) => p.featured && !p.inProgress);

  const handleCopySummary = async () => {
    const plain = [
      `${PROFILE.name} — ${PROFILE.roleHeadline}`,
      `${PROFILE.education} | ${PROFILE.location}`,
      `Email: ${PROFILE.email} | GitHub: ${PROFILE.githubUrl} | LinkedIn: ${PROFILE.linkedinUrl}`,
      '',
      'HIGHLIGHTED PROJECTS:',
      ...highlighted.map(
        (p) => `- ${p.title} (${p.techStack.slice(0, 5).join(', ')}): ${p.tagline}`
      ),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      onNotify('Copied ATS plaintext resume summary!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onNotify('Unable to access clipboard');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md print:static print:bg-white print:p-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="resume-sheet max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] shadow-2xl print:max-h-none print:rounded-none print:border-0 print:bg-white print:text-black print:shadow-none"
          >
            {/* Top Action Bar (hidden when printing) */}
            <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/95 px-6 py-4 backdrop-blur-xl print:hidden">
              <div className="font-mono text-xs font-semibold text-accent">
                INTERACTIVE RESUME · GENERATED FROM LIVE GITHUB PROFILE
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-strong)] px-3 py-1.5 font-mono text-xs text-[var(--text-primary)] hover:border-accent hover:text-accent"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
                <a
                  href="/Shubh_Shukla_Resume.pdf"
                  download="Shubh_Shukla_Resume.pdf"
                  onClick={() => onNotify('Downloading Shubh_Shukla_Resume.pdf')}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-accent px-3.5 py-1.5 font-mono text-xs font-bold text-slate-950 hover:brightness-110"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-strong)] px-3 py-1.5 font-mono text-xs text-[var(--text-primary)] hover:border-accent hover:text-accent"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-accent hover:text-[var(--text-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Resume Sheet Content */}
            <div className="space-y-6 p-6 sm:p-8 print:p-4">
              {/* Header */}
              <div className="border-b border-[var(--border-subtle)] pb-5 print:border-slate-300">
                <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] print:text-black">
                  {PROFILE.name}
                </h1>
                <p className="mt-1 text-sm font-medium text-accent print:text-slate-700">
                  {PROFILE.roleHeadline}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-[var(--text-secondary)] print:text-slate-700">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent print:text-black" />
                    {PROFILE.location}
                  </span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-accent"
                  >
                    <Mail className="h-3.5 w-3.5 text-accent print:text-black" />
                    {PROFILE.email}
                  </a>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-accent"
                  >
                    <Github className="h-3.5 w-3.5 text-accent print:text-black" />
                    github.com/{PROFILE.handle}
                  </a>
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-accent"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-accent print:text-black" />
                    linkedin.com/in/{PROFILE.linkedinHandle}
                  </a>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-accent print:text-black">
                  Education
                </h2>
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[var(--text-primary)] print:text-black">
                      Scaler School of Technology · B.Sc. Computer Science
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] print:text-slate-600">
                      Coursework: Distributed Systems (HLD/LLD), Computer Networks, DevOps &amp; Cloud, Databases (JPA/SQL/NoSQL), GenAI &amp; RAG
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[var(--text-muted)] print:text-slate-600">
                    2024 – 2028 · Bengaluru
                  </span>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-accent print:text-black">
                  Technical Skills
                </h2>
                <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                  {SKILL_DOMAINS.map((d) => (
                    <div
                      key={d.id}
                      className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] p-3 text-xs print:border-slate-300"
                    >
                      <span className="font-bold text-[var(--text-primary)] print:text-black">
                        {d.title}:{' '}
                      </span>
                      <span className="text-[var(--text-secondary)] print:text-slate-700">
                        {d.items.join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagship Engineering Projects */}
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-accent print:text-black">
                  Selected Engineering Projects
                </h2>
                <div className="mt-3 space-y-4">
                  {highlighted.map((p) => (
                    <div
                      key={p.id}
                      className="border-l-2 border-accent/50 pl-4 print:border-slate-400"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="font-semibold text-[var(--text-primary)] print:text-black">
                          {p.title}{' '}
                          <span className="font-mono text-xs font-normal text-accent print:text-slate-600">
                            ({p.techStack.slice(0, 5).join(' · ')})
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[var(--text-muted)] print:text-slate-600">
                          {p.pushedAt}
                        </span>
                      </div>
                      <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs text-[var(--text-secondary)] print:text-slate-700">
                        {p.highlights.slice(0, 2).map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

