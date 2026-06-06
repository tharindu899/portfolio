import Icon from './icons/Icon.jsx';
import { formatNumber, languageClass, timeAgo } from '../utils/format.js';
import { projectYearRange } from '../utils/github.js';
import { siteConfig } from '../config/site.config.js';


function categoryLabel(id) {
  return siteConfig.categories.find((category) => category.id === id)?.label || id || 'Repo';
}

export default function ProjectTimeline({ projects, onPreview, showPinnedState = false }) {
  const allowPinnedState = showPinnedState === true;
  if (!projects.length) {
    return <div className="empty-state"><strong>No projects found</strong><span>Try another category or search word.</span></div>;
  }

  const yearLabel = projectYearRange(projects);

  return (
    <div className={`timeline ${allowPinnedState ? 'timeline--pinned' : 'timeline--plain'}`.trim()}>
      <div className="tl-year">{yearLabel}</div>
      <div className="tl-items">
        {projects.map((project, index) => {
          const showPinnedBadge = allowPinnedState && project.featured;

          return (
          <article className="tl-item" key={project.id} style={{ '--delay': `${Math.min(index, 8) * 45}ms` }}>
            <span className="tl-dot" />
            <button className="tl-card" type="button" onClick={() => onPreview(project)}>
              <div className="tl-card-top">
                <span className={`tl-icon ${showPinnedBadge ? 'active' : ''}`}><Icon name={project.icon} size={17} /></span>
                <span className="tl-head">
                  <strong className="tl-name">{project.title}</strong>
                  <small className="tl-type">{categoryLabel(project.category)} · {project.language || 'Repo'}</small>
                </span>
                {showPinnedBadge && <span className="tl-badge">Pinned</span>}
              </div>
              <p className="tl-desc">{project.shortNote || project.description}</p>
              <div className="tl-tags">
                {project.tags.slice(0, 5).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <div className="tl-footer">
                <span className="tl-stat"><Icon name="star" size={12} /> {formatNumber(project.stars)}</span>
                <span className="tl-stat"><Icon name="fork" size={12} /> {formatNumber(project.forks)}</span>
                <span className={`tl-stat ${languageClass(project.language)}`}>{project.language || 'Repo'}</span>
                <span className="tl-link">Preview <Icon name="external" size={11} /></span>
                <span className="tl-updated">{timeAgo(project.updatedAt)}</span>
              </div>
            </button>
          </article>
          );
        })}
      </div>
    </div>
  );
}
