import Panel from './Panel.jsx';
import TemplateCard from './TemplateCard.jsx';

export default function TemplatePicker({ templates, activeTemplateId, onSelect }) {
  return (
    <Panel title="Templates">
      <div className="template-grid">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            active={template.id === activeTemplateId}
            onClick={() => onSelect(template.id)}
          />
        ))}
      </div>
    </Panel>
  );
}
