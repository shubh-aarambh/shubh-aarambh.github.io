import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { PROFILE, ProjectItem } from './data/portfolioData';
import { DimensionMode } from './data/entertainmentData';
import { useLiveGoProject } from './hooks/useLiveGoProject';
import { AccentTheme, Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EntertainmentSection } from './components/EntertainmentSection';
import { BentoAboutSection } from './components/BentoAboutSection';
import { FlagshipProjects } from './components/FlagshipProjects';
import { ProjectVault } from './components/ProjectVault';
import { ArchitecturePlayground } from './components/ArchitecturePlayground';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { CommandPalette } from './components/CommandPalette';
import { CursorAura } from './components/CursorAura';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioAssistant } from './components/PortfolioAssistant';
import { SectionRail } from './components/SectionRail';
import { ShortcutsModal } from './components/ShortcutsModal';
import { soundEngine } from './utils/soundEngine';

const ACCENT_ORDER: AccentTheme[] = ['cyan', 'amber', 'emerald', 'violet'];

export default function App() {
  const { projects, goRepoDetected, syncing, lastChecked, syncNow } =
    useLiveGoProject();
  const [isDark, setIsDark] = useState(true);
  const [accent, setAccent] = useState<AccentTheme>('cyan');
  const [dimension, setDimension] = useState<DimensionMode>('dual');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
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

  useEffect(() => {
    document.documentElement.setAttribute('data-dimension', dimension);
  }, [dimension]);

  const handleCycleDimension = useCallback(() => {
    const DIM_ORDER: DimensionMode[] = ['dual', 'tech', 'entertainment'];
    setDimension((curr) => {
      const next = DIM_ORDER[(DIM_ORDER.indexOf(curr) + 1) % DIM_ORDER.length];
      soundEngine.playSuccess();
      notify(`Persona dimension: ${next.toUpperCase()}`);
      return next;
    });
  }, [notify]);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.enabled = next;
      if (next) soundEngine.playSuccess();
      notify(next ? 'Subtle tactile UI sounds enabled' : 'UI sounds muted');
      return next;
    });
  }, [notify]);

  const handleCycleAccent = useCallback(() => {
    setAccent((curr) => {
      const next = ACCENT_ORDER[(ACCENT_ORDER.indexOf(curr) + 1) % ACCENT_ORDER.length];
      soundEngine.playClick();
      notify(`Switched accent to ${next.toUpperCase()}`);
      return next;
    });
  }, [notify]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      soundEngine.playSuccess();
      notify(`Copied ${PROFILE.email} to clipboard`);
    } catch {
      notify(`Email: ${PROFILE.email}`);
    }
  }, [notify]);

  const handleSyncGo = useCallback(async () => {
    soundEngine.playClick();
    const found = await syncNow();
    if (found) {
      soundEngine.playSuccess();
      notify('Go project detected & promoted live from GitHub!');
    } else {
      notify('Checked GitHub — no Go repo pushed yet (auto-watches on load).');
    }
  }, [notify, syncNow]);

  // Global keyboard shortcuts (Ctrl+K, T, A, R, C, G, ?)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundEngine.playClick();
        setCommandOpen((o) => !o);
        return;
      }

      // Skip single-key shortcuts when typing inside inputs/textareas/selects
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (e.key === '?') {
        e.preventDefault();
        soundEngine.playClick();
        setShortcutsOpen((o) => !o);
      } else if (key === 't') {
        soundEngine.playClick();
        setIsDark((d) => !d);
      } else if (key === 'd') {
        handleCycleDimension();
      } else if (key === 'a') {
        handleCycleAccent();
      } else if (key === 'r') {
        soundEngine.playClick();
        setResumeOpen((o) => !o);
      } else if (key === 'c') {
        soundEngine.playClick();
        setAssistantOpen((o) => !o);
      } else if (key === 'g') {
        void handleSyncGo();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleCycleAccent, handleSyncGo]);

  const handleSelectProjectById = useCallback(
    (id: string) => {
      const found = projects.find((p) => p.id === id) || null;
      if (found) {
        soundEngine.playClick();
        setSelectedProject(found);
      }
    },
    [projects]
  );

  const handleFilterBySkill = useCallback(
    (skill: string) => {
      soundEngine.playClick();
      setVaultQuery(skill);
      notify(`Filtering Project Vault by "${skill}"`);
      const el = document.getElementById('vault');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [notify]
  );

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
      <SectionRail />

      <Navbar
        isDark={isDark}
        onToggleDark={() => {
          soundEngine.playClick();
          setIsDark((d) => !d);
        }}
        accent={accent}
        onChangeAccent={(a) => {
          soundEngine.playClick();
          setAccent(a);
          notify(`Theme accent set to ${a.toUpperCase()}`);
        }}
        onOpenCommand={() => {
          soundEngine.playClick();
          setCommandOpen(true);
        }}
        onOpenResume={() => {
          soundEngine.playClick();
          setResumeOpen(true);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        dimension={dimension}
        onChangeDimension={(dim) => {
          soundEngine.playSuccess();
          setDimension(dim);
          notify(`Persona dimension set to ${dim.toUpperCase()}`);
        }}
      />

      <main>
        <HeroSection
          dimension={dimension}
          onChangeDimension={(dim) => {
            soundEngine.playSuccess();
            setDimension(dim);
            notify(`Persona dimension set to ${dim.toUpperCase()}`);
          }}
          onOpenCommand={() => {
            soundEngine.playClick();
            setCommandOpen(true);
          }}
          onOpenResume={() => {
            soundEngine.playClick();
            setResumeOpen(true);
          }}
          onSelectProject={handleSelectProjectById}
        />
        <EntertainmentSection />
        <BentoAboutSection onFilterBySkill={handleFilterBySkill} />
        <FlagshipProjects
          projects={projects}
          onSelectProject={(p) => {
            soundEngine.playClick();
            setSelectedProject(p);
          }}
          goSync={goSyncProp}
        />
        <ProjectVault
          projects={projects}
          onSelectProject={(p) => {
            soundEngine.playClick();
            setSelectedProject(p);
          }}
          query={vaultQuery}
          onQueryChange={setVaultQuery}
        />
        <ArchitecturePlayground />
        <JourneySection />
        <ContactSection
          onNotify={notify}
          onOpenShortcuts={() => {
            soundEngine.playClick();
            setShortcutsOpen(true);
          }}
        />
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

      {/* Keyboard Power Shortcuts Overlay */}
      <ShortcutsModal
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
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
