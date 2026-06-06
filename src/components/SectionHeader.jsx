export default function SectionHeader({ title, count }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {count !== undefined && <span className="section-count">{count}</span>}
    </div>
  );
}
