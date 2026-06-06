import Hero from '../components/Hero.jsx';
import ProfileSidebar from '../components/ProfileSidebar.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import StatStrip from '../components/StatStrip.jsx';
import WorkTiles from '../components/WorkTiles.jsx';
import ProjectTimeline from '../components/ProjectTimeline.jsx';
import { useGithubRepos } from '../hooks/useGithubRepos.js';
import { siteConfig } from '../config/site.config.js';

function openProjectPreview(project) {
  window.sessionStorage.setItem('pendingPreviewProjectId', String(project.id));
  window.location.hash = '/projects';
}

export default function Home() {
  const { projects, stats } = useGithubRepos();

  // Home shows only pinned/featured repos, capped to 3 by default.
  // The Projects page still keeps every repo available and unchanged.
  const pinnedLimit = siteConfig.ui.pinnedProjectLimit || 3;
  const displayProjects = projects.filter((p) => p.featured).slice(0, pinnedLimit);

  return (
    <>
      <Hero stats={stats} />
      <div className="divider"><hr className="divider-line" /></div>
      <StatStrip stats={stats} />
      <div className="main main--home">
        <ProfileSidebar />
        <div className="home-content">
          <SectionHeader title="My Work" count="focus areas" />
          <WorkTiles />
          <SectionHeader title="Featured" count={`${displayProjects.length} repos`} />
          <ProjectTimeline projects={displayProjects} onPreview={openProjectPreview} showPinnedState />
        </div>
      </div>
      <footer>
        <span className="footer-txt">{siteConfig.profile.name} · {siteConfig.profile.location}</span>
        <span className="footer-txt">Built with React + Vite · Deployed on GitHub Pages</span>
      </footer>
    </>
  );
}
