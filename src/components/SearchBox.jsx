import Icon from './icons/Icon.jsx';

export default function SearchBox({ value, onChange }) {
  return (
    <label className="search-box">
      <Icon name="search" size={15} />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search public work..." />
    </label>
  );
}
