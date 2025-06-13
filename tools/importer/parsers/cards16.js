/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards grid container for 'Cards (cards16)'
  // The correct grid is .lb-xb-grid.lb-row-max-large.lb-xb-equal-height inside the block with .data-attr-wrapper.lb-none-pad.lb-mid-v-margin.lb-xb-grid-wrap
  const cardsBlock = element.querySelector('.data-attr-wrapper.lb-none-pad.lb-mid-v-margin.lb-xb-grid-wrap');
  if (!cardsBlock) return;
  const grid = cardsBlock.querySelector('.lb-xb-grid.lb-row-max-large.lb-xb-equal-height');
  if (!grid) return;
  // Each card is in a .lb-xbcol
  const cardCols = Array.from(grid.querySelectorAll(':scope > .lb-xbcol'));

  // Table structure
  const rows = [
    ['Cards (cards16)']
  ];

  cardCols.forEach(col => {
    const cardLink = col.querySelector('a');
    if (!cardLink) return;

    // Image: first <img> inside the link
    let img = cardLink.querySelector('img');
    if (img && img.src && img.src.startsWith('//')) {
      img.src = 'https:' + img.src;
    }

    // Title, description, CTA
    const texts = cardLink.querySelectorAll('div.lb-txt');
    const textCell = [];
    if (texts[0]) {
      const strong = document.createElement('strong');
      strong.innerHTML = texts[0].innerHTML;
      textCell.push(strong);
    }
    if (texts[1]) {
      if (textCell.length) textCell.push(document.createElement('br'));
      const desc = document.createElement('p');
      desc.innerHTML = texts[1].innerHTML;
      textCell.push(desc);
    }
    if (texts[2]) {
      const cta = document.createElement('a');
      cta.href = cardLink.href;
      cta.innerHTML = texts[2].innerHTML;
      textCell.push(cta);
    }

    rows.push([
      img || '',
      textCell
    ]);
  });

  // Create and replace with the cards table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  cardsBlock.replaceWith(table);
}
