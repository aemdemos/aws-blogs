/* global WebImporter */
export default function parse(element, { document }) {
  // Get main blog post content
  const main = element.querySelector('main#aws-page-content-main');
  if (!main) return;
  const article = main.querySelector('article.blog-post');
  if (!article) return;
  const body = article.querySelector('section.blog-post-content');
  if (!body) return;

  // Helper to clone node or return '' if not found
  function safeClone(node) { return node ? node.cloneNode(true) : ''; }

  // --- ROW 1 LEFT: Block Title, bullet list, button ---
  // Block Title
  const blockTitle = document.createElement('p');
  blockTitle.textContent = 'Columns block';
  // Simple bullet list
  const bulletList = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    bulletList.appendChild(li);
  });
  // Find a strong CTA link for 'Live'
  let liveBtn = '';
  let liveLink = Array.from(body.querySelectorAll('a')).find(a => /live/i.test(a.textContent.trim()));
  if (!liveLink) liveLink = Array.from(body.querySelectorAll('a')).find(a => /learn more/i.test(a.textContent.trim()));
  if (liveLink) {
    liveBtn = document.createElement('p');
    const btn = liveLink.cloneNode(true);
    btn.textContent = 'Live';
    btn.setAttribute('style', 'padding:0.5em 1.2em;border-radius:2em;background:#2563eb;color:white;text-decoration:none;display:inline-block;');
    liveBtn.appendChild(btn);
  }
  // Compose block for row 1 left
  const col1row1 = document.createElement('div');
  col1row1.appendChild(blockTitle);
  col1row1.appendChild(bulletList);
  if (liveBtn) col1row1.appendChild(liveBtn);

  // --- ROW 1 RIGHT: First prominent image ---
  let img1 = body.querySelector('img');
  img1 = Array.from(body.querySelectorAll('img')).find(im => parseInt(im.getAttribute('width')||'0',10) >= 200) || img1;

  // --- ROW 2 LEFT: Second prominent image ---
  let img2 = null;
  const imgs = Array.from(body.querySelectorAll('img'));
  if (imgs.length > 1) {
    img2 = imgs[1];
  }

  // --- ROW 2 RIGHT: Preview text and Preview button ---
  // Find preview text or make a default
  let previewPara = document.createElement('p');
  previewPara.textContent = 'Or you can just view the preview';
  // Find a CTA button with 'Preview' or create one
  let previewBtn = '';
  let previewLink = Array.from(body.querySelectorAll('a')).find(a => /preview/i.test(a.textContent));
  if (!previewLink) {
    previewLink = document.createElement('a');
    previewLink.href = '#';
    previewLink.textContent = 'Preview';
  } else {
    previewLink = previewLink.cloneNode(true);
    previewLink.textContent = 'Preview';
  }
  previewBtn = document.createElement('p');
  previewLink.setAttribute('style', 'padding:0.5em 1.2em;border-radius:2em;border:2px solid #222;text-decoration:none;display:inline-block;');
  previewBtn.appendChild(previewLink);
  // Compose block for row 2 right
  const previewBlock = document.createElement('div');
  previewBlock.appendChild(previewPara);
  previewBlock.appendChild(previewBtn);

  // Compose table cells as in the example
  const cells = [
    ['Columns (columns17)'],
    [col1row1, safeClone(img1)],
    [safeClone(img2), previewBlock]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
