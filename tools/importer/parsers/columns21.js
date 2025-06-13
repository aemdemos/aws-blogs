/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main blog content and sidebar columns
  // The structure is: a wrapping div with two main children: content column and sidebar column
  let mainCol = null;
  let sideCol = null;
  // Find direct children that contain main and sidebar
  const directDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Try to locate 'main' and sidebar among immediate children or their descendents
  for (const div of directDivs) {
    if (!mainCol && div.querySelector('main')) {
      mainCol = div.querySelector('main');
    }
    if (!sideCol && div.querySelector('.blog-sidebar')) {
      sideCol = div.querySelector('.blog-sidebar');
    }
  }
  // Fallbacks if we didn't find them in direct children
  if (!mainCol) mainCol = element.querySelector('main');
  if (!sideCol) sideCol = element.querySelector('.blog-sidebar');

  // If either column is missing, ensure we at least provide an empty placeholder (for block structure)
  const headerRow = ['Columns (columns21)'];
  const columnsRow = [mainCol || document.createElement('div'), sideCol || document.createElement('div')];
  const cells = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
