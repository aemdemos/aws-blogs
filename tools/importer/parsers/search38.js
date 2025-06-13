/* global WebImporter */
export default function parse(element, { document }) {
  // The Search block's query-index URL is not directly in the HTML, but is determined by the block's function
  // and sample markdown: https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json
  // So, we use that static value as per instructions and the example markdown structure.

  // Table header must match the example exactly
  const headerRow = ['Search (search38)'];
  // Second row must be a single cell with the absolute query-index URL
  const dataRow = ['https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json'];

  const rows = [headerRow, dataRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
