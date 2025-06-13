/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area where the blog post lives
  let main = element.querySelector('main');
  if (!main) main = element;

  // Get the hero image from meta[property="image"]
  const metaImg = main.querySelector('meta[property="image"]');
  let heroImg = '';
  if (metaImg && metaImg.content) {
    // Only create an <img> if the meta tag is present
    const img = document.createElement('img');
    img.src = metaImg.content;
    img.alt = '';
    heroImg = img;
  }

  // Get the hero headline (h1 is always present in these blog posts)
  const h1 = main.querySelector('h1.lb-h2.blog-post-title');
  const heroText = h1 ? [h1] : '';

  // Build the table structure per the Hero block example
  const cells = [
    ['Hero'],
    [heroImg],
    [heroText]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
