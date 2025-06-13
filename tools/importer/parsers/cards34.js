/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly matching the example
  const headerRow = ['Cards (cards34)'];

  // Find the grid container holding the cards
  const grid = element.querySelector('.lb-xb-grid');
  if (!grid) return;

  // Each card is a direct child with class lb-xbcol
  const cards = Array.from(grid.children).filter(c => c.classList.contains('lb-xbcol'));

  const rows = [headerRow];

  cards.forEach(card => {
    // Image (first cell)
    let imgCell = '';
    const img = card.querySelector('figure img');
    if (img) {
      imgCell = img;
    }

    // Text content (second cell)
    const textCell = [];
    // Title (h4 with link)
    const title = card.querySelector('h4');
    if (title) textCell.push(title);
    // Description (p inside .lb-rtxt)
    const desc = card.querySelector('.lb-rtxt p');
    if (desc) textCell.push(desc);
    // CTA (Read the post link)
    // Only pick direct child <a> inside the .lb-box, not the heading link
    const box = card.querySelector('.lb-none-pad.lb-box');
    if (box) {
      const cta = Array.from(box.querySelectorAll('a.lb-txt'))
        .find(a => !title || (title !== a.closest('h4')));
      if (cta && (!title || !title.contains(cta))) textCell.push(cta);
    }

    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
