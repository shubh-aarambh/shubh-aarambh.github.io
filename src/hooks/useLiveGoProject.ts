import { useCallback, useEffect, useState } from 'react';
import { PROFILE, PROJECTS, ProjectItem } from '../data/portfolioData';

interface GitHubRepoApi {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  pushed_at: string;
  topics?: string[];
  stargazers_count: number;
  fork: boolean;
}

export interface GoSyncState {
  projects: ProjectItem[];
  goRepoDetected: boolean;
  syncing: boolean;
  lastChecked: string | null;
  syncNow: () => Promise<boolean>;
}

function formatMonthYear(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '2026';
  }
}

export function useLiveGoProject(): GoSyncState {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS);
  const [goRepoDetected, setGoRepoDetected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const syncNow = useCallback(async (): Promise<boolean> => {
    setSyncing(true);
    try {
      const res = await fetch(
        `https://api.github.com/users/${PROFILE.handle}/repos?sort=pushed&per_page=30`,
        {
          headers: { Accept: 'application/vnd.github+json' },
        }
      );
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const repos: GitHubRepoApi[] = await res.json();

      // Detect newest original Go repository pushed to shubh-aarambh
      const goRepo = repos.find(
        (r) =>
          !r.fork &&
          (r.language?.toLowerCase() === 'go' ||
            (r.topics ?? []).some((t) => t.toLowerCase() === 'golang' || t.toLowerCase() === 'go'))
      );

      setLastChecked(
        new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date())
      );

      if (goRepo) {
        setGoRepoDetected(true);
        const formattedTitle = goRepo.name
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        setProjects(
          PROJECTS.map((item) => {
            if (item.id !== 'go-upcoming') return item;
            const pushedLabel = formatMonthYear(goRepo.pushed_at);
            return {
              ...item,
              repoName: goRepo.name,
              title: `${formattedTitle} — Go Project`,
              tagline:
                goRepo.description?.trim() ||
                'High-performance Go (Golang) project freshly pushed & auto-synced from GitHub',
              description:
                goRepo.description?.trim() ||
                `Live Go repository (${goRepo.name}) automatically discovered and highlighted from github.com/${PROFILE.handle}. Built with idiomatic Go architecture and concurrency primitives.`,
              inProgress: false,
              pushedAt: pushedLabel,
              year: new Date(goRepo.pushed_at).getFullYear().toString(),
              githubUrl: goRepo.html_url,
              liveUrl: goRepo.homepage?.trim() || undefined,
              techStack: Array.from(
                new Set([
                  'Go (Golang)',
                  ...(goRepo.topics ?? []).map((t) => t.toUpperCase()),
                  'GitHub Auto-Synced',
                ])
              ),
              highlights: [
                `Automatically detected live from github.com/${PROFILE.handle}/${goRepo.name}.`,
                `Primary language verified as Go · Last pushed ${pushedLabel}.`,
                goRepo.homepage
                  ? `Includes live deployment endpoint at ${goRepo.homepage}.`
                  : 'Ready for source inspection directly on GitHub.',
              ],
              metrics: [
                { label: 'Language', value: 'Go (Golang)' },
                { label: 'Pushed', value: pushedLabel },
                { label: 'Status', value: 'Live on GitHub' },
              ],
            };
          })
        );
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    void syncNow();
  }, [syncNow]);

  return { projects, goRepoDetected, syncing, lastChecked, syncNow };
}

