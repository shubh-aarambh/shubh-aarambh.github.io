import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], desc: 'Open Global Command Palette' },
  { keys: ['R'], desc: 'Open Formal Resume / Download PDF' },
  { keys: ['T'], desc: 'Toggle Obsidian Dark / Daylight Light Mode' },
  { keys: ['A'], desc: 'Cycle Accent Palette (Cyan / Amber / Emerald / Violet)' },
  { keys: ['C'], desc: 'Open Ask Shubh AI Copilot' },
  { keys: ['G'], desc: 'Sync GitHub Now for Go Repository Push' },
  { keys: ['?'], desc: 'Show / Hide Keyboard Shortcuts' },
  { keys: ['Esc'], desc: 'Close Active Modal or Palette' },
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  open,
  onClose,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-base font-bold text-[var(--text-primary)]">
                <Keyboard className="h-4 w-4 text-accent" />
                Keyboard Power Shortcuts
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close shortcuts"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-accent hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {SHORTCUTS.map((s) => (
                <div
                  key={s.desc}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] px-3 py-2"
                >
                  <span className="text-xs text-[var(--text-secondary)]">
                    {s.desc}
                  </span>
                  <div className="flex shrink-0 items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-accent"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

