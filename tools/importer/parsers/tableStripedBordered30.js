/* global WebImporter */
export default function parse(element, { document }) {
  // The example is a table that appears only as an image in the HTML. There is no semantic HTML table to extract.
  // Therefore, the best we can do is extract the relevant contextual paragraph and the image, and place both in a table cell.
  // We must reference the elements directly, not create new ones or clone. No section metadata is present in the sample markdown.
  
  // Find the main <article> containing the blog content
  const article = element.querySelector('main article');
  if (!article) return;

  // Find the <img> that represents the table (based on filename in src)
  const tableImg = article.querySelector('img[src*="image-11.png"]');
  // Find the immediately-preceding paragraph for context
  let tablePara = null;
  if (tableImg) {
    let prev = tableImg.previousElementSibling;
    while (prev && prev.tagName.toLowerCase() !== 'p') {
      prev = prev.previousElementSibling;
    }
    if (prev && prev.tagName.toLowerCase() === 'p') {
      tablePara = prev;
    }
  }

  // Compose table rows
  const headerRow = ['Table (striped, bordered, tableStripedBordered30)'];
  let contentRow = [];
  if (tableImg && tablePara) {
    contentRow = [[tablePara, tableImg]];
  } else if (tableImg) {
    contentRow = [[tableImg]];
  } else {
    // fallback: note missing image in a p element
    const msg = document.createElement('p');
    msg.textContent = 'Table image not found.';
    contentRow = [[msg]];
  }
  // Build the table block
  const cells = [headerRow, ...contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the main element with the block table
  element.replaceWith(block);
}
