import { useEffect, useRef } from "react";

export default function EmailCell({
  cell,
  rowMinHeight,
  isSelected,
  onSelect,
  onChange,
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Only update DOM when not actively editing this field
    if (document.activeElement !== editorRef.current) {
      if (cell.type !== "image") {
        editorRef.current.innerHTML = cell.html || "";
      }
    }
  }, [cell.html, cell.type]);

  const commonStyle = {
    minHeight: `${rowMinHeight}px`,
    padding: `${cell.padding}px`,
    background: cell.backgroundColor,
    fontFamily: cell.fontFamily,
    fontSize: `${cell.fontSize}px`,
    color: cell.color,
    textAlign: cell.textAlign,
    lineHeight: 1.5,
  };

  if (cell.type === "image") {
    return (
      <td
        width={cell.width}
        style={{
          width: cell.width,
          minHeight: `${rowMinHeight}px`,
          padding: 0,
          background: cell.backgroundColor,
          verticalAlign: "top",
          border: "1px solid #cfcfcf",
        }}
      >
        <div
          onClick={() => onSelect(cell.id)}
          className={`relative w-full cursor-pointer ${
            isSelected ? "ring-4 ring-blue-600 ring-inset" : ""
          }`}
          style={commonStyle}
        >
          {cell.imageSrc ? (
            <img
              src={cell.imageSrc}
              alt=""
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          ) : (
            <div className="flex min-h-[120px] items-center justify-center text-center text-sm text-slate-500">
              Image placeholder
            </div>
          )}
        </div>
      </td>
    );
  }

  return (
    <td
      width={cell.width}
      style={{
        width: cell.width,
        minHeight: `${rowMinHeight}px`,
        padding: 0,
        background: cell.backgroundColor,
        verticalAlign: "top",
        border: "1px solid #cfcfcf",
      }}
    >
      <div
        ref={editorRef}
        data-cell-id={cell.id}
        contentEditable
        suppressContentEditableWarning
        onClick={() => onSelect(cell.id)}
        onFocus={() => onSelect(cell.id)}
        onBlur={(e) => onChange(cell.id, e.currentTarget.innerHTML)}
        className={`relative w-full outline-none ${
          isSelected
            ? "ring-4 ring-blue-600 ring-inset"
            : "focus:ring-4 focus:ring-slate-900 focus:ring-inset"
        }`}
        style={commonStyle}
      />
    </td>
  );
}