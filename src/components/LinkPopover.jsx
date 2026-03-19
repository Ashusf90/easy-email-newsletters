import { useMemo } from "react";

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

  //  URL validation
  const isValid = useMemo(() => {
    if (!value) return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, [value]);

  const showError = value && !isValid;

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
        padding: '10px',
        minWidth: '320px',
      }}
    >
      {/* INPUT ROW */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste link URL"
          style={{
            width: '100%',
            padding: '8px 10px',
            border: `1px solid ${showError ? 'red' : '#cfcfcf'}`,
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
          }}
        />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onApply}
          disabled={!isValid}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #2563eb',
            background: isValid ? '#2563eb' : '#9ca3af',
            color: '#ffffff',
            cursor: isValid ? 'pointer' : 'not-allowed',
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

      {/* ERROR */}
      {showError && (
        <p style={{ color: 'red', fontSize: '12px', marginTop: '6px' }}>
          Invalid URL
        </p>
      )}

      {/* PREVIEW */}
      {value && isValid && (
        <div
          style={{
            marginTop: '10px',
            padding: '8px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: '#f9fafb',
            fontSize: '13px',
          }}
        >
          <div style={{ color: '#6b7280', marginBottom: '4px' }}>
            Preview
          </div>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2563eb', wordBreak: 'break-all' }}
          >
            {value}
          </a>
        </div>
      )}
    </div>
  );
}
