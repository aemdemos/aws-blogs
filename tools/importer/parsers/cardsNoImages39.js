/* global WebImporter */
export default function parse(element, { document }) {
  // Find the correct grid of cards: look for the last .js-mbox[data-mbox="en_blog_post_comments"] inside the given element
  const mbox = element.querySelector('.js-mbox[data-mbox="en_blog_post_comments"]');
  if (!mbox) return;
  // The actual grid is inside .lb-xb-grid
  const grid = mbox.querySelector('.lb-xb-grid');
  if (!grid) return;
  // Each card is a .lb-xbcol
  const cardDivs = Array.from(grid.querySelectorAll(':scope > .lb-xbcol'));

  // Table header from specification
  const cells = [['Cards (cardsNoImages39)']];

  // For each card, extract (by reference) heading, description, CTA
  cardDivs.forEach(cardDiv => {
    // Each card has a .lb-box.lb-has-link > a
    const link = cardDiv.querySelector('.lb-box.lb-has-link > a');
    if (!link) return;
    // Heading: .lb-txt-bold.lb-txt-squid (first)
    const heading = link.querySelector('.lb-txt-bold.lb-txt-squid');
    // Description: the first .lb-txt-squid that is NOT .lb-txt-bold
    let description = null;
    const squidTexts = link.querySelectorAll('.lb-txt-squid');
    for (const t of squidTexts) {
      if (!t.classList.contains('lb-txt-bold')) {
        description = t;
        break;
      }
    }
    // CTA: .lb-txt-bold.lb-txt-blue-600
    const cta = link.querySelector('.lb-txt-bold.lb-txt-blue-600');
    // Compose cell content in order: heading, (br), description, (br), CTA
    const content = [];
    if (heading) content.push(heading);
    if (description) {
      if (content.length) content.push(document.createElement('br'));
      content.push(description);
    }
    if (cta) {
      if (content.length) content.push(document.createElement('br'));
      content.push(cta);
    }
    // Only add row if there's visible content
    if (content.length) {
      cells.push([content]);
    }
  });

  // Build table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.parentNode.replaceChild(table, element);
}
