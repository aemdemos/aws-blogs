/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the cards (finalists)
  const main = element.querySelector('main#aws-page-content-main');
  if (!main) return;
  const article = main.querySelector('article.blog-post');
  if (!article) return;
  const contentSection = article.querySelector('section.blog-post-content');
  if (!contentSection) return;

  // Get all immediate <p> children containing an <img> (these are the cards)
  const cardPs = Array.from(contentSection.querySelectorAll(':scope > p')).filter(p => p.querySelector('img'));

  // Compose the rows for each card
  const rows = cardPs.map(cardP => {
    // Get the image (reference, not clone)
    const img = cardP.querySelector('img');
    // Create the text cell: clone the original <p> but remove the image and its containing link
    const textP = cardP.cloneNode(true);
    const imgInText = textP.querySelector('img');
    if (imgInText) {
      const a = imgInText.closest('a');
      if (a && a.parentElement === textP) {
        a.remove();
      } else {
        imgInText.remove();
      }
    }
    // Remove any leading/trailing <br> and whitespace from textP
    while (textP.firstChild && textP.firstChild.tagName === 'BR') textP.removeChild(textP.firstChild);
    while (textP.lastChild && textP.lastChild.tagName === 'BR') textP.removeChild(textP.lastChild);
    while (textP.firstChild && textP.firstChild.nodeType === 3 && !textP.firstChild.textContent.trim()) textP.removeChild(textP.firstChild);
    while (textP.lastChild && textP.lastChild.nodeType === 3 && !textP.lastChild.textContent.trim()) textP.removeChild(textP.lastChild);
    return [img, textP];
  });

  // Assemble the table rows: header then cards
  const cells = [['Cards (cards19)'], ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  contentSection.replaceWith(table);
}
