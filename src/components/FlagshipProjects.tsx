import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Radio,
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

function getLiveBadgeLabel(liveUrl: string): string {
  if (liveUrl.includes('onrender.com')) return 'LIVE ON RENDER';
  if (liveUrl.includes('up.railway.app') || liveUrl.includes('railway.app')) return 'LIVE ON RAILWAY';
  if (liveUrl.includes('github.io')) return 'LIVE ON GITHUB PAGES';
  if (liveUrl.includes('vercel.app')) return 'LIVE ON VERCEL';
  if (liveUrl.includes('amazonaws.com')) return 'LIVE ON AWS EKS';
  return 'LIVE DEPLOY';
}

export const FlagshipProjects: React.FC<FlagshipProjectsProps> = ({
  projects,
  onSelectProject,
  goSync,
}) => {
  const [liveOnly, setLiveOnly] = useState(false);

  const allFeatured = projects.filter((p) => p.featured);
  const featured = liveOnly
    ? allFeatured.filter((p) => Boolean(p.liveUrl))
    : allFeatured;

  // Top 2 Crown Jewels get wide split spotlight cards; remaining flagships sit in a crisp 2-col Bento grid
  const heroTier = featured.slice(0, 2);
  const bentoTier = featured.slice(2);

  return (
    <section id="flagship" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header + Live Only Filter */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"
        >
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              02 // FLAGSHIP ARCHITECTURE
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Highlighted Builds &amp; Live Simulators
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
              My top engineering systems — featuring live Render, AWS EKS &amp; Vercel deployments
              plus interactive widgets you can test right here.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setLiveOnly(false)}
              className={`cursor-pointer rounded-xl border px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
                !liveOnly
                  ? 'border-accent bg-accent text-slate-950'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All Flagships ({allFeatured.length})
            </button>
            <button
              type="button"
              onClick={() => setLiveOnly(true)}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
                liveOnly
                  ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              Live Deployed ({allFeatured.filter((p) => p.liveUrl).length})
            </button>
          </div>
        </motion.div>

        {/* Tier 1: Crown Jewel Full-Width Editorial Spotlights */}
        <div className="space-y-6">
          {heroTier.map((project, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <SpotlightCard className="featured-ring p-5 sm:p-7">
                  <div className="grid items-stretch gap-6 lg:grid-cols-12">
                    <div
                      className={`flex flex-col justify-between lg:col-span-7 ${
                        reverse ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-lg border border-accent/40 bg-accent/15 px-2.5 py-1 font-mono text-[11px] font-bold text-accent">
                            0{idx + 1} · {project.category}
                          </span>
                          <span className="rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)]">
                            {project.repoName} · {project.pushedAt}
                          </span>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-400 transition-colors hover:bg-emerald-500/25"
                            >
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                              {getLiveBadgeLabel(project.liveUrl)}
                            </a>
                          )}
                        </div>

                        <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] sm:text-[1.75rem]">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-accent">
                          {project.tagline}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {project.description}
                        </p>

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

                      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="glow-accent inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-slate-950 transition-all hover:brightness-110"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Launch Live App
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                            project.liveUrl
                              ? 'border border-accent/45 bg-accent/10 text-accent hover:bg-accent/20'
                              : 'bg-accent text-slate-950 hover:brightness-110'
                          }`}
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
                          Source
                        </a>
                      </div>
                    </div>

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
                      <div className="min-h-[268px] flex-1">
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

        {/* Tier 2: Crisp 2-Column Highlighted Bento Grid */}
        {bentoTier.length > 0 && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {bentoTier.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (idx % 2) * 0.08 }}
                className={
                  bentoTier.length % 2 === 1 && idx === bentoTier.length - 1
                    ? 'lg:col-span-2'
                    : ''
                }
              >
                <SpotlightCard className="flex h-full flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg border border-accent/35 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                          0{idx + 3} · {project.category}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--text-muted)]">
                          {project.repoName}
                        </span>
                      </div>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 hover:bg-emerald-500/20"
                        >
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          {getLiveBadgeLabel(project.liveUrl)}
                        </a>
                      )}
                    </div>

                    <h3 className="mt-3.5 font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-accent">
                      {project.tagline}
                    </p>
                    <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {project.description}
                    </p>

                    {/* Interactive Widget */}
                    <div className="mt-4 min-h-[220px]">
                      {project.previewType && (
                        <ProjectPreview type={project.previewType} />
                      )}
                    </div>

                    {/* Compact Stack Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[var(--border-subtle)] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[var(--border-subtle)] pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-bold text-slate-950 transition-all hover:brightness-110"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      Dossier
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-strong)] px-3 py-2 font-mono text-xs text-[var(--text-primary)] transition-colors hover:border-accent hover:text-accent"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-2 font-mono text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live App
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
