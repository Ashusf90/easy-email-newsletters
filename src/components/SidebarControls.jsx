import { SAFE_FONTS } from '../data/fonts.js';

export default function SidebarControls({
  selectedCell,
  imageUrl,
  setImageUrl,
  buttonText,
  setButtonText,
  buttonUrl,
  setButtonUrl,
  onFieldChange,
  onApplyImage,
  onImageUpload,
  onRemoveImage,
  onInsertButton,
  onBold,
  onItalic,
  status,
}) {
  return (
    <section className="control-panel">
      <h2>Selected Cell</h2>
      <p className="control-help">
        {selectedCell
          ? `Selected cell: ${selectedCell.id} (${selectedCell.type})`
          : 'Click a cell in the preview to edit it.'}
      </p>

      <div className="field-group">
        <label>Font Family</label>
        <select
          value={selectedCell?.fontFamily || SAFE_FONTS[0].value}
          onChange={(e) => onFieldChange({ fontFamily: e.target.value })}
          disabled={!selectedCell}
        >
          {SAFE_FONTS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div className="two-col">
        <div className="field-group">
          <label>Font Size</label>
          <input
            type="number"
            min="10"
            max="48"
            value={selectedCell?.fontSize || 16}
            onChange={(e) => onFieldChange({ fontSize: Number(e.target.value) || 16 })}
            disabled={!selectedCell}
          />
        </div>

        <div className="field-group">
          <label>Text Color</label>
          <input
            type="color"
            value={selectedCell?.color || '#222222'}
            onChange={(e) => onFieldChange({ color: e.target.value })}
            disabled={!selectedCell}
          />
        </div>
      </div>

      <div className="two-col">
        <div className="field-group">
          <label>Background</label>
          <input
            type="color"
            value={selectedCell?.backgroundColor || '#ffffff'}
            onChange={(e) => onFieldChange({ backgroundColor: e.target.value })}
            disabled={!selectedCell}
          />
        </div>

        <div className="field-group">
          <label>Alignment</label>
          <select
            value={selectedCell?.textAlign || 'left'}
            onChange={(e) => onFieldChange({ textAlign: e.target.value })}
            disabled={!selectedCell}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>

      <div className="two-col button-row">
        <button type="button" onClick={onBold} disabled={!selectedCell}>
          Bold
        </button>
        <button type="button" onClick={onItalic} disabled={!selectedCell}>
          Italic
        </button>
      </div>

      <div className="section-divider" />

      <h3>Images</h3>

      <div className="field-group">
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          disabled={!selectedCell}
        />
      </div>

      <div className="field-group">
        <label>Image URL</label>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={!selectedCell}
        />
      </div>

      <div className="two-col button-row">
        <button type="button" onClick={onApplyImage} disabled={!selectedCell}>
          Insert / Replace Image
        </button>
        <button type="button" onClick={onRemoveImage} disabled={!selectedCell}>
          Remove Image
        </button>
      </div>

      <div className="section-divider" />

      <h3>Button CTA</h3>

      <div className="field-group">
        <label>Button Text</label>
        <input
          type="text"
          placeholder="Read More"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          disabled={!selectedCell}
        />
      </div>

      <div className="field-group">
        <label>Button Link</label>
        <input
          type="url"
          placeholder="https://example.com"
          value={buttonUrl}
          onChange={(e) => setButtonUrl(e.target.value)}
          disabled={!selectedCell}
        />
      </div>

      <div className="button-row single">
        <button type="button" onClick={onInsertButton} disabled={!selectedCell}>
          Add Button
        </button>
      </div>

      <p className="status-text">{status}</p>
    </section>
  );
}