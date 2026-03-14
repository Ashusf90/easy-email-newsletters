import EmailCell from "./EmailCell";

function NestedTableCell({
  cell,
  rowMinHeight,
  selectedCellId,
  onSelectCell,
  onCellHtmlChange,
}) {
  return (
    <td
      width={cell.width}
      style={{
        width: cell.width,
        minHeight: `${rowMinHeight}px`,
        padding: `${cell.padding}px`,
        background: cell.backgroundColor,
        verticalAlign: "top",
        border: "1px solid #cfcfcf",
      }}
    >
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        border="0"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
          background: "#ffffff",
        }}
      >
        <tbody>
          {cell.nestedTable.rows.map((nestedRow) => (
            <tr key={nestedRow.id}>
              {nestedRow.columns.map((nestedCell) => (
                <EmailCell
                  key={nestedCell.id}
                  cell={nestedCell}
                  rowMinHeight={nestedRow.minHeight}
                  isSelected={selectedCellId === nestedCell.id}
                  onSelect={onSelectCell}
                  onChange={onCellHtmlChange}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  );
}

export default function NewsletterPreview({
  template,
  selectedCellId,
  onSelectCell,
  onCellHtmlChange,
  onSelectionChange,
}) {
  return (
    <div
      className="mx-auto w-fit max-w-full overflow-auto rounded-xl bg-white shadow-xl"
      onMouseUp={onSelectionChange}
      onKeyUp={onSelectionChange}
    >
      <table
        width={template.width}
        cellPadding="0"
        cellSpacing="0"
        border="0"
        style={{
          width: `${template.width}px`,
          maxWidth: "100%",
          margin: "0 auto",
          borderCollapse: "collapse",
          tableLayout: "fixed",
          background: "#ffffff",
        }}
      >
        <tbody>
          {template.rows.map((row) => (
            <tr key={row.id}>
              {row.columns.map((cell) =>
                cell.type === "nested" ? (
                  <NestedTableCell
                    key={cell.id}
                    cell={cell}
                    rowMinHeight={row.minHeight}
                    selectedCellId={selectedCellId}
                    onSelectCell={onSelectCell}
                    onCellHtmlChange={onCellHtmlChange}
                  />
                ) : (
                  <EmailCell
                    key={cell.id}
                    cell={cell}
                    rowMinHeight={row.minHeight}
                    isSelected={selectedCellId === cell.id}
                    onSelect={onSelectCell}
                    onChange={onCellHtmlChange}
                  />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}