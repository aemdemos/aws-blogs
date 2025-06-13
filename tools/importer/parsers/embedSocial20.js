/* global WebImporter */
export default function parse(element, { document }) {
  // The Embed (embedSocial20) block expects a 2-row table: header and a cell with the URL to the embedded content.
  // We need to extract the original social media (Twitter/X) post URL from the element.

  // Helper: returns the first Twitter/X status URL found in anchor tags
  function findTweetUrl(el) {
    const anchors = el.querySelectorAll('a');
    for (const a of anchors) {
      if (a.href && a.href.match(/^https?:\/\/(twitter|x)\.com\/[A-Za-z0-9_]+\/status\/\d+/)) {
        return a.href;
      }
    }
    // Sometimes the canonical tweet URL may be in a 'cite' or similar
    const blockquote = el.querySelector('blockquote[cite]');
    if (blockquote && blockquote.getAttribute('cite')) {
      return blockquote.getAttribute('cite');
    }
    // Sometimes there may be a <link rel="canonical">
    const canonical = el.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) {
      return canonical.href;
    }
    return null;
  }

  let embedUrl = findTweetUrl(element);

  // Fallback: if not found, look for any anchor with a likely shortener (e.g., t.co) as last resort
  if (!embedUrl) {
    const anchors = element.querySelectorAll('a');
    for (const a of anchors) {
      if (a.href && a.href.match(/^https?:\/\/t\.co\//)) {
        embedUrl = a.href;
        break;
      }
    }
  }

  // If still not found, abort block (do NOT create a table with dummy URL)
  if (!embedUrl) {
    // Optionally, you could skip or remove the element. Here, just return and do nothing.
    return;
  }

  // Create a plain text version of the URL (not a link element)
  const cells = [
    ['Embed (embedSocial20)'],
    [embedUrl]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}