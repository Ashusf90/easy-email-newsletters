function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderCellInner(cell) {
  if (cell.type === "image") {
    return cell.imageSrc
      ? `<img src="${escapeAttr(cell.imageSrc)}" alt="" style="display:block;width:100%;max-width:100%;height:auto;border:0;" />`
      : "&nbsp;";
  }

  if (cell.type === "nested" && cell.nestedTable?.rows) {
    return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;table-layout:fixed;">
${cell.nestedTable.rows
  .map(
    (nestedRow) => `
  <tr>
${nestedRow.columns
  .map(
    (nestedCell) => `
    <td width="${nestedCell.width}" valign="top" style="width:${nestedCell.width};vertical-align:top;padding:${nestedCell.padding}px;background:${nestedCell.backgroundColor};font-family:${nestedCell.fontFamily};font-size:${nestedCell.fontSize}px;color:${nestedCell.color};text-align:${nestedCell.textAlign};line-height:1.5;border:1px solid #cfcfcf;min-height:${nestedRow.minHeight}px;">${
      nestedCell.type === "image"
        ? nestedCell.imageSrc
          ? `<img src="${escapeAttr(nestedCell.imageSrc)}" alt="" style="display:block;width:100%;max-width:100%;height:auto;border:0;" />`
          : "&nbsp;"
        : nestedCell.html || "&nbsp;"
    }</td>`
  )
  .join("")}
  </tr>`
  )
  .join("")}
</table>`.trim();
  }

  return cell.html || "&nbsp;";
}

export function buildEmailHTML(template) {
  return `
<table width="${template.width}" cellpadding="0" cellspacing="0" border="0" style="width:${template.width}px;max-width:100%;margin:0 auto;border-collapse:collapse;table-layout:fixed;background:#ffffff;">
${template.rows
  .map(
    (row) => `  <tr>
${row.columns
  .map(
    (cell) => `    <td width="${cell.width}" valign="top" style="width:${cell.width};vertical-align:top;padding:${cell.padding}px;background:${cell.backgroundColor};font-family:${cell.fontFamily || "Arial, Helvetica, sans-serif"};font-size:${cell.fontSize || 16}px;color:${cell.color || "#222222"};text-align:${cell.textAlign || "left"};line-height:1.5;border:1px solid #cfcfcf;min-height:${row.minHeight}px;">${renderCellInner(cell)}</td>`
  )
  .join("\n")}
  </tr>`
  )
  .join("\n")}
</table>`.trim();
}