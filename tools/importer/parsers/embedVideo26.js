/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <a> with an <img> inside and a video-related URL
  let videoImg = null;
  let videoHref = null;

  // Look for a <p><a><img/></a></p> pattern with a video link
  const imgLinks = element.querySelectorAll('a > img');
  for (const img of imgLinks) {
    const a = img.closest('a');
    if (a && a.href && (/apn-tv|brighttalk|vimeo|youtube/i).test(a.href)) {
      videoImg = img;
      videoHref = a.href;
      break;
    }
  }

  // If not found, look for just a video-related link
  if (!videoHref) {
    const links = element.querySelectorAll('a');
    for (const a of links) {
      if (a.href && (/apn-tv|brighttalk|vimeo|youtube/i).test(a.href)) {
        videoHref = a.href;
        break;
      }
    }
  }

  // If nothing found, do not replace
  if (!videoHref) return;

  // Build the single cell contents: image (if any), then link
  const cellContent = [];
  if (videoImg) {
    cellContent.push(videoImg);
  }
  const linkElem = document.createElement('a');
  linkElem.href = videoHref;
  linkElem.textContent = videoHref;
  cellContent.push(linkElem);

  const cells = [
    ['Embed (embedVideo26)'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
