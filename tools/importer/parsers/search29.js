/* global WebImporter */
export default function parse(element, { document }) {
  // The block expects a 1-column, 2-row table:
  // [ 'Search (search29)' ]
  // [ absolute url to query index ]

  // Since the source HTML does not contain a JSON index reference, but only a search box,
  // and the example always uses the sample index, use that URL as the source for search data.
  // No Section Metadata is present in the example markdown, so do not create one.
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Table header row must match exactly
  const cells = [
    ['Search (search29)'],
    [searchIndexUrl],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
