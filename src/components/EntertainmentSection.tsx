import React from 'react';
import { motion } from 'framer-motion';
import {
  Clapperboard,
  Disc,
  Mic,
  Radio,
  Sparkles,
  Tv,
  Zap,
} from 'lucide-react';
import { CREATIVE_PILLARS, ENTERTAINMENT_PROFILE } from '../data/entertainmentData';
import { AudioBeatStudio } from './AudioBeatStudio';
import { CinemaFilmReel } from './CinemaFilmReel';
import { SpotlightCard } from './SpotlightCard';

export const EntertainmentSection: React.FC = () => {
  return (
    <section id="entertainment" className="relative py-20 sm:py-24">
      {/* Ambient background cinematic spotlight */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-rose-600/15 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-amber-500/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-rose-400">
                <Sparkles className="h-3.5 w-3.5" />
                SIDE B // THE CREATIVE &amp; ENTERTAINMENT BRAND
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                PRODUCER DECK
              </span>
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Cinematic Intelligence &amp; Creative Studio
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Beyond distributed backends and Kubernetes clusters, here is Shubh as a comprehensive
              brand package — sound design, cinematic AI, stage storytelling, and visual craft.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-lg">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Brand Synergy
              </p>
              <p className="font-bold text-sm text-white">
                Tech Engine × Entertainment Soul
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4 Creative Pillars Bento */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREATIVE_PILLARS.map((pillar, idx) => {
            const Icon =
              pillar.iconName === 'Clapperboard'
                ? Clapperboard
                : pillar.iconName === 'Disc'
                ? Disc
                : pillar.iconName === 'Mic'
                ? Mic
                : Sparkles;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <SpotlightCard className="h-full p-5 border-white/15 bg-gradient-to-b from-white/[0.04] to-transparent">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 text-rose-300 border border-rose-500/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-heading)] text-base font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs text-rose-300/80">{pillar.subtitle}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {pillar.description}
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-3">
                    <span className="font-mono text-[10px] font-semibold text-amber-300">
                      ✓ {pillar.metrics}
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Studio Duo: Synthesizer & Cinema Reel */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Web Audio Beat Studio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6"
          >
            <AudioBeatStudio />
          </motion.div>

          {/* Right: ScreenTop AI Cinema Lab */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <CinemaFilmReel />
          </motion.div>
        </div>

        {/* Brand Manifesto Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-amber-950/40 p-6 sm:p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-rose-400">
                THE SHUBH SHUKLA BRAND CREDO
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-white sm:text-2xl">
                &ldquo;Engineering makes it possible. Entertainment makes it unforgettable.&rdquo;
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {ENTERTAINMENT_PROFILE.manifesto}
              </p>
            </div>

            <div className="shrink-0 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/10 shadow-lg shadow-rose-500/20">
                <Zap className="h-8 w-8 text-rose-400" />
              </div>
              <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                SHUBH SHUKLA
              </p>
              <p className="font-mono text-[10px] text-slate-400">
                Bengaluru, India · SST
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
