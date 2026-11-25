import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Command,
  FileText,
  Github,
  Linkedin,
  Menu,
  Moon,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export type AccentTheme = 'cyan' | 'amber' | 'emerald' | 'violet';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  accent: AccentTheme;
  onChangeAccent: (accent: AccentTheme) => void;
  onOpenCommand: () => void;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'DNA', href: '#about' },
  { label: 'Flagship', href: '#flagship' },
  { label: 'Vault', href: '#vault' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const ACCENTS: { id: AccentTheme; color: string; label: string }[] = [
  { id: 'cyan', color: '#22d3ee', label: 'Cyber Cyan' },
  { id: 'amber', color: '#f59e0b', label: 'Solar Amber' },
  { id: 'emerald', color: '#10b981', label: 'Emerald Matrix' },
  { id: 'violet', color: '#a78bfa', label: 'Hyper Violet' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleDark,
  accent,
  onChangeAccent,
  onOpenCommand,
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy for active navigation pill
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
      />

      <header
        className={`fixed inset-x-0 top-3 z-40 mx-auto max-w-6xl px-4 transition-all duration-300 ${
          scrolled ? 'top-2.5' : 'top-4'
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? 'border-[var(--border-strong)] bg-[var(--bg-card-hover)] shadow-2xl shadow-black/25'
              : 'border-[var(--border-subtle)] bg-[var(--bg-card)]'
          }`}
        >
          {/* Brand */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-mono text-sm font-bold tracking-wider"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-black/30 text-accent transition-transform duration-300 group-hover:scale-105">
              <Terminal className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[var(--bg-primary)]" />
            </span>
            <span className="hidden sm:inline-block">
              <span className="text-[var(--text-primary)]">SHUBH</span>
              <span className="text-accent">.DEV</span>
            </span>
          </a>

          {/* Desktop Navigation with Scroll-Spy */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-xl border border-accent/35 bg-accent/10"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Accent Color Dots */}
            <div
              className="hidden items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] px-2 py-1.5 lg:flex"
              aria-label="Accent color theme"
            >
              {ACCENTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChangeAccent(item.id)}
                  title={item.label}
                  className={`h-3.5 w-3.5 cursor-pointer rounded-full transition-transform ${
                    accent === item.id
                      ? 'scale-125 ring-2 ring-white/80 ring-offset-1 ring-offset-black'
                      : 'opacity-65 hover:scale-110 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: item.color }}
                />
              ))}
            </div>

            {/* Command Palette Button */}
            <button
              type="button"
              onClick={onOpenCommand}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)] transition-all hover:border-accent hover:text-[var(--text-primary)]"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="h-3.5 w-3.5 text-accent" />
              <span className="hidden sm:inline">Ctrl+K</span>
            </button>

            {/* Resume PDF Button */}
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)] transition-all hover:border-accent hover:text-[var(--text-primary)] sm:flex"
              title="Open Interactive Resume / Save PDF"
            >
              <FileText className="h-3.5 w-3.5 text-accent" />
              <span className="hidden xl:inline">Resume</span>
            </button>

            {/* Dark/Light Mode */}
            <button
              type="button"
              onClick={onToggleDark}
              aria-label="Toggle color theme"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-accent hover:text-[var(--text-primary)]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* LinkedIn Icon */}
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              className="hidden h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2] sm:flex"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            {/* GitHub Icon */}
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              className="hidden h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:border-accent hover:text-[var(--text-primary)] sm:flex"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-primary)] md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card-hover)] p-4 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
              <div className="flex items-center gap-2">
                {ACCENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangeAccent(item.id)}
                    aria-label={item.label}
                    className={`h-4 w-4 rounded-full ${
                      accent === item.id ? 'scale-125 ring-2 ring-white' : 'opacity-70'
                    }`}
                    style={{ backgroundColor: item.color }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-mono text-xs text-[#0A66C2]"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-mono text-xs text-accent"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};

