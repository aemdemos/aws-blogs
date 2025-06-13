/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid of cards
  const grid = element.querySelector('.lb-xb-grid.lb-row-max-large.lb-xb-equal-height');
  if (!grid) return;
  // Each card is a direct child .lb-xbcol
  const cardCols = Array.from(grid.querySelectorAll(':scope > .lb-xbcol'));
  if (!cardCols.length) return;
  const rows = [['Cards (cards22)']];
  cardCols.forEach((col) => {
    const cardBox = col.querySelector('.lb-border-p.data-attr-wrapper.lb-box.lb-has-link');
    if (!cardBox) return;
    const link = cardBox.querySelector('a');
    if (!link) return;
    // Get the image (first img under the link)
    const img = link.querySelector('img');
    if (!img) return;
    if (img.src && img.src.startsWith('//')) img.src = 'https:' + img.src;
    // Get the card title
    const title = Array.from(link.querySelectorAll('.lb-txt-bold.lb-txt-squid')).find(e => !e.classList.contains('lb-txt-blue-600'));
    // Get the description
    const desc = Array.from(link.querySelectorAll('.lb-txt-none.lb-txt-squid')).find(e => !e.classList.contains('lb-txt-blue-600'));
    // Get CTA (Learn more)
    const cta = Array.from(link.querySelectorAll('.lb-txt-bold.lb-txt-blue-600')).find(e => /learn more/i.test(e.textContent));
    // Assemble text cell
    const textCell = [];
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCell.push(strong);
    }
    if (desc) {
      if (textCell.length) textCell.push(document.createElement('br'));
      const descDiv = document.createElement('div');
      descDiv.textContent = desc.textContent.trim();
      textCell.push(descDiv);
    }
    if (cta) {
      textCell.push(document.createElement('br'));
      const ctaDiv = document.createElement('div');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = cta.textContent.replace(/\s*»?$/, '').trim();
      ctaDiv.appendChild(a);
      textCell.push(ctaDiv);
    }
    if (img && textCell.length) {
      rows.push([img, textCell]);
    }
  });
  // Always create table, even if only header (to match instructions)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
