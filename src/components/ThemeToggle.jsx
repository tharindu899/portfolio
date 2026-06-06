import Icon from './icons/Icon.jsx';

export default function ThemeToggle({ theme, onToggle }) {
  const isDay = theme === 'day';
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={isDay ? 'Switch to dark theme' : 'Switch to day theme'}>
      <Icon name={isDay ? 'moon' : 'sun'} size={16} />
    </button>
  );
}
