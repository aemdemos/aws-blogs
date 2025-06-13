/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first .lb-xb-grid inside the element (the columns grid)
  const grid = element.querySelector('.lb-xb-grid');
  if (!grid) return;

  // Each column is a .lb-xbcol direct child of grid
  const columns = Array.from(grid.querySelectorAll(':scope > .lb-xbcol'));

  // If no columns found, do nothing
  if (columns.length === 0) return;

  // For each column, grab the inner promo box (the .lb-box or .data-attr-wrapper)
  // Reference the node directly (do not clone)
  const colCells = columns.map(col => {
    // Find the first child div which is the content wrapper
    const box = col.querySelector(':scope > .lb-box, :scope > .data-attr-wrapper');
    // If not found, use the column as fallback
    return box || col;
  });

  // Compose table: header row should have a single cell, second row has one cell per column
  const rows = [
    ['Columns (columns32)'],
    colCells
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the grid's wrapper (element) with the table
  element.replaceWith(table);
}
