export default function TemplateCard({ template, active, onClick }) {
  return (
    <button type="button" className={`template-card ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="template-thumb">{template.thumb}</div>
      <div><strong>{template.name}</strong></div>
      <div className="template-meta">{template.description}</div>
    </button>
  );
}
