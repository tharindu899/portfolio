import { useEffect, useMemo, useState } from 'react';
import CategoryFilter from '../components/CategoryFilter.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import ProjectTimeline from '../components/ProjectTimeline.jsx';
import SearchBox from '../components/SearchBox.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useGithubRepos } from '../hooks/useGithubRepos.js';

function pushPreviewState(project) {
  if (typeof window === 'undefined' || !project) return;
  const current = window.history.state || {};
  const next = { ...current, workGalleryPreview: true, projectId: project.id, projectName: project.name };
  if (current.workGalleryPreview) window.history.replaceState(next, '', window.location.href);
  else window.history.pushState(next, '', window.location.href);
}

export default function Projects() {
  const { projects, loading, error } = useGithubRepos();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [previewProject, setPreviewProject] = useState(null);

  useEffect(() => {
    const pendingId = window.sessionStorage.getItem('pendingPreviewProjectId');
    if (!pendingId || !projects.length) return;
    window.sessionStorage.removeItem('pendingPreviewProjectId');
    const project = projects.find((item) => String(item.id) === pendingId);
    if (project) {
      pushPreviewState(project);
      setPreviewProject(project);
    }
  }, [projects]);

  useEffect(() => {
    const openFromHome = (event) => {
      const project = event.detail;
      if (!project) return;
      pushPreviewState(project);
      setPreviewProject(project);
    };
    window.addEventListener('open-project-preview', openFromHome);
    return () => window.removeEventListener('open-project-preview', openFromHome);
  }, []);

  useEffect(() => {
    const onPop = (event) => {
      if (!event.state?.workGalleryPreview) setPreviewProject(null);
      else setPreviewProject(projects.find((project) => project.id === event.state.projectId) || null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [projects]);

  const openPreview = (project) => {
    pushPreviewState(project);
    setPreviewProject(project);
  };

  const goBackFromPreview = () => {
    if (typeof window !== 'undefined' && window.history.state?.workGalleryPreview) {
      window.history.back();
      return;
    }
    setPreviewProject(null);
  };

  const counts = useMemo(() => {
    const result = { all: projects.length };
    projects.forEach((project) => {
      result[project.category] = (result[project.category] || 0) + 1;
    });
    return result;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
      const searchText = [project.title, project.name, project.language, project.shortNote, project.note, ...project.tags].join(' ').toLowerCase();
      return categoryMatch && (!needle || searchText.includes(needle));
    });
  }, [activeCategory, projects, search]);

  return (
    <>
      <div className="main main--projects" id="projects">
        <SectionHeader title="Projects" count={loading ? 'loading...' : `${filteredProjects.length} repos`} />
        {error && <p className="notice">{error}</p>}
        <div className="toolbar">
          <SearchBox value={search} onChange={setSearch} />
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} counts={counts} />
        </div>
        <ProjectTimeline projects={filteredProjects} onPreview={openPreview} showPinnedState />
      </div>
      <ProjectModal project={previewProject} onBack={goBackFromPreview} />
    </>
  );
}
