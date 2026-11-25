import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';

interface ContactSectionProps {
  onNotify: (msg: string) => void;
}

const TOPICS = ['SWE Internship', 'AI / RAG Project', 'DevOps / Cloud', 'Collaboration'];

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotify }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      onNotify(`Copied ${PROFILE.email} to clipboard`);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      onNotify(`Email: ${PROFILE.email}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${topic}] Hello Shubh — from ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hi Shubh,\n\n${message || 'I saw your portfolio and would love to connect!'}\n\n— ${
        name || 'Visitor'
      }${senderEmail ? ` (${senderEmail})` : ''}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    onNotify('Opening your mail client with pre-filled brief!');
  };

  return (
    <section id="contact" className="relative pb-14 pt-20 sm:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            05 // INITIATE TRANSMISSION
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Let&apos;s Build Something Unforgettable
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Direct Channels */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <SpotlightCard className="p-6">
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                READY TO SHIP
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--text-primary)]">
                Looking for an engineer who owns both the architecture and the polish?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                I&apos;m actively open to Software Engineering, Applied AI, and Cloud/DevOps
                internships, hackathons, and ambitious open-source collaborations.
              </p>

              <div className="mt-6 space-y-3">
                {/* Copy Email Card */}
                <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-white/[0.03] p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                        Direct Email
                      </div>
                      <div className="truncate font-mono text-xs font-semibold text-[var(--text-primary)]">
                        {PROFILE.email}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border-strong)] px-2.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--text-primary)] transition-colors hover:border-accent hover:text-accent"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* LinkedIn Channel */}
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 rounded-xl border border-[#0A66C2]/30 bg-[#0A66C2]/[0.07] p-3 transition-colors hover:border-[#0A66C2]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A66C2]/20 text-[#38a3ff]">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                        LinkedIn Network
                      </div>
                      <div className="truncate font-mono text-xs font-semibold text-[var(--text-primary)]">
                        in/{PROFILE.linkedinHandle}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-[#38a3ff]">
                    Connect →
                  </span>
                </a>

                {/* GitHub Channel */}
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-white/[0.03] p-3 transition-colors hover:border-accent"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[var(--text-primary)]">
                      <Github className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-[var(--text-muted)]">
                        GitHub Profile
                      </div>
                      <div className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                        github.com/{PROFILE.handle}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-accent">18 repos →</span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] p-3 font-mono text-xs text-[var(--text-secondary)]">
                  <MapPin className="h-4 w-4 text-accent" />
                  Bengaluru, India · Remote &amp; On-site Ready
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Quick Message Composer */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full p-6">
              <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between gap-4">
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--text-primary)]">
                    Send a Direct Brief
                  </h3>

                  {/* Topic selector */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {TOPICS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className={`cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                          topic === item
                            ? 'border-accent bg-accent/15 font-semibold text-accent'
                            : 'border-[var(--border-subtle)] bg-white/[0.02] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-mono text-[11px] text-[var(--text-muted)]">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full rounded-xl border border-[var(--border-subtle)] bg-black/20 px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[11px] text-[var(--text-muted)]">
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full rounded-xl border border-[var(--border-subtle)] bg-black/20 px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="mb-1 block font-mono text-[11px] text-[var(--text-muted)]">
                      MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about the role, project, or idea you'd like to collaborate on..."
                      className="w-full resize-none rounded-xl border border-[var(--border-subtle)] bg-black/20 px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    Dispatches directly to {PROFILE.email}
                  </span>
                  <button
                    type="submit"
                    className="glow-accent inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-slate-950 transition-all hover:brightness-110"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </SpotlightCard>
          </div>
        </div>

        {/* Architectural Footer */}
        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 sm:flex-row">
          <div className="text-center font-mono text-xs text-[var(--text-muted)] sm:text-left">
            <span className="font-bold text-[var(--text-primary)]">SHUBH SHUKLA</span> · Crafted
            from live GitHub scan (<span className="text-accent">@{PROFILE.handle}</span>) · 2026
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[#38a3ff] transition-colors hover:border-[#0A66C2]"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-accent hover:text-accent"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <span className="hidden rounded-lg border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)] sm:inline-block">
              Tip: Press <strong className="text-accent">Ctrl+K</strong> anywhere
            </span>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-accent hover:text-accent"
            >
              Top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
