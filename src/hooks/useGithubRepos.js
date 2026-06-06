import { useCallback, useEffect, useMemo, useState } from 'react';
import { siteConfig } from '../config/site.config.js';
import { fallbackProjects, fetchPublicRepos, summarizeProjects } from '../utils/github.js';

export function useGithubRepos() {
  const [projects, setProjects] = useState(() => fallbackProjects());
  const [loading, setLoading] = useState(Boolean(siteConfig.ui.enableRemoteRepoFetch));
  const [error, setError] = useState('');

  const load = useCallback(() => {
    if (!siteConfig.ui.enableRemoteRepoFetch) {
      setProjects(fallbackProjects());
      setLoading(false);
      setError('');
      return undefined;
    }

    setLoading(true);
    setError('');
    let mounted = true;

    fetchPublicRepos()
      .then((remoteProjects) => {
        if (!mounted) return;
        const nextProjects = remoteProjects.length ? remoteProjects : fallbackProjects();
        setProjects(nextProjects);
        setError('');
      })
      .catch((err) => {
        if (!mounted) return;
        // Keep the site usable. Do not show the old scary fallback text on the page.
        // Full error is still visible in DevTools for debugging.
        console.warn('GitHub repo loader failed:', err);
        setProjects(fallbackProjects());
        setError('');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, [load]);

  const stats = useMemo(() => summarizeProjects(projects), [projects]);
  return { projects, stats, loading, error, refetch: load };
}
