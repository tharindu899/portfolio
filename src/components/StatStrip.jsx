import Icon from './icons/Icon.jsx';
import { formatNumber } from '../utils/format.js';

const entries = [
  ['code', 'Projects', 'projects'],
  ['star', 'Stars', 'stars'],
  ['fork', 'Forks', 'forks'],
  ['grid', 'Languages', 'languages']
];

export default function StatStrip({ stats }) {
  return (
    <section className="stat-strip">
      {entries.map(([icon, label, key]) => (
        <div className="stat-pill" key={key}>
          <Icon name={icon} size={16} />
          <strong>{formatNumber(stats[key])}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
