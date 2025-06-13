/* global WebImporter */
export default function parse(element, { document }) {
  // The block is 'Embed (embedSocial24)' and expects a one column, two row table:
  //  Header: Embed (embedSocial24)
  //  Row: [<URL to social embed>]

  // This function needs to extract the canonical URL to the embedded Twitter/X post from the widget.
  // It should not hardcode the URL but should find the relevant <a> element or reconstruct it from other info.
  // The final block table matches the described structure exactly: header row, then URL in next row.
  // No Section Metadata is needed, no other blocks or <hr>.

  function extractTwitterUrl(el) {
    // 1. Look for <a> with href matching twitter.com or x.com status link
    const links = el.querySelectorAll('a');
    for (const a of links) {
      // Must be a post URL
      if (/https?:\/\/(twitter|x)\.com\/.+\/status\/(\d+)/.test(a.href)) {
        return a.href;
      }
    }
    // 2. Look for blockquote[cite]
    const blockquote = el.querySelector('blockquote[cite]');
    if (blockquote && blockquote.cite) return blockquote.cite;
    // 3. Look for <iframe src> with Tweet.html?id=...
    const iframe = el.querySelector('iframe');
    if (iframe && /twitter\.com|x\.com/.test(iframe.src)) {
      try {
        const url = new URL(iframe.src);
        const id = url.searchParams.get('id');
        if (id) return `https://twitter.com/i/web/status/${id}`;
      } catch(e) {/* ignore */}
    }
    // 4. Try a data-url attribute
    const dataUrl = el.getAttribute('data-url');
    if (dataUrl && /twitter|x\.com/.test(dataUrl)) return dataUrl;
    // 5. As fallback, look for <a> to t.co and return that
    for (const a of links) {
      if (/https?:\/\/t\.co\//.test(a.href)) return a.href;
    }
    return '';
  }

  const twitterUrl = extractTwitterUrl(element);
  if (!twitterUrl) return;
  const headerRow = ['Embed (embedSocial24)'];
  const cells = [
    headerRow,
    [twitterUrl],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
