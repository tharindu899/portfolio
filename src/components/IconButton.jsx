import Icon from './icons/Icon.jsx';

export default function IconButton({ href, icon, label, onClick, variant = 'ghost' }) {
  const className = variant === 'solid' ? 'icon-button icon-button--solid' : 'icon-button';
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
        <Icon name={icon} size={18} />
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick} aria-label={label} title={label}>
      <Icon name={icon} size={18} />
    </button>
  );
}
