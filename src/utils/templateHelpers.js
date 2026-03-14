export function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

export function getCellById(template, cellId) {
  if (!template || !cellId) return null;

  for (const row of template.rows || []) {
    for (const cell of row.columns || []) {
      if (cell.id === cellId) return cell;

      if (cell.type === "nested" && cell.nestedTable?.rows) {
        for (const nestedRow of cell.nestedTable.rows) {
          for (const nestedCell of nestedRow.columns || []) {
            if (nestedCell.id === cellId) return nestedCell;
          }
        }
      }
    }
  }

  return null;
}