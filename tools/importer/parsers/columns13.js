/* global WebImporter */
export default function parse(element, { document }) {
  // Create a table with header row ['Columns (columns13)'], and two rows, two columns each
  // All content is created here as a self-contained demo since the actual column HTML is not present

  // --- ROW 1 ---
  // Left cell: block with text, list, and blue "Live" button
  const leftDiv1 = document.createElement('div');
  const para1 = document.createElement('div');
  para1.textContent = 'Columns block';
  const ul = document.createElement('ul');
  ['One', 'Two', 'Three'].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  const liveBtn = document.createElement('a');
  liveBtn.href = 'https://word-edit.officeapps.live.com/';
  liveBtn.textContent = 'Live';
  liveBtn.setAttribute('style','display:inline-block;padding:4px 16px;border-radius:999px;background:#2563eb;color:#fff;text-decoration:none;font-weight:bold;margin-top:10px;');
  leftDiv1.appendChild(para1);
  leftDiv1.appendChild(ul);
  leftDiv1.appendChild(liveBtn);
  // Right cell: green double helix image
  const img1 = document.createElement('img');
  img1.src = 'https://main--aws-blogs--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png';
  img1.alt = 'green double Helix';
  img1.width = 750;
  img1.height = 500;

  // --- ROW 2 ---
  // Left cell: yellow double helix image
  const img2 = document.createElement('img');
  img2.src = 'https://main--aws-blogs--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png';
  img2.alt = 'Yellow Double Helix';
  img2.width = 644;
  img2.height = 470;

  // Right cell: preview text and button
  const rightDiv2 = document.createElement('div');
  rightDiv2.textContent = 'Or you can just view the preview';
  rightDiv2.appendChild(document.createElement('br'));
  const previewBtn = document.createElement('a');
  previewBtn.href = 'https://word-edit.officeapps.live.com/';
  previewBtn.textContent = 'Preview';
  previewBtn.setAttribute('style','display:inline-block;padding:4px 16px;border-radius:999px;border:1px solid #222;text-decoration:none;margin-top:10px;');
  rightDiv2.appendChild(previewBtn);

  // Assemble table rows as per block spec
  const rows = [
    ['Columns (columns13)'],
    [leftDiv1, img1],
    [img2, rightDiv2]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
