/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main blog/article element to extract the author bios for the 2-column block
  const article = element.querySelector('article.blog-post');
  if (!article) return;

  // Find the About the authors section
  const contentSection = article.querySelector('section.blog-post-content');
  if (!contentSection) return;

  // Find the 'About the authors' heading and its following paragraphs
  const headings = contentSection.querySelectorAll('h3');
  let aboutAuthorsHeading = null;
  headings.forEach(h => {
    if (h.textContent.trim().toLowerCase().includes('about the authors')) {
      aboutAuthorsHeading = h;
    }
  });
  if (!aboutAuthorsHeading) return;

  // Gather the two author paragraphs immediately after the heading
  const authorParagraphs = [];
  let node = aboutAuthorsHeading.nextElementSibling;
  while (node && node.tagName === 'P' && authorParagraphs.length < 2) {
    authorParagraphs.push(node);
    node = node.nextElementSibling;
  }
  if (authorParagraphs.length < 2) return;

  // For each author paragraph, extract its children into a fragment to preserve all images and formatting
  const contentCells = authorParagraphs.map(paragraph => {
    const frag = document.createDocumentFragment();
    Array.from(paragraph.childNodes).forEach(child => {
      frag.appendChild(child.cloneNode(true));
    });
    return frag;
  });

  // Table header row (must EXACTLY match example)
  const headerRow = ['Columns (columns37)', ''];
  // Second row: each cell is a fragment with the original paragraph's content
  const cells = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the heading and both paragraphs with the table
  aboutAuthorsHeading.parentNode.insertBefore(table, aboutAuthorsHeading);
  aboutAuthorsHeading.remove();
  authorParagraphs.forEach(p => p.remove());
}
