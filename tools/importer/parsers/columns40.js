/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the three-column promo grid inside en_blog_post_comments mbox
  const mboxes = element.querySelectorAll('.js-mbox[data-mbox="en_blog_post_comments"]');
  let promoGrid = null;
  for (const mbox of mboxes) {
    const grid = mbox.querySelector('.lb-xb-grid');
    if (grid && grid.querySelectorAll(':scope > .lb-xbcol').length === 3) {
      promoGrid = grid;
      break;
    }
  }
  if (!promoGrid) return;

  // Extract the three promo columns (each column features a promo card with image, title, desc, and CTA)
  const promoCols = Array.from(promoGrid.querySelectorAll(':scope > .lb-xbcol'));
  // For each, grab the full promo anchor (with image and text inside)
  const colCells = promoCols.map(col => {
    const box = col.querySelector('.lb-box.lb-has-link');
    if (box) {
      const anchor = box.querySelector('a');
      return anchor || '';
    }
    return '';
  });

  // Ensure header row as in example: three columns, first cell label, next two empty
  const headerRow = ['Columns (columns40)', '', ''];
  const rows = [colCells];
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  // Replace the promo grid with the block table
  promoGrid.replaceWith(table);
}
