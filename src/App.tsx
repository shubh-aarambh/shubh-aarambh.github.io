import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { PROFILE, ProjectItem } from './data/portfolioData';
import { useLiveGoProject } from './hooks/useLiveGoProject';
import { AccentTheme, Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BentoAboutSection } from './components/BentoAboutSection';
import { FlagshipProjects } from './components/FlagshipProjects';
import { ProjectVault } from './components/ProjectVault';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { CommandPalette } from './components/CommandPalette';
import { CursorAura } from './components/CursorAura';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioAssistant } from './components/PortfolioAssistant';

const ACCENT_ORDER: AccentTheme[] = ['cyan', 'amber', 'emerald', 'violet'];

export default function App() {
  const { projects, goRepoDetected, syncing, lastChecked, syncNow } =
    useLiveGoProject();
  const [isDark, setIsDark] = useState(true);
  const [accent, setAccent] = useState<AccentTheme>('cyan');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [vaultQuery, setVaultQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  // Apply theme & accent classes to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCycleAccent = useCallback(() => {
    setAccent((curr) => {
      const next = ACCENT_ORDER[(ACCENT_ORDER.indexOf(curr) + 1) % ACCENT_ORDER.length];
      notify(`Switched accent to ${next.toUpperCase()}`);
      return next;
    });
  }, [notify]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      notify(`Copied ${PROFILE.email} to clipboard`);
    } catch {
      notify(`Email: ${PROFILE.email}`);
    }
  }, [notify]);

  const handleSelectProjectById = useCallback(
    (id: string) => {
      const found = projects.find((p) => p.id === id) || null;
      if (found) setSelectedProject(found);
    },
    [projects]
  );

  const handleFilterBySkill = useCallback(
    (skill: string) => {
      setVaultQuery(skill);
      notify(`Filtering Project Vault by "${skill}"`);
      const el = document.getElementById('vault');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [notify]
  );

  const handleSyncGo = useCallback(async () => {
    const found = await syncNow();
    if (found) {
      notify('Go project detected & promoted live from GitHub!');
    } else {
      notify('Checked GitHub — no Go repo pushed yet (auto-watches on load).');
    }
  }, [notify, syncNow]);

  const goSyncProp = {
    detected: goRepoDetected,
    syncing,
    lastChecked,
    onSync: () => {
      void handleSyncGo();
    },
  };

  return (
    <div className="bg-blueprint relative min-h-screen">
      <CursorAura />

      <Navbar
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
        accent={accent}
        onChangeAccent={(a) => {
          setAccent(a);
          notify(`Theme accent set to ${a.toUpperCase()}`);
        }}
        onOpenCommand={() => setCommandOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main>
        <HeroSection
          onOpenCommand={() => setCommandOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          onSelectProject={handleSelectProjectById}
        />
        <BentoAboutSection onFilterBySkill={handleFilterBySkill} />
        <FlagshipProjects
          projects={projects}
          onSelectProject={setSelectedProject}
          goSync={goSyncProp}
        />
        <ProjectVault
          projects={projects}
          onSelectProject={setSelectedProject}
          query={vaultQuery}
          onQueryChange={setVaultQuery}
        />
        <JourneySection />
        <ContactSection onNotify={notify} />
      </main>

      {/* Deep-Dive Project Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        goSync={goSyncProp}
      />

      {/* Interactive Printable Resume / CV Modal */}
      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        projects={projects}
        onNotify={notify}
      />

      {/* Global Ctrl+K Command Palette */}
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        projects={projects}
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
        onCycleAccent={handleCycleAccent}
        accent={accent}
        onSelectProject={setSelectedProject}
        onCopyEmail={handleCopyEmail}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Floating AI Portfolio Copilot + Quick LinkedIn/Resume Dock */}
      <PortfolioAssistant
        open={assistantOpen}
        onToggle={setAssistantOpen}
        projects={projects}
        onSelectProject={setSelectedProject}
        onOpenResume={() => setResumeOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-xl border border-accent/40 bg-[var(--bg-secondary)] px-4 py-2.5 font-mono text-xs text-[var(--text-primary)] shadow-2xl backdrop-blur-xl print:hidden"
          >
            <CheckCircle2 className="h-4 w-4 text-accent" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
