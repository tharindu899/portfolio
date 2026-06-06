import { siteConfig } from '../config/site.config.js';
import Icon from './icons/Icon.jsx';

export default function WorkTiles() {
  return (
    <section className="work-tile-grid">
      {siteConfig.home.workItems.slice(0, siteConfig.ui.workItemLimit || 3).map((item) => (
        <article className="work-tile" key={item.title}>
          <span className="work-tile__icon"><Icon name={item.icon} size={18} /></span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}
