import AppButton from './AppButton.jsx';

export default function TopToolbar({ onCopyForGmail, onCopySource, onReset, onClearSelection }) {
  return (
    <div className="top-toolbar">
      <div className="toolbar-row">
        <AppButton variant="primary" onClick={onCopyForGmail}>Copy for Gmail</AppButton>
        <AppButton variant="blue" onClick={onCopySource}>Copy HTML Source</AppButton>
        <AppButton variant="soft" onClick={onReset}>Reset Template</AppButton>
        <div className="toolbar-spacer" />
        <AppButton onClick={onClearSelection}>Clear Selection</AppButton>
      </div>
    </div>
  );
}
