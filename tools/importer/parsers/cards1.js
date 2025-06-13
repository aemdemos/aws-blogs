/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Cards (cards1)'];

  // Each card is the content of an <article class="blog-post"> element
  // The structure is:
  //   - left column: image inside .lb-col.lb-mid-6 (first child)
  //   - right column: .lb-col.lb-mid-18 (second child), containing h2 (title), footer (meta), section (description)

  // Helper for safe element selection
  function safeQuery(parent, selector) {
    return parent ? parent.querySelector(selector) : null;
  }

  // Compose the cards rows
  let articles = [];
  // Defensive: if element is an <article>, just use it, otherwise all articles inside
  if (element.tagName === 'ARTICLE') {
    articles = [element];
  } else {
    articles = element.querySelectorAll('article.blog-post');
    if (!articles.length) articles = [element];
  }
  
  const rows = Array.from(articles).map((article) => {
    // Find left column (image)
    const colDivs = article.querySelectorAll('.lb-row > .lb-col');
    let img = null;
    if (colDivs.length > 0) {
      const imgLink = colDivs[0].querySelector('a');
      if (imgLink) {
        img = imgLink.querySelector('img');
      }
    }
    // Find right column (content)
    let contentBlock = document.createElement('div');
    if (colDivs.length > 1) {
      // Use existing h2, footer, section if present, in order
      const h2 = colDivs[1].querySelector('h2');
      const footer = colDivs[1].querySelector('footer');
      const section = colDivs[1].querySelector('section');
      if (h2) contentBlock.appendChild(h2);
      if (footer) contentBlock.appendChild(footer);
      if (section) contentBlock.appendChild(section);
    }
    return [img, contentBlock];
  });

  // Assemble table
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
