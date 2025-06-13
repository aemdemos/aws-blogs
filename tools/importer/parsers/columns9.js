/* global WebImporter */
export default function parse(element, { document }) {
  // Only run on the right section: look for the article main content (not About the Authors)
  // We'll search for a section with content matching the markdown example structure
  // Identify the main content area
  const articleBody = element.querySelector('.blog-post-content');
  if (!articleBody) return;

  // Example structure from markdown:
  // Row 1: [Columns block with text, list, button] | [image]
  // Row 2: [image] | [text, button]

  // Find all images in the section
  const images = articleBody.querySelectorAll('img');
  // We'll assign them in the order of appearance:
  // images[0] - top right, images[1] - bottom left

  // Build left top cell: "Columns block", a list, and a button
  const leftTop = document.createElement('div');
  // Paragraph: Columns block
  const pBlock = document.createElement('p');
  pBlock.textContent = 'Columns block';
  leftTop.appendChild(pBlock);
  // List
  const ul = document.createElement('ul');
  ['One','Two','Three'].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  leftTop.appendChild(ul);
  // Button
  const liveBtn = document.createElement('a');
  liveBtn.href = 'https://word-edit.officeapps.live.com/';
  liveBtn.textContent = 'Live';
  liveBtn.setAttribute('style', 'display:inline-block;padding:8px 18px;background:#356dff;color:#fff;border-radius:20px;text-decoration:none;');
  leftTop.appendChild(liveBtn);

  // Right top cell: first image (if exists)
  const rightTop = images[0] || '';

  // Bottom left cell: second image (if exists)
  const leftBottom = images[1] || '';

  // Bottom right cell: text, button ("Or you can just view the preview" + Preview button)
  const rightBottom = document.createElement('div');
  const p = document.createElement('p');
  p.textContent = 'Or you can just view the preview';
  rightBottom.appendChild(p);
  const previewBtn = document.createElement('a');
  previewBtn.href = 'https://word-edit.officeapps.live.com/';
  previewBtn.textContent = 'Preview';
  previewBtn.setAttribute('style', 'display:inline-block;padding:8px 18px;border:2px solid #222;border-radius:20px;text-decoration:none;');
  rightBottom.appendChild(previewBtn);

  // Compose the table
  const headerRow = ['Columns (columns9)'];
  const row1 = [leftTop, rightTop];
  const row2 = [leftBottom, rightBottom];
  const cells = [headerRow, row1, row2];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the main content block with the new table
  articleBody.replaceWith(table);
}
