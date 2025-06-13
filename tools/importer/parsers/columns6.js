/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <footer> element
  const footer = element.querySelector('footer');
  if (!footer) return;

  // Find the main grid containing the navigation and utility columns
  const grid = footer.querySelector('div[data-rg-n="Grid"]');
  if (!grid) return;
  const cols = Array.from(grid.children);

  // The AWS footer visually arranges the content in two rows of two columns each (per screenshot):
  // Row 1: [main nav links (4 nav columns)], [button + language selector]
  // Row 2: [legal/social], [copyright/extra back to top/etc]

  // For block demo purposes, we'll try to match the example's intent with two columns per row.
  // First column: all main navigation columns (Learn, Resources, Developers, Help)
  // Second column: everything else (Create AWS account, language select, etc)

  // --- First Row ---
  // Gather main nav columns (Learn, Resources, Developers, Help)
  // These are cols[1], cols[2], cols[3], cols[4] in this HTML structure
  // We'll group them in a container
  const navCols = document.createElement('div');
  [1,2,3,4].forEach(idx => { if (cols[idx]) navCols.appendChild(cols[idx]); });

  // Gather the 'Create an AWS account' button and language selector button (cols[0], cols[5])
  const callouts = document.createElement('div');
  if (cols[0]) callouts.appendChild(cols[0]);
  if (cols[5]) callouts.appendChild(cols[5]);

  // --- Second Row ---
  // Find the next row of utility columns after the main nav grid (these are siblings of main nav grid)
  // These are most likely to be social, copyright, legal, etc
  // We'll fetch the next two cols after the main nav grid
  let utilCols = [];
  let sibling = grid.nextElementSibling;
  while (sibling && utilCols.length < 2) {
    if (sibling.getAttribute && sibling.getAttribute('data-rg-n') === 'Col') {
      utilCols.push(sibling);
    }
    sibling = sibling.nextElementSibling;
  }
  // Defensive: if we don't find two cols, just use empty divs
  while (utilCols.length < 2) {
    utilCols.push(document.createElement('div'));
  }

  // Build the block table: header row, and then two content rows (2 columns each)
  const headerRow = ['Columns (columns6)'];
  const row1 = [navCols, callouts];
  const row2 = utilCols;

  const table = WebImporter.DOMUtils.createTable([headerRow, row1, row2], document);
  element.replaceWith(table);
}
