/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header as required
  const headerRow = ['Cards (cards7)'];

  // Find the main row and columns
  const row = element.querySelector('.lb-row');
  if (!row) return;
  const cols = row.querySelectorAll(':scope > div');
  if (cols.length !== 2) return;

  // LEFT COLUMN: Image (mandatory, always inside <a><img>)
  let imageEl = null;
  const imageAnchor = cols[0].querySelector('a');
  if (imageAnchor) {
    const img = imageAnchor.querySelector('img');
    if (img) imageEl = img;
  }

  // RIGHT COLUMN: Text content
  const rightCol = cols[1];
  // Title (h2 > a > span) -- output as heading if possible
  let titleNode = null;
  const h2 = rightCol.querySelector('h2');
  if (h2) {
    // Use <strong> because example bolds the heading, but preserve link structure
    const a = h2.querySelector('a');
    if (a) {
      // If the title is in a span, preserve only the text
      const headline = a.querySelector('[property="name"], [property="headline"]');
      const strong = document.createElement('strong');
      if (headline) {
        strong.textContent = headline.textContent;
      } else {
        strong.textContent = a.textContent;
      }
      titleNode = strong;
    }
  }

  // Description/excerpt
  let descNodes = [];
  const excerpt = rightCol.querySelector('.blog-post-excerpt');
  if (excerpt) {
    // Only include <p> nodes (ignore whitespace)
    excerpt.childNodes.forEach(n => {
      if (n.nodeType === Node.ELEMENT_NODE) {
        descNodes.push(n);
      }
    });
  }

  // Compose text cell: title, line break, then excerpt paragraph(s)
  let textCell = [];
  if (titleNode) {
    textCell.push(titleNode);
  }
  if (descNodes.length > 0) {
    if (titleNode) textCell.push(document.createElement('br'));
    descNodes.forEach(n => textCell.push(n));
  }

  // If there is no content, fallback to blank string
  if (textCell.length === 0) textCell = [''];

  // Compose the final table rows
  const tableRows = [headerRow, [imageEl, textCell]];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
