import { useMemo, useRef, useState } from 'react';
import SidebarControls from './components/SidebarControls.jsx';
import TemplatePicker from './components/TemplatePicker.jsx';
import TopToolbar from './components/TopToolbar.jsx';
import NewsletterPreview from './components/NewsletterPreview.jsx';
import LinkPopover from './components/LinkPopover.jsx';
import { TEMPLATE_DEFINITIONS } from './data/templates.jsx';
import { buildEmailHTML } from './utils/exportHtml.js';
import { clone, getCellById } from './utils/templateHelpers.js';

export default function App() {
  const [activeTemplateId, setActiveTemplateId] = useState('classic-newsletter');
  const [template, setTemplate] = useState(() => clone(TEMPLATE_DEFINITIONS[0]));
  const [selectedCellId, setSelectedCellId] = useState(null);
  const [status, setStatus] = useState('Loaded template: Classic Newsletter');
  const [imageUrl, setImageUrl] = useState('');
  const [buttonText, setButtonText] = useState('Read More');
  const [buttonUrl, setButtonUrl] = useState('');

  const [linkPopover, setLinkPopover] = useState({
    visible: false,
    x: 0,
    y: 0,
    url: '',
  });

  const savedRangeRef = useRef(null);
  const savedCellIdRef = useRef(null);

  const selectedCell = useMemo(() => getCellById(template, selectedCellId), [template, selectedCellId]);

  function loadTemplate(templateId) {
    const found = TEMPLATE_DEFINITIONS.find((item) => item.id === templateId);
    if (!found) return;
    setActiveTemplateId(templateId);
    setTemplate(clone(found));
    setSelectedCellId(null);
    setImageUrl('');
    setButtonUrl('');
    hideLinkPopover();
    setStatus(`Loaded template: ${found.name}`);
  }

  function updateSelectedCell(updates) {
    if (!selectedCellId) {
      setStatus('Select a cell first.');
      return;
    }

    setTemplate((prev) => {
      const next = clone(prev);
      const cell = getCellById(next, selectedCellId);
      if (!cell) return prev;
      Object.assign(cell, updates);
      return next;
    });
  }

  function updateCellHtml(cellId, html) {
    setTemplate((prev) => {
      const next = clone(prev);
      const cell = getCellById(next, cellId);
      if (!cell) return prev;
      cell.html = html;
      return next;
    });
  }

  function handleApplyImage() {
    if (!selectedCellId) {
      setStatus('Select a cell first.');
      return;
    }
    if (!imageUrl.trim()) {
      setStatus('Paste an image URL first.');
      return;
    }
    updateSelectedCell({ type: 'image', imageSrc: imageUrl.trim() });
    setStatus('Image inserted into selected cell.');
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!selectedCellId) {
      setStatus('Select a cell first.');
      event.target.value = '';
      return;
    }

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatus('Please choose an image file.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setImageUrl(result);
      updateSelectedCell({
        type: 'image',
        imageSrc: result,
      });
      setStatus(`Uploaded image: ${file.name}`);
    };

    reader.onerror = () => {
      setStatus('Image upload failed.');
    };

    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function handleRemoveImage() {
    if (!selectedCellId) {
      setStatus('Select a cell first.');
      return;
    }
    updateSelectedCell({
      type: 'text',
      imageSrc: '',
      html: selectedCell?.html || '<p style="margin:0;line-height:1.6;">Add your text here.</p>',
    });
    setStatus('Image removed.');
  }

  function applyInlineCommand(command) {
    document.execCommand(command);
    const active = document.activeElement;
    if (active?.isContentEditable && active.dataset?.cellId) {
      updateCellHtml(active.dataset.cellId, active.innerHTML);
    }
  }

  function hideLinkPopover() {
    savedRangeRef.current = null;
    savedCellIdRef.current = null;
    setLinkPopover({
      visible: false,
      x: 0,
      y: 0,
      url: '',
    });
  }

  function normalizeUrl(url) {
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }

  function getEditableFromNode(node) {
    if (!node) return null;
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return element?.closest?.('[data-cell-id][contenteditable="true"]') || null;
  }

  function handleSelectionChange() {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      hideLinkPopover();
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const editable = getEditableFromNode(selection.anchorNode);

    if (!editable) {
      hideLinkPopover();
      return;
    }

    const selectedText = selection.toString().trim();
    if (!selectedText) {
      hideLinkPopover();
      return;
    }

    savedRangeRef.current = range.cloneRange();
    savedCellIdRef.current = editable.dataset.cellId;
    setSelectedCellId(editable.dataset.cellId);

    const anchor = getEditableFromNode(selection.anchorNode)?.querySelector?.('a');
    const existingHref =
      selection.anchorNode?.parentElement?.closest?.('a')?.getAttribute('href') || '';

    setLinkPopover({
      visible: true,
      x: rect.left + rect.width / 2,
      y: Math.max(40, rect.top - 12),
      url: existingHref || '',
    });
  }

  function restoreSavedRange() {
    if (!savedRangeRef.current) return false;
    const selection = window.getSelection();
    if (!selection) return false;
    selection.removeAllRanges();
    selection.addRange(savedRangeRef.current);
    return true;
  }

  function handleApplyLink() {
    const cellId = savedCellIdRef.current || selectedCellId;

    if (!cellId) {
      setStatus('Select and highlight text first.');
      return;
    }

    const url = normalizeUrl(linkPopover.url);
    if (!url) {
      setStatus('Paste a valid URL first.');
      return;
    }

    const editor = document.querySelector(`[data-cell-id="${cellId}"]`);
    if (!editor) {
      setStatus('Could not find the selected text cell.');
      return;
    }

    editor.focus();

    const restored = restoreSavedRange();
    if (!restored) {
      setStatus('Could not restore selected text.');
      return;
    }

    document.execCommand('createLink', false, url);

    // Ensure links open in a new tab/window when exported or clicked.
    const selection = window.getSelection();
    const linkEl =
      selection?.anchorNode?.parentElement?.closest?.('a') ||
      selection?.focusNode?.parentElement?.closest?.('a');

    if (linkEl) {
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('rel', 'noopener noreferrer');
    }

    updateCellHtml(cellId, editor.innerHTML);
    hideLinkPopover();
    setStatus('Link added.');
  }

  function handleInsertButton() {
    if (!selectedCellId) {
      setStatus('Select a text cell first.');
      return;
    }

    const cell = getCellById(template, selectedCellId);
    if (!cell) {
      setStatus('Select a cell first.');
      return;
    }

    const url = normalizeUrl(buttonUrl);
    if (!url) {
      setStatus('Enter a valid button URL.');
      return;
    }

    const label = (buttonText || 'Read More').trim();

    const buttonHtml =
      `<p style="margin:16px 0 0;">` +
      `<a href="${url}" target="_blank" rel="noopener noreferrer" ` +
      `style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;` +
      `padding:12px 18px;border-radius:6px;font-family:Arial, Helvetica, sans-serif;` +
      `font-size:14px;line-height:1;">${label}</a></p>`;

    if (cell.type !== 'text') {
      updateSelectedCell({
        type: 'text',
        imageSrc: '',
        html: buttonHtml,
      });
    } else {
      updateCellHtml(selectedCellId, `${cell.html || ''}${buttonHtml}`);
    }

    setStatus('Button added.');
  }

  async function copySource() {
    await navigator.clipboard.writeText(buildEmailHTML(template));
    setStatus('Copied HTML source.');
  }

  async function copyForGmail() {
    const html = buildEmailHTML(template);

    if (navigator.clipboard && window.ClipboardItem) {
      const htmlBlob = new Blob([html], { type: 'text/html' });
      const textBlob = new Blob([html.replace(/<[^>]+>/g, ' ')], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        }),
      ]);
      setStatus('Copied Gmail-ready HTML to clipboard. Paste into Gmail compose.');
      return;
    }

    await navigator.clipboard.writeText(html);
    setStatus('Clipboard HTML not supported here, so the raw HTML source was copied instead.');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <h1>Easy Email Newsletters</h1>
          <p>
            Build table-based newsletter layouts you can copy and paste into Gmail. Templates include baked-in padding,
            row heights, and column widths.
          </p>
        </div>

        <TemplatePicker
          templates={TEMPLATE_DEFINITIONS}
          activeTemplateId={activeTemplateId}
          onSelect={loadTemplate}
        />

        <SidebarControls
          selectedCell={selectedCell}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          buttonText={buttonText}
          setButtonText={setButtonText}
          buttonUrl={buttonUrl}
          setButtonUrl={setButtonUrl}
          onFieldChange={updateSelectedCell}
          onApplyImage={handleApplyImage}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          onInsertButton={handleInsertButton}
          onBold={() => applyInlineCommand('bold')}
          onItalic={() => applyInlineCommand('italic')}
          status={status}
        />
      </aside>

      <main className="editor-shell">
        <TopToolbar
          onCopyForGmail={copyForGmail}
          onCopySource={copySource}
          onReset={() => loadTemplate(activeTemplateId)}
          onClearSelection={() => {
            setSelectedCellId(null);
            setImageUrl('');
            hideLinkPopover();
            setStatus('Selection cleared.');
          }}
        />

        <div className="workspace">
          <div className="stage">
            <NewsletterPreview
              template={template}
              selectedCellId={selectedCellId}
              onSelectCell={(cellId) => {
                setSelectedCellId(cellId);
                const cell = getCellById(template, cellId);
                setImageUrl(cell?.imageSrc || '');
              }}
              onCellHtmlChange={updateCellHtml}
              onSelectionChange={handleSelectionChange}
            />
            <p className="helper-text">
              Click inside any cell to edit text, or select a cell and use the controls on the left.
            </p>
          </div>
        </div>
      </main>

      <LinkPopover
        visible={linkPopover.visible}
        x={linkPopover.x}
        y={linkPopover.y}
        value={linkPopover.url}
        onChange={(value) => setLinkPopover((prev) => ({ ...prev, url: value }))}
        onApply={handleApplyLink}
        onCancel={hideLinkPopover}
      />
    </div>
  );
}