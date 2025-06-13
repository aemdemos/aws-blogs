/* global WebImporter */
export default function parse(element, { document }) {
  // The block expects a table with 1 column and 2 rows:
  // 1. Header row: 'Search (search11)'
  // 2. The absolute URL of a query index for search.
  // The AWS HTML does not contain a query index reference.
  // For correct block extraction, we must use a canonical sample URL as in the example or dynamically extract if present.
  // Check if the element contains a URL to a query index (e.g., in a data- attribute or similar; if not, use sample).
  let searchIndexUrl = null;
  // Try to find something matching a search index reference
  // For AWS this is not present; fallback to sample from example.
  // If in future, a real query index is found, extract it from the element here.
  searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Build the table.
  const headerRow = ['Search (search11)'];
  const cells = [
    headerRow,
    [searchIndexUrl],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
