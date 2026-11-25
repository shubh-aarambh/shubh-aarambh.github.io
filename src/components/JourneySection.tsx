import React from 'react';
import { motion } from 'framer-motion';
import { GitCommitHorizontal } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            04 // COMMIT CHRONICLE
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Engineering Evolution (2025 → 2026)
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            A real progression reconstructed straight from my GitHub history — moving from
            responsive web apps to raw C++ networking, AI agents, distributed HLD, and AWS EKS.
          </p>
        </motion.div>

        <div className="relative pl-6 sm:pl-10">
          {/* Glowing vertical spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-2.5 top-2 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent sm:left-4"
          />

          <div className="space-y-6">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Node dot */}
                <div className="absolute -left-[25px] top-6 flex h-6 w-6 items-center justify-center rounded-full border border-accent bg-[var(--bg-primary)] text-accent shadow-[0_0_16px_rgba(var(--accent-rgb),0.5)] sm:-left-[35px]">
                  <GitCommitHorizontal className="h-3.5 w-3.5" />
                </div>

                <SpotlightCard className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-lg border border-accent/35 bg-accent/10 px-2.5 py-1 font-mono text-xs font-semibold text-accent">
                      {item.period}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      {item.era}
                    </span>
                  </div>

                  <h3 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

