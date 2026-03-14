export default function LinkPopover({
  visible,
  x,
  y,
  value,
  onChange,
  onApply,
  onCancel,
}) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -100%)',
        zIndex: 1000,
        background: '#ffffff',
        border: '1px solid #cfcfcf',
        borderRadius: '10px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        padding: '8px',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste link URL"
          style={{
            width: '260px',
            padding: '8px 10px',
            border: '1px solid #cfcfcf',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onApply}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #2563eb',
            background: '#2563eb',
            color: '#ffffff',
            cursor: 'pointer',
          }}
        >
          Apply
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onCancel}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #cfcfcf',
            background: '#ffffff',
            color: '#111827',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}