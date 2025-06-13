/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area
  const mainContent = element.querySelector('main#aws-page-content-main');
  if (!mainContent) return;
  const article = mainContent.querySelector('article.blog-post');
  if (!article) return;
  const bodySection = article.querySelector('section.blog-post-content');
  if (!bodySection) return;

  // Get all immediate children of the blog-post-content
  const children = Array.from(bodySection.children);

  // --- First row, left column: label, ul, and 'Live' button ---
  // Find the first <ul>
  let ulIdx = children.findIndex(el => el.tagName === 'UL');
  let label = null, ul = null, liveBtn = null;
  if (ulIdx !== -1) {
    ul = children[ulIdx];
    // The label is the previous <p>
    if (ulIdx > 0 && children[ulIdx-1].tagName === 'P') {
      label = children[ulIdx-1];
    }
    // The 'Live' button is a <p> with an <a> after the ul
    for (let i = ulIdx+1; i < children.length; i++) {
      const el = children[i];
      if (el.tagName === 'P' && el.querySelector('a')) {
        liveBtn = el;
        break;
      }
    }
  }
  const topLeft = [label, ul, liveBtn].filter(Boolean);

  // --- First row, right column: teal helix image ---
  // Find first img.alignnone and its parent <p>
  let tealImgP = null;
  let imgs = Array.from(bodySection.querySelectorAll('img.alignnone'));
  if (imgs[0]) tealImgP = imgs[0].closest('p');

  // --- Second row, left column: yellow helix image ---
  let yellowImgP = null;
  if (imgs[1]) yellowImgP = imgs[1].closest('p');

  // --- Second row, right column: preview text and button ---
  // Find <p> with preview text after yellowImgP, and then a button <p> after that
  let previewText = null, previewBtn = null;
  if (yellowImgP) {
    let current = yellowImgP.nextElementSibling;
    while (current) {
      if (current.tagName === 'P') {
        if (!previewText) {
          previewText = current;
        } else if (!previewBtn && current.querySelector('a')) {
          previewBtn = current;
          break;
        }
      }
      current = current.nextElementSibling;
    }
  }
  const bottomRight = [previewText, previewBtn].filter(Boolean);

  // --- Create the columns table ---
  const headerRow = ['Columns (columns12)'];
  const row1 = [topLeft, tealImgP];
  const row2 = [yellowImgP, bottomRight];
  const cells = [headerRow, row1, row2];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  bodySection.replaceWith(table);
}
