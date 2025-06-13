/* global WebImporter */
export default function parse(element, { document }) {
  // Define MAIN content to parse only main area
  const main = element.querySelector('main#aws-page-content-main');
  if (!main) return;
  const article = main.querySelector('article.blog-post');
  if (!article) return;
  const blogContent = article.querySelector('section.blog-post-content');
  if (!blogContent) return;

  // Find the two images for the columns
  const imgDivs = blogContent.querySelectorAll('div.wp-caption.aligncenter');
  const img1 = imgDivs[0]?.querySelector('img') || null;
  const img2 = imgDivs[1]?.querySelector('img') || null;

  // LEFT COLUMN (row 1): intro <p>, first <ul> or <ol>, and Live link
  const intro = blogContent.querySelector('p');
  let list = null;
  let afterIntro = false;
  for (const node of blogContent.children) {
    if (node === intro) { afterIntro = true; continue; }
    if (afterIntro && (node.tagName === 'UL' || node.tagName === 'OL')) {
      list = node;
      break;
    }
  }
  // Live action link
  let liveLink = null;
  const metaFooter = article.querySelector('footer.blog-post-meta');
  if (metaFooter) {
    const permalink = Array.from(metaFooter.querySelectorAll('a')).find(a => a.textContent.trim() === 'Permalink');
    if (permalink) {
      liveLink = document.createElement('a');
      liveLink.href = permalink.href;
      liveLink.textContent = 'Live';
      liveLink.setAttribute('style', 'display:inline-block;background:#2563eb;color:white;padding:7px 20px;border-radius:20px;text-decoration:none;margin-top:16px;');
    }
  }
  const leftCol1 = [];
  if (intro) leftCol1.push(intro);
  if (list) leftCol1.push(list);
  if (liveLink) leftCol1.push(liveLink);

  // RIGHT COLUMN (row 1): image 1
  const rightCol1 = img1 ? [img1] : [];

  // LEFT COLUMN (row 2): image 2
  const leftCol2 = img2 ? [img2] : [];

  // RIGHT COLUMN (row 2): preview <p> and Preview button
  let previewText = null;
  let previewBtn = null;
  const previewP = Array.from(blogContent.querySelectorAll('p')).reverse().find(p => /preview/i.test(p.textContent));
  if (previewP) previewText = previewP;
  if (previewText) {
    previewBtn = Array.from(previewText.querySelectorAll('a,button')).find(a => /preview/i.test(a.textContent));
  }
  if (!previewBtn) {
    previewBtn = document.createElement('button');
    previewBtn.textContent = 'Preview';
    previewBtn.setAttribute('style', 'padding:8px 24px;border:2px solid #111;border-radius:24px;background:white;margin-top:16px;font-size:1em;');
  }
  const rightCol2 = [];
  if (previewText) rightCol2.push(previewText);
  if (previewBtn) rightCol2.push(previewBtn);

  // Compose block table
  const cells = [
    ['Columns (columns28)'],
    [leftCol1, rightCol1],
    [leftCol2, rightCol2]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
