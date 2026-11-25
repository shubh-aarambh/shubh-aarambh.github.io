import { useEffect, useState } from 'react';
import { PROFILE } from '../data/portfolioData';

export interface GitHubActivityItem {
  id: string;
  repo: string;
  repoUrl: string;
  action: string;
  message: string;
  timeAgo: string;
}

interface GitHubEventApi {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    commits?: { message: string }[];
    ref_type?: string;
    action?: string;
  };
}

function formatRelativeTime(iso: string): string {
  const diffSec = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const FALLBACK_ACTIVITY: GitHubActivityItem[] = [
  {
    id: 'fb-1',
    repo: 'shubh-aarambh.github.io',
    repoUrl: 'https://github.com/shubh-aarambh/shubh-aarambh.github.io',
    action: 'PUSH',
    message: 'Launch interactive portfolio & formal ATS resume PDF',
    timeAgo: 'Live',
  },
  {
    id: 'fb-2',
    repo: 'Study-Track',
    repoUrl: 'https://github.com/shubh-aarambh/Study-Track',
    action: 'DEPLOY',
    message: 'AWS EKS Ingress, Terraform HCL, Helm & Prometheus',
    timeAgo: 'Oct 2026',
  },
  {
    id: 'fb-3',
    repo: 'Auto-HainJi',
    repoUrl: 'https://github.com/shubh-aarambh/Auto-HainJi',
    action: 'PUSH',
    message: 'Hybrid deterministic-AI Playwright browser agent',
    timeAgo: 'Jun 2026',
  },
];

export function useLiveGitHubActivity() {
  const [events, setEvents] = useState<GitHubActivityItem[]>(FALLBACK_ACTIVITY);
  const [liveLoaded, setLiveLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`https://api.github.com/users/${PROFILE.handle}/events/public?per_page=10`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: GitHubEventApi[]) => {
        if (!active || !Array.isArray(data) || data.length === 0) return;
        const parsed: GitHubActivityItem[] = [];
        for (const ev of data) {
          const shortRepo = ev.repo.name.replace(`${PROFILE.handle}/`, '');
          const repoUrl = `https://github.com/${ev.repo.name}`;
          if (ev.type === 'PushEvent') {
            const firstMsg = ev.payload?.commits?.[0]?.message?.split('\n')[0] || 'Pushed code commits';
            parsed.push({
              id: ev.id,
              repo: shortRepo,
              repoUrl,
              action: 'PUSH',
              message: firstMsg,
              timeAgo: formatRelativeTime(ev.created_at),
            });
          } else if (ev.type === 'CreateEvent') {
            parsed.push({
              id: ev.id,
              repo: shortRepo,
              repoUrl,
              action: 'CREATE',
              message: `Created ${ev.payload?.ref_type || 'repository'}`,
              timeAgo: formatRelativeTime(ev.created_at),
            });
          } else if (ev.type === 'PullRequestEvent') {
            parsed.push({
              id: ev.id,
              repo: shortRepo,
              repoUrl,
              action: 'PR',
              message: `${ev.payload?.action || 'Updated'} pull request`,
              timeAgo: formatRelativeTime(ev.created_at),
            });
          }
          if (parsed.length >= 4) break;
        }
        if (parsed.length > 0) {
          setEvents(parsed);
          setLiveLoaded(true);
        }
      })
      .catch(() => {
        // Keep clean fallback events silently
      });

    return () => {
      active = false;
    };
  }, []);

  return { events, liveLoaded };
}

