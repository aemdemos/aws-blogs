/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector(':scope > .lb-xb-grid');
  let colEls = [];
  if (grid) {
    colEls = Array.from(grid.querySelectorAll(':scope > .lb-xbcol'));
  }

  // Collect any trailing content that appears after the main grid (social icons, legal, etc.)
  const trailing = [];
  let node = grid ? grid.nextElementSibling : null;
  while (node) {
    // Only include non-empty elements
    if (node.children.length > 0 || node.textContent.trim()) {
      trailing.push(node);
    }
    node = node.nextElementSibling;
  }

  // Header row: block name and variant
  const header = ['Columns (columns3)'];

  // Second row: one cell per column
  const contentRow = colEls.map((col) => {
    // If the column only contains a single, empty .lb-mbox, return an empty string
    if (
      col.children.length === 1 &&
      col.firstElementChild &&
      col.firstElementChild.classList.contains('lb-mbox') &&
      !col.firstElementChild.textContent.trim()
    ) {
      return '';
    }
    // Otherwise, collect all child nodes into a DocumentFragment
    const fragment = document.createDocumentFragment();
    Array.from(col.childNodes).forEach((child) => {
      // Exclude empty .lb-mbox
      if (
        child.nodeType === 1 &&
        child.classList &&
        child.classList.contains('lb-mbox') &&
        !child.textContent.trim()
      ) {
        return;
      }
      fragment.appendChild(child);
    });
    // If there is no content, return empty string
    return fragment.childNodes.length ? Array.from(fragment.childNodes) : '';
  });

  // Third row: trailing content (put only in the last column, rest empty)
  let trailingRow = null;
  if (trailing.length) {
    const cells = Array(colEls.length).fill('');
    const fragment = document.createDocumentFragment();
    trailing.forEach((el) => fragment.appendChild(el));
    cells[cells.length - 1] = Array.from(fragment.childNodes);
    trailingRow = cells;
  }

  // Compose rows for the table
  const rows = [header, contentRow];
  if (trailingRow) rows.push(trailingRow);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
