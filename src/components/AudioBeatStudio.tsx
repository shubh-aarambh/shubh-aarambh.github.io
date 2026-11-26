import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, FastForward, Pause, Play, Sliders, Volume2, VolumeX } from 'lucide-react';
import { SYNTH_TRACKS } from '../data/entertainmentData';

export const AudioBeatStudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [noteStep, setNoteStep] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const track = SYNTH_TRACKS[currentTrackIdx];

  const stopAudio = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const playNote = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') void ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = currentTrackIdx === 0 ? 'sawtooth' : currentTrackIdx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      const peakGain = 0.08 * volume;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(peakGain, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // AudioContext policy safe fallback
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      setIsPlaying(true);
      let step = 0;
      const intervalMs = Math.round((60 / track.bpm) * 1000 * 0.5);
      playNote(track.notes[0]);

      timerRef.current = window.setInterval(() => {
        step = (step + 1) % track.notes.length;
        setNoteStep(step);
        playNote(track.notes[step]);
      }, intervalMs);
    }
  };

  const nextTrack = () => {
    stopAudio();
    setCurrentTrackIdx((curr) => (curr + 1) % SYNTH_TRACKS.length);
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Equalizer canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 24;
      const barWidth = (canvas.width - (bars - 1) * 3) / bars;

      for (let i = 0; i < bars; i++) {
        let height = 6;
        if (isPlaying) {
          const wave = Math.sin(frame * 0.12 + i * 0.45) * 0.5 + 0.5;
          const noise = Math.cos(frame * 0.08 + i * 0.2) * 0.3;
          height = Math.max(6, (wave + noise) * (canvas.height - 8) * volume);
        }

        const x = i * (barWidth + 3);
        const y = canvas.height - height;

        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        grad.addColorStop(0, track.color);
        grad.addColorStop(1, 'rgba(255,255,255,0.05)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, height);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, track.color, volume]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#0c0d18] via-[#121324] to-[#0a0714] p-5 shadow-2xl backdrop-blur-xl">
      {/* Vinyl Record & Title Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/60 shadow-inner ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            <Disc className="h-6 w-6 text-rose-400" />
            <div className="absolute h-3 w-3 rounded-full bg-slate-900 border border-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-rose-400">
                STUDIO SYNTHESIZER
              </span>
              <span className="rounded bg-rose-500/20 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-rose-300">
                {track.bpm} BPM
              </span>
            </div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-white">
              {track.name}
            </h4>
            <p className="text-[11px] text-slate-400">{track.genre}</p>
          </div>
        </div>

        {/* Play / Next Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className={`cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full transition-all ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
            }`}
            title={isPlaying ? 'Pause Synthesizer' : 'Play Synthesizer'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={nextTrack}
            className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white"
            title="Next Track Preset"
          >
            <FastForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Reactive Visualizer Canvas */}
      <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-2.5">
        <canvas
          ref={canvasRef}
          width={360}
          height={48}
          className="h-12 w-full rounded"
        />
      </div>

      {/* Note Step Indicator Bar */}
      <div className="mt-3 flex items-center justify-between gap-1">
        {track.notes.map((freq, idx) => (
          <div
            key={idx}
            className={`h-1.5 flex-1 rounded-full transition-all duration-100 ${
              isPlaying && noteStep === idx
                ? 'bg-rose-400 scale-y-150 shadow-sm shadow-rose-400'
                : 'bg-white/10'
            }`}
            title={`${Math.round(freq)} Hz`}
          />
        ))}
      </div>

      {/* Volume and Footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-mono text-[10px] text-slate-400">
          Native Web Audio API · Zero External MP3s
        </span>
        <div className="flex items-center gap-1.5">
          <Volume2 className="h-3.5 w-3.5 text-slate-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1 w-16 accent-rose-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
