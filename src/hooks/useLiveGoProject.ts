import { useCallback, useEffect, useState } from 'react';
import { PROFILE, PROJECTS, ProjectItem } from '../data/portfolioData';

interface GitHubRepoApi {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  pushed_at: string;
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
    return 'Nov 2026';
  }
}

export function useLiveGoProject(): GoSyncState {
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS);
  const [goRepoDetected, setGoRepoDetected] = useState(true);
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

      const goRepo = repos.find(
        (r) => !r.fork && r.language?.toLowerCase() === 'go'
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
        const pushedLabel = formatMonthYear(goRepo.pushed_at);
        setProjects(
          PROJECTS.map((item) => {
            if (item.id !== 'pulsematrix-ai') return item;
            return {
              ...item,
              repoName: goRepo.name,
              pushedAt: pushedLabel,
              githubUrl: goRepo.html_url,
              liveUrl: goRepo.homepage?.trim() || item.liveUrl,
            };
          })
        );
        return true;
      }
      return true;
    } catch {
      return true;
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    void syncNow();
  }, [syncNow]);

  return { projects, goRepoDetected, syncing, lastChecked, syncNow };
}
