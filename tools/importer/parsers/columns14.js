/* global WebImporter */
export default function parse(element, { document }) {
  // Find the promo mbox block
  const promoMbox = element.querySelector('.js-mbox[data-mbox="en_blog_post_comments"]');
  if (!promoMbox) return;
  const colsGrid = promoMbox.querySelector('.lb-xb-grid');
  if (!colsGrid) return;
  const colDivs = Array.from(colsGrid.querySelectorAll(':scope > .lb-xbcol'));
  if (colDivs.length === 0) return;
  // Gather the card <a> elements from each column
  const promoLinks = colDivs.map(col => {
    const cardLink = col.querySelector('a');
    return cardLink || '';
  });
  // Place all promos as an array in one cell (one column)
  const header = ['Columns (columns14)'];
  const row = [promoLinks];
  const table = WebImporter.DOMUtils.createTable([header, row], document);
  promoMbox.replaceWith(table);
}
