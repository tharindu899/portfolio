import { siteConfig } from '../config/site.config.js';
import Icon from './icons/Icon.jsx';

export default function CategoryFilter({ active, onChange, counts }) {
  return (
    <div className="category-scroll" aria-label="Project categories">
      {siteConfig.categories.map((category) => (
        <button key={category.id} type="button" className={`category-pill ${active === category.id ? 'active' : ''}`} onClick={() => onChange(category.id)}>
          <Icon name={category.icon} size={13} />
          <span>{category.label}</span>
          <small>{counts[category.id] || 0}</small>
        </button>
      ))}
    </div>
  );
}
