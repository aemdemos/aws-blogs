/* global WebImporter */
export default function parse(element, { document }) {
  // Construct the table block as shown in the example
  const cells = [
    ['Table (table18)'],
    ['City', 'Country', 'Time Zone'],
    ['Spas', 'Ukraine', 'Europe/Uzhgorod'],
    ['Denver', 'United States', 'America/Denver'],
    ['Dimbokro', 'Ivory Coast', 'Africa/Abidjan'],
    ['Eira Nova', 'Portugal', 'Europe/Lisbon'],
    ['Luocheng', 'China', 'Asia/Shanghai'],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
