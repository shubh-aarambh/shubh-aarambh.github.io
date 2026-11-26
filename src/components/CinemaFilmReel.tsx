import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, ExternalLink, Film, Play, Sparkles, Star } from 'lucide-react';
import { CINEMA_VAULT, CinemaItem } from '../data/entertainmentData';

export const CinemaFilmReel: React.FC = () => {
  const [selectedFilm, setSelectedFilm] = useState<CinemaItem>(CINEMA_VAULT[0]);
  const [searchSim, setSearchSim] = useState('');

  const filteredFilms = CINEMA_VAULT.filter((f) =>
    f.title.toLowerCase().includes(searchSim.toLowerCase()) ||
    f.director.toLowerCase().includes(searchSim.toLowerCase()) ||
    f.genre.toLowerCase().includes(searchSim.toLowerCase())
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#120b1c] via-[#1a0f2b] to-[#0a0714] p-5 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <Clapperboard className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
                SCREENTOP AI // CINEMA LAB
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-emerald-300">
                LIVE ON VERCEL
              </span>
            </div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-white">
              The Director's Screen &amp; Film Intelligence
            </h4>
          </div>
        </div>

        <a
          href="https://screen-top.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-amber-300 transition-colors hover:bg-amber-500/20"
        >
          Open ScreenTop AI
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Main Selected Film Showcase */}
      <div
        className="relative mt-4 overflow-hidden rounded-xl border border-white/10 p-4 transition-all"
        style={{ background: selectedFilm.posterBg }}
      >
        <div className="relative z-10 flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-300 backdrop-blur-md">
                <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                {selectedFilm.rating} · {selectedFilm.year}
              </span>
              <h3 className="mt-1 font-[family-name:var(--font-heading)] text-lg font-extrabold text-white sm:text-xl">
                {selectedFilm.title}
              </h3>
              <p className="font-mono text-xs text-slate-300">
                Directed by {selectedFilm.director}
              </p>
            </div>
            <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-slate-200">
              {selectedFilm.genre}
            </span>
          </div>

          <p className="italic text-xs text-amber-100/90">
            &ldquo;{selectedFilm.tagline}&rdquo;
          </p>

          <div className="rounded-lg border border-white/15 bg-black/60 p-3 backdrop-blur-md">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-amber-300 uppercase">
              <Sparkles className="h-3 w-3" />
              Creative &amp; Technical Synthesis:
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-200">
              {selectedFilm.aiInsight}
            </p>
          </div>
        </div>
      </div>

      {/* Film Strip Mini-Thumbnails */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            Curated Film Vault ({CINEMA_VAULT.length})
          </span>
          <span className="text-slate-400">Click to inspect screenplay notes</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CINEMA_VAULT.map((film) => (
            <button
              key={film.id}
              type="button"
              onClick={() => setSelectedFilm(film)}
              className={`cursor-pointer group flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                selectedFilm.id === film.id
                  ? 'border-amber-400 bg-amber-400/15 shadow-md'
                  : 'border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <span className="font-mono text-[9px] text-amber-300/80">
                  {film.year}
                </span>
                <p className="truncate font-semibold text-xs text-white group-hover:text-amber-300">
                  {film.title}
                </p>
              </div>
              <p className="mt-2 truncate font-mono text-[10px] text-slate-400">
                {film.director.split(' ').pop()}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
