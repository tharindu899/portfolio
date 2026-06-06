import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './icons/Icon.jsx';
import IconButton from './IconButton.jsx';
import ReadmeViewer from './ReadmeViewer.jsx';
import { fetchProjectReadme } from '../utils/github.js';
import { formatNumber, languageClass, timeAgo } from '../utils/format.js';
import { siteConfig } from '../config/site.config.js';


function categoryLabel(id) {
  return siteConfig.categories.find((category) => category.id === id)?.label || id || 'Repo';
}

export default function ProjectModal({ project, onBack }) {
  const photos = useMemo(() => (project?.photos?.length ? project.photos : [project?.photo]).filter(Boolean), [project]);
  const [activePhoto, setActivePhoto] = useState('');
  const [readme, setReadme] = useState('');
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState('');

  useEffect(() => {
    if (!project) return undefined;
    setActivePhoto(photos[0] || project.photo);
    setReadme('');
    setReadmeError('');
    setReadmeLoading(true);
    document.body.classList.add('modal-open');

    let active = true;
    fetchProjectReadme(project)
      .then((content) => active && setReadme(content))
      .catch((error) => active && setReadmeError(error.message || 'Could not load README.'))
      .finally(() => active && setReadmeLoading(false));

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      active = false;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onBack, photos]);

  if (!project) return null;

  const modal = (
    <div className="repo-overlay open" role="presentation">
      <section className="repo-drawer repo-drawer--page open" role="dialog" aria-modal="true" aria-label={`${project.title} preview`}>

        <header className="drawer-header drawer-header--page">
          <button className="drawer-back" type="button" onClick={onBack} aria-label="Go back">
            <Icon name="back" size={18} />
            <span>Back</span>
          </button>
          <div className="drawer-meta drawer-meta--preview">
            <div className="drawer-name">{project.title}</div>
            <div className="drawer-type">{categoryLabel(project.category)} · {project.language || 'Repo'} · {project.status}</div>
          </div>
          <IconButton href={project.repoUrl} icon="github" label="Open GitHub repository" variant="solid" />
          {project.homepage && <IconButton href={project.homepage} icon="external" label="Open live website" variant="solid" />}
        </header>

        <div className="drawer-stats">
          <span className="drawer-stat"><Icon name="star" size={13} /> {formatNumber(project.stars)}</span>
          <span className="drawer-stat"><Icon name="fork" size={13} /> {formatNumber(project.forks)}</span>
          <span className={`drawer-stat ${languageClass(project.language)}`}>{project.language || 'Repo'}</span>
          <span className="drawer-stat">{timeAgo(project.updatedAt)}</span>
        </div>

        <div className="drawer-body drawer-body--page">
          <aside className="drawer-side">
            <div className="drawer-media">
              <img src={activePhoto || project.photo} alt={`${project.title} preview`} onError={(event) => { event.currentTarget.src = 'images/projects/project-placeholder.svg'; }} />
            </div>
            {photos.length > 1 && (
              <div className="photo-strip">
                {photos.map((photo) => (
                  <button key={photo} type="button" className={`photo-thumb ${photo === activePhoto ? 'active' : ''}`} onClick={() => setActivePhoto(photo)}>
                    <img src={photo} alt="Project screenshot" />
                  </button>
                ))}
              </div>
            )}
            <div className="drawer-note">
              <p>{project.note || project.shortNote || project.description}</p>
              <div className="tl-tags">
                {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
            </div>
          </aside>

          <main className="drawer-readme">
            <ReadmeViewer markdown={readme} loading={readmeLoading} error={readmeError} repoUrl={project.repoUrl} project={project} />
          </main>
        </div>
      </section>
    </div>
  );

  return createPortal(modal, document.body);
}
