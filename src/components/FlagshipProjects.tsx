import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ProjectPreview } from './ProjectPreviews';
import { SpotlightCard } from './SpotlightCard';

interface FlagshipProjectsProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  goSync: {
    detected: boolean;
    syncing: boolean;
    lastChecked: string | null;
    onSync: () => void;
  };
}

export const FlagshipProjects: React.FC<FlagshipProjectsProps> = ({
  projects,
  onSelectProject,
  goSync,
}) => {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="flagship" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              02 // FLAGSHIP ARCHITECTURE
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Featured Systems &amp; Live Simulators
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            Interact directly with each live architecture widget — inspect EKS cluster nodes,
            test consistent hash typeahead sharding, or explore hybrid AI agent telemetry.
          </p>
        </motion.div>

        {/* Flagship Stacked Case Studies */}
        <div className="space-y-6">
          {featured.map((project, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55 }}
              >
                <SpotlightCard className="p-5 sm:p-7">
                  <div className="grid items-stretch gap-6 lg:grid-cols-12">
                    {/* Project Details */}
                    <div
                      className={`flex flex-col justify-between lg:col-span-7 ${
                        reverse ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-lg border border-accent/35 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-accent">
                            0{idx + 1} · {project.category}
                          </span>
                          <span className="rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)]">
                            {project.repoName} · {project.pushedAt}
                          </span>
                          {project.liveUrl && (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-semibold text-emerald-400">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                              {project.liveUrl.includes('vercel.app')
                                ? 'LIVE VERCEL'
                                : project.liveUrl.includes('amazonaws.com')
                                  ? 'LIVE AWS'
                                  : 'LIVE APP'}
                            </span>
                          )}
                          {project.inProgress && (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-amber-400/35 bg-amber-400/10 px-2 py-1 font-mono text-[10px] font-semibold text-amber-300">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                              IN PROGRESS · AUTO-SYNC
                            </span>
                          )}
                          {project.id === 'go-upcoming' && !project.inProgress && (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/40 bg-cyan-400/15 px-2 py-1 font-mono text-[10px] font-semibold text-cyan-300">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                              AUTO-SYNCED FROM GITHUB
                            </span>
                          )}
                        </div>

                        <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] sm:text-[1.65rem]">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-accent">
                          {project.tagline}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {project.description}
                        </p>

                        {/* Metrics Row */}
                        <div className="mt-5 grid grid-cols-3 gap-2.5">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.025] px-3 py-2"
                            >
                              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                {m.label}
                              </div>
                              <div className="mt-0.5 truncate font-mono text-xs font-semibold text-[var(--text-primary)]">
                                {m.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech Chips */}
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 8).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:brightness-110"
                        >
                          <Layers className="h-3.5 w-3.5" />
                          Architecture Dossier
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-strong)] px-3.5 py-2 font-mono text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-accent hover:text-accent"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Source Code
                        </a>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-2 font-mono text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live Endpoint
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Interactive Architecture Preview Widget */}
                    <div
                      className={`flex flex-col lg:col-span-5 ${
                        reverse ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        <span className="inline-flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-accent" />
                          Interactive Preview
                        </span>
                        <span>{project.primaryLanguage}</span>
                      </div>
                      <div className="flex-1 min-h-[260px]">
                        {project.previewType && (
                          <ProjectPreview
                            type={project.previewType}
                            goSync={
                              project.previewType === 'golang'
                                ? { ...goSync, repoName: project.repoName }
                                : undefined
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

