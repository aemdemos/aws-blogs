/* global WebImporter */
export default function parse(element, { document }) {
  // Find a Twitter status link inside the embed
  let url = null;
  const links = element.querySelectorAll('a');
  for (const link of links) {
    const href = link.getAttribute('href');
    // Twitter status links
    if (href && /twitter\.com\/.+\/status\/[0-9]+/.test(href)) {
      url = href;
      break;
    }
  }

  // Fallback: look for blockquote[data-twitter] or cite, etc
  if (!url) {
    const blockquote = element.querySelector('blockquote');
    if (blockquote) {
      const cite = blockquote.getAttribute('cite');
      if (cite && /twitter\.com\/.+\/status\/[0-9]+/.test(cite)) {
        url = cite;
      }
    }
  }

  // Fallback: look for anchor whose textContent contains 'twitter.com'
  if (!url) {
    for (const link of links) {
      if (link.textContent && /twitter\.com\/.+\/status\/[0-9]+/.test(link.textContent)) {
        url = link.textContent.trim();
        break;
      }
    }
  }

  // If still not found, do nothing
  if (!url) return;

  // Construct table
  const headerRow = ['Embed (embedSocial25)'];
  const contentRow = [url];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
