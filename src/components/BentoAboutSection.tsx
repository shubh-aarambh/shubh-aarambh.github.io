import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Clock,
  Code2,
  Cpu,
  Flame,
  GraduationCap,
  Layers,
  MapPin,
  Server,
  Sparkles,
} from 'lucide-react';
import {
  GITHUB_HEATMAP_WEEKS,
  LANGUAGE_BREAKDOWN,
  PROFILE,
  SKILL_DOMAINS,
} from '../data/portfolioData';
import { useLiveGitHubActivity } from '../hooks/useLiveGitHubActivity';
import { SpotlightCard } from './SpotlightCard';

const DOMAIN_ICONS = [Sparkles, Server, Cpu, Layers];

interface BentoAboutSectionProps {
  onFilterBySkill: (skill: string) => void;
}

export const BentoAboutSection: React.FC<BentoAboutSectionProps> = ({
  onFilterBySkill,
}) => {
  const { events: recentActivity, liveLoaded } = useLiveGitHubActivity();
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        setIstTime(
          new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(now)
        );
      } catch {
        setIstTime('IST');
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const getCellStyle = (count: number) => {
    if (count === 0) return 'bg-white/[0.05] border-white/[0.04]';
    if (count <= 4) return 'bg-accent/35 border-accent/40';
    if (count <= 9) return 'bg-accent/65 border-accent/70';
    return 'bg-accent border-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.75)]';
  };

  return (
    <section id="about" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              01 // ENGINEERING DNA
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Built Across the Entire Stack
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            Every metric below is derived directly from scanning{' '}
            <span className="font-mono text-accent">github.com/{PROFILE.handle}</span> — from
            POSIX C++ sockets to Kubernetes clusters and autonomous LLM agents.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Identity & Live Clock Card */}
          <SpotlightCard className="p-6 lg:col-span-7">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs font-semibold text-accent">
                    <GraduationCap className="h-3.5 w-3.5" />
                    Scaler School of Technology
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {istTime || 'IST'} · BLR
                  </span>
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--text-primary)]">
                  I don&apos;t just ship UIs — I engineer the infrastructure, agents, and
                  protocols powering them.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Whether writing a raw multi-threaded HTTP/1.1 server in C++11, designing an
                  MD5 consistent hash ring for sub-millisecond typeahead, orchestrating Playwright
                  with Groq/Gemini hybrid recovery, or deploying FastAPI + PostgreSQL onto AWS EKS
                  via Terraform and Helm — I love digging down to first principles and shipping
                  production-ready software.
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-black/20 p-3.5">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-accent">
                    <Activity className="h-3.5 w-3.5" />
                    RECENT GITHUB PUSH STREAM
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    {liveLoaded ? '● LIVE API' : '● VERIFIED SNAPSHOT'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {recentActivity.slice(0, 3).map((ev) => (
                    <a
                      key={ev.id}
                      href={ev.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-2 rounded-lg border border-transparent px-2 py-1 font-mono text-[11px] transition-colors hover:border-[var(--border-subtle)] hover:bg-white/[0.03]"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold text-accent">
                          {ev.action}
                        </span>
                        <span className="shrink-0 font-semibold text-[var(--text-primary)] group-hover:text-accent">
                          {ev.repo}
                        </span>
                        <span className="truncate text-[var(--text-muted)]">
                          — {ev.message}
                        </span>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-0.5 text-[10px] text-[var(--text-muted)]">
                        {ev.timeAgo}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4 font-mono text-xs text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent" /> Bengaluru, Karnataka
                </span>
                <span className="text-[var(--text-muted)]">·</span>
                <span>GitHub since {PROFILE.githubJoined}</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-emerald-400">● Open to Internships & SWE</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Right Column: Language DNA + Contribution Heatmap */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* Real Language Distribution Card */}
            <SpotlightCard className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--text-primary)]">
                  <Code2 className="h-4 w-4 text-accent" />
                  Scanned Language DNA
                </div>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  ~1.03 MB source
                </span>
              </div>

              {/* Stacked Progress Bar */}
              <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                {LANGUAGE_BREAKDOWN.map((lang) => (
                  <motion.div
                    key={lang.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                    style={{ backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percent}% (${lang.bytes})`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                {LANGUAGE_BREAKDOWN.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-primary)]">
                      {lang.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            {/* Real GitHub Contribution Activity Heatmap */}
            <SpotlightCard className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--text-primary)]">
                  <Flame className="h-4 w-4 text-amber-400" />
                  GitHub Commit Pulse
                </div>
                <span className="font-mono text-[11px] text-accent">
                  {PROFILE.stats.yearlyContributions} contributions
                </span>
              </div>

              <div className="mt-4 overflow-x-auto pb-1">
                <div className="flex gap-1">
                  {GITHUB_HEATMAP_WEEKS.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((count, dIdx) => (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          title={
                            count > 0
                              ? `${count} contribution${count === 1 ? '' : 's'}`
                              : 'No commits'
                          }
                          className={`h-2.5 w-2.5 rounded-[3px] border transition-transform hover:scale-125 ${getCellStyle(
                            count
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                <span>Last 26 weeks · Peak: 33/day (EKS Capstone)</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <span className="h-2 w-2 rounded-[2px] bg-white/10" />
                  <span className="h-2 w-2 rounded-[2px] bg-accent/40" />
                  <span className="h-2 w-2 rounded-[2px] bg-accent" />
                  <span>More</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* 4-Domain Engineering Matrix */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_DOMAINS.map((domain, idx) => {
            const Icon = DOMAIN_ICONS[idx % DOMAIN_ICONS.length];
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
              >
                <SpotlightCard className="h-full p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--text-primary)]">
                        {domain.title}
                      </h3>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {domain.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {domain.items.map((skill) => {
                      // Pick clean searchable token for Vault filter
                      const keyword = skill.split(' ')[0].replace(/[()]/g, '');
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => onFilterBySkill(keyword)}
                          title={`Click to filter matching "${keyword}" projects in Vault`}
                          className="cursor-pointer rounded-lg border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] transition-all hover:border-accent hover:bg-accent/15 hover:text-accent"
                        >
                          {skill}
                        </button>
                      );
                    })}
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

