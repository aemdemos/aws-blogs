/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid containing the three promo boxes near the bottom of the blog post
  const grid = element.querySelector('.lb-xb-grid.lb-row-max-large.lb-xb-equal-height.lb-snap.lb-xb-justify-center.lb-tiny-xb-1.lb-small-xb-3');
  if (!grid) return;

  // Find all immediate column divs inside the grid
  const boxes = Array.from(grid.children)
    .map(col => {
      // Each column contains a .lb-box.lb-has-link (the tile)
      const box = col.querySelector('.lb-box.lb-has-link');
      return box || col;
    })
    .filter(Boolean);

  // Only create table if we have at least one column
  if (boxes.length === 0) return;

  // The Columns block header (use the exact header name from the instructions)
  const headerRow = ['Columns (columns35)'];

  // Second row: one cell per column, each referencing the entire tile (box)
  const cells = [headerRow, boxes];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the grid container (not the entire element, to avoid removing unrelated content)
  grid.replaceWith(table);
}
