import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Github,
  LayoutGrid,
  List,
  PlayCircle,
  Search,
} from 'lucide-react';
import {
  PROFILE,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

interface ProjectVaultProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  query: string;
  onQueryChange: (val: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'AI & Agents',
  'Cloud & DevOps',
  'Systems & HLD',
  'Full-Stack',
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  Java: '#f89820',
  'C++': '#f34b7d',
  Shell: '#89e051',
  Go: '#00ADD8',
};

export const ProjectVault: React.FC<ProjectVaultProps> = ({
  projects,
  onSelectProject,
  query,
  onQueryChange,
}) => {
  const [category, setCategory] = useState<ProjectCategory>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'live' | 'alpha'>('default');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      const catOk = category === 'All' || p.category === category;
      const searchOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.repoName.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)) ||
        p.primaryLanguage.toLowerCase().includes(q);
      return catOk && searchOk;
    });

    if (sortBy === 'live') {
      return [...list].sort(
        (a, b) => Number(Boolean(b.liveUrl)) - Number(Boolean(a.liveUrl))
      );
    }
    if (sortBy === 'alpha') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [category, projects, query, sortBy]);

  return (
    <section id="vault" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"
        >
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              03 // COMPLETE GITHUB VAULT
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              All Scanned Repositories ({projects.length})
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Filter by repo, stack, or language..."
              aria-label="Filter projects"
              className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] py-2.5 pl-10 pr-4 font-mono text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] backdrop-blur-xl outline-none transition-colors focus:border-accent"
            />
          </div>
        </motion.div>

        {/* Animated Category Pills + View & Sort Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`relative cursor-pointer rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-colors ${
                    active
                      ? 'text-slate-950'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="vault-category-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-accent"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat}
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                        active
                          ? 'bg-black/15 text-slate-950'
                          : 'bg-white/5 text-[var(--text-muted)]'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'live' | 'alpha')}
              aria-label="Sort repositories"
              className="cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2 font-mono text-xs text-[var(--text-secondary)] outline-none focus:border-accent"
            >
              <option value="default">Sort: Featured</option>
              <option value="live">Sort: Live Deploys First</option>
              <option value="alpha">Sort: A → Z</option>
            </select>

            <div className="flex rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Grid view"
                className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-accent text-slate-950'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                title="Engineering table view"
                className={`cursor-pointer rounded-lg p-1.5 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-accent text-slate-950'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards Grid OR Compact Engineering Table */}
        {viewMode === 'grid' ? (
          <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <SpotlightCard
                    tilt
                    onClick={() => onSelectProject(project)}
                    className="group flex h-full cursor-pointer flex-col justify-between p-5"
                  >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] text-accent">
                          <FolderGit2 className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-mono text-[11px] font-semibold text-accent">
                            {project.repoName}
                          </div>
                          <div className="font-mono text-[10px] text-[var(--text-muted)]">
                            {project.category} · {project.pushedAt}
                          </div>
                        </div>
                      </div>

                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>

                    {/* Title & Summary */}
                    <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {project.tagline}
                    </p>

                    {/* Stack Chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[var(--border-subtle)] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded-md bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-secondary)]">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            LANG_COLORS[project.primaryLanguage] || '#94a3b8',
                        }}
                      />
                      {project.primaryLanguage}
                    </span>

                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-semibold text-emerald-400 hover:bg-emerald-500/20"
                        >
                          <ExternalLink className="h-3 w-3" /> Live
                        </a>
                      )}
                      {project.demoVideoUrl && (
                        <a
                          href={project.demoVideoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-1 font-mono text-[10px] font-semibold text-rose-400 hover:bg-rose-500/20"
                        >
                          <PlayCircle className="h-3 w-3" /> Video
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="rounded-md border border-[var(--border-subtle)] p-1 text-[var(--text-secondary)] hover:border-accent hover:text-accent"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        ) : (
          <SpotlightCard className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-black/20 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  <th className="px-5 py-3">Project / Repo</th>
                  <th className="px-4 py-3">Domain</th>
                  <th className="px-4 py-3">Language</th>
                  <th className="px-4 py-3">Top Stack</th>
                  <th className="px-5 py-3 text-right">Links</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="cursor-pointer border-b border-[var(--border-subtle)]/60 transition-colors hover:bg-accent/[0.06]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--text-primary)]">
                        {project.title}
                      </div>
                      <div className="text-[11px] text-accent">
                        {project.repoName} · {project.pushedAt}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[var(--text-secondary)]">
                      {project.category}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)]">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              LANG_COLORS[project.primaryLanguage] || '#94a3b8',
                          }}
                        />
                        {project.primaryLanguage}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[var(--text-secondary)]">
                      {project.techStack.slice(0, 3).join(' · ')}
                    </td>
                    <td
                      className="px-5 py-3.5 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-400"
                          >
                            Live
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md border border-[var(--border-subtle)] px-2 py-1 text-[10px] text-[var(--text-secondary)] hover:border-accent hover:text-accent"
                        >
                          GitHub
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SpotlightCard>
        )}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] py-12 text-center">
            <p className="font-mono text-sm text-[var(--text-secondary)]">
              No repositories matched &quot;{query}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                onQueryChange('');
                setCategory('All');
              }}
              className="mt-3 cursor-pointer rounded-lg border border-accent px-3 py-1.5 font-mono text-xs text-accent"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Full GitHub CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={`${PROFILE.githubUrl}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-5 py-3 font-mono text-xs font-semibold text-[var(--text-primary)] backdrop-blur-xl transition-all hover:border-accent hover:text-accent"
          >
            <Github className="h-4 w-4 text-accent" />
            Explore All {PROFILE.stats.publicRepos} Public Repositories on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

