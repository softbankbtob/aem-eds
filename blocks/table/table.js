function buildCell(col) {
  const cell = col.querySelector('p strong') ? document.createElement('th') : document.createElement('td');
  if (cell.tagName === 'TH') cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  table.append(tbody);

  [...block.children].forEach((child) => {
    const row = document.createElement('tr');
    tbody.append(row);
    [...child.children].forEach((col) => {
      const cell = buildCell(col);
      cell.innerHTML = col.innerHTML;
      row.append(cell);
    });
  });
  block.innerHTML = '';
  block.append(table);
}