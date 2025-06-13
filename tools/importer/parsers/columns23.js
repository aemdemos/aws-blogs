/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of three promo cards at the bottom of the article
  // It's the first .lb-xb-grid.lb-row-max-large.lb-xb-equal-height.lb-snap in the main content area (not sidebar)
  // Defensive: find all .lb-xb-grid.lb-row-max-large.lb-xb-equal-height.lb-snap, select the one with three children that are .lb-xbcol
  const grids = element.querySelectorAll('.lb-xb-grid.lb-row-max-large.lb-xb-equal-height.lb-snap');
  let promoGrid = null;
  for (const grid of grids) {
    const cols = grid.querySelectorAll(':scope > .lb-xbcol');
    if (cols.length === 3) {
      promoGrid = grid;
      break;
    }
  }
  if (!promoGrid) return;

  // Each column contains a card box as first child
  const promoCols = Array.from(promoGrid.querySelectorAll(':scope > .lb-xbcol'));
  // Defensive: ensure that each col has a box
  const cards = promoCols.map(col => {
    // Find the card box
    const card = col.querySelector('.lb-border-p.data-attr-wrapper.lb-box.lb-has-link');
    return card || col;
  });
  // Defensive: we want exactly 3
  if (cards.length !== 3) return;

  // Build the table
  const headerRow = ['Columns (columns23)'];
  const contentRow = cards;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the promoGrid with the block table
  promoGrid.replaceWith(table);
}
