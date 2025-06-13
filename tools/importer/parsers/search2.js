/* global WebImporter */
export default function parse(element, { document }) {
  // Define the required query index URL for the Search (search2) block
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create the block table as required
  const cells = [
    ['Search (search2)'],
    [queryIndexUrl]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
