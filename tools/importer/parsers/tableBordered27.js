/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as given in the task
  const headerRow = ['Table (bordered, tableBordered27)'];
  
  // The entire content under the banner (the colored area with the H1)
  // In this case, the element itself is the full block (including background image style)
  // The key visual content is the heading, but since structure is preserved, using the inner row
  // We'll reference the content row (with the h1) for robustness
  let mainContent = element.querySelector(':scope > .lb-row, :scope > div.lb-row');
  if (!mainContent) {
    // fallback: use the whole element content
    mainContent = element;
  }
  // Table structure: header row, then block content row
  const cells = [
    headerRow,
    [mainContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
