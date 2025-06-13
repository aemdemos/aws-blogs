/* global WebImporter */
export default function parse(element, { document }) {
  // Only replace with an embed block if there is a valid direct video embed (e.g. Vimeo, YouTube, etc.)
  // 1. Define what counts as a valid video provider (exclude Facebook, Twitter, LinkedIn, etc)
  const videoDomains = [
    'youtube.com', 'youtu.be', 'vimeo.com', 'player.vimeo.com',
    'dailymotion.com', 'wistia.com', 'streamable.com', 'loom.com',
    'twitch.tv'
  ];

  // 2. Helper: is the given URL a valid direct video?
  function isDirectVideoUrl(url) {
    if (!url) return false;
    try {
      const { hostname, pathname } = new URL(url);
      // Only allow if the domain matches an allowed video domain
      return videoDomains.some(domain => hostname.includes(domain));
    } catch (e) {
      return false;
    }
  }

  // 3. Try finding <a href=video><img></a>
  let bestImg = null;
  let bestVideoUrl = null;

  const links = element.querySelectorAll('a[href]');
  for (const a of links) {
    const href = a.href;
    const img = a.querySelector('img');
    if (img && isDirectVideoUrl(href)) {
      bestImg = img;
      bestVideoUrl = href;
      break;
    }
  }
  // If not found, just any <a href=video>
  if (!bestVideoUrl) {
    for (const a of links) {
      const href = a.href;
      if (isDirectVideoUrl(href)) {
        bestVideoUrl = href;
        break;
      }
    }
  }
  // If not found, look for iframes (embed codes)
  if (!bestVideoUrl) {
    const iframes = element.querySelectorAll('iframe[src]');
    for (const iframe of iframes) {
      const src = iframe.src;
      if (isDirectVideoUrl(src)) {
        bestVideoUrl = src;
        break;
      }
    }
  }
  // 4. Only produce the embed block if there is a valid direct video URL
  if (!bestVideoUrl) return;
  const link = document.createElement('a');
  link.href = bestVideoUrl;
  link.textContent = bestVideoUrl;
  const cellContent = bestImg ? [bestImg, link] : [link];
  const table = WebImporter.DOMUtils.createTable([
    ['Embed (embedVideo36)'],
    [cellContent]
  ], document);
  element.replaceWith(table);
}
