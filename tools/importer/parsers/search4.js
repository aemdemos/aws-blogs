/* global WebImporter */
export default function parse(element, { document }) {
  // This block expects the table header exactly as specified
  const headerRow = ['Search (search4)'];

  // We need to extract a search index URL from the source if possible, but given the provided AWS HTML
  // there is no such explicit search index URL available in the markup. The block description says to
  // use a sample URL, e.g., https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json
  // so we will use that as a default. If you want to extract a real URL from the AWS HTML in the future,
  // you could attempt to find it in a <script> tag, data attribute, etc.

  // If you want to make this more dynamic in the future, you could try to find a search endpoint in the DOM.
  // For now, there's no such value to extract, so use the sample.
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Build the table according to the required structure
  const rows = [
    headerRow,
    [searchIndexUrl],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
