import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Github,
  PlayCircle,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  PROFILE,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolioData';
import { ProjectPreview } from './ProjectPreviews';
import { SpotlightCard } from './SpotlightCard';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
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
  Shell: '#10b981',
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProjects = useMemo(
    () => PROJECTS.filter((p) => p.featured),
    []
  );

  const vaultProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const catMatch =
        activeCategory === 'All' || p.category === activeCategory;
      const searchMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.repoName.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)) ||
        p.primaryLanguage.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* SECTION 02: FLAGSHIP SPOTLIGHT CASE STUDIES */}
      <section id="flagship" className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                02 // FLAGSHIP SYSTEMS
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Interactive Architecture Spotlight
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--text-secondary)]">
              My four most ambitious systems — each paired with an interactive live
              simulator below. Click any card to inspect the full engineering dossier.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <SpotlightCard
                  onClick={() => onSelectProject(project)}
                  className="group flex h-full cursor-pointer flex-col p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
                >
                  {/* Top Bar */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg border border-accent/35 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-accent">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        /{project.repoName}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {project.pushedAt}
                    </span>
                  </div>

                  {/* Interactive Bespoke Architecture Preview */}
                  {project.previewType && (
                    <div className="mb-5 h-56">
                      <ProjectPreview type={project.previewType} />
                    </div>
                  )}

                  {/* Title & Tagline */}
                  <div className="flex-1">
                    <h3 className="flex items-center justify-between gap-2 font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-accent">
                      <span>{project.title}</span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] px-3 py-2"
                      >
                        <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                          {m.label}
                        </div>
                        <div className="mt-0.5 truncate font-mono text-xs font-semibold text-[var(--text-primary)]">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 7).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--border-subtle)] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 7 && (
                      <span className="rounded-md px-1.5 py-0.5 font-mono text-[11px] text-accent">
                        +{project.techStack.length - 7}
                      </span>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Inspect Dossier
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                        >
                          Live <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: COMPLETE GITHUB PROJECT VAULT */}
      <section id="vault" className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
          >
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                03 // GITHUB REPOSITORY VAULT
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Every Major Build ({PROJECTS.length})
              </h2>
            </div>

            {/* Live Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by repo, tech, lang..."
                aria-label="Search GitHub projects"
                className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] py-2.5 pl-10 pr-4 font-mono text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] backdrop-blur-xl outline-none transition-colors focus:border-accent"
              />
            </div>
          </motion.div>

          {/* Animated Category Filter Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative cursor-pointer rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-colors ${
                    isActive
                      ? 'text-slate-950'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="vault-active-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-accent"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat}
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] ${
                        isActive ? 'bg-black/15 text-slate-950' : 'bg-white/5 text-[var(--text-muted)]'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filterable Grid */}
          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {vaultProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                >
                  <SpotlightCard
                    onClick={() => onSelectProject(project)}
                    className="group flex h-full cursor-pointer flex-col justify-between p-5 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                          <FolderGit2 className="h-4 w-4 text-accent" />
                          <span className="truncate">{project.repoName}</span>
                        </div>
                        <span className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-secondary)]">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                LANG_COLORS[project.primaryLanguage] || '#22d3ee',
                            }}
                          />
                          {project.primaryLanguage}
                        </span>
                      </div>

                      <h3 className="mt-3.5 font-[family-name:var(--font-heading)] text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                        {project.tagline}. {project.description}
                      </p>
                    </div>

                    <div className="mt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-[var(--border-subtle)] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                        <span className="font-mono text-[11px] text-[var(--text-muted)]">
                          {project.pushedAt}
                        </span>
                        <div className="flex items-center gap-2.5">
                          {project.demoVideoUrl && (
                            <a
                              href={project.demoVideoUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-400 hover:underline"
                            >
                              <PlayCircle className="h-3.5 w-3.5" /> Demo
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400 hover:underline"
                            >
                              Live <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Open ${project.title} on GitHub`}
                            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {vaultProjects.length === 0 && (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-10 text-center">
              <p className="font-mono text-sm text-[var(--text-secondary)]">
                No repositories matched &ldquo;{searchQuery}&rdquo;. Try searching for
                &ldquo;AWS&rdquo;, &ldquo;Playwright&rdquo;, &ldquo;C++&rdquo;, or &ldquo;Spring&rdquo;.
              </p>
            </div>
          )}

          {/* View All 18 Repos CTA */}
          <div className="mt-8 text-center">
            <a
              href={`${PROFILE.githubUrl}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-5 py-2.5 font-mono text-xs font-semibold text-[var(--text-primary)] transition-all hover:border-accent hover:text-accent"
            >
              <Github className="h-4 w-4" />
              Browse all {PROFILE.stats.publicRepos} repositories on github.com/{PROFILE.handle}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
