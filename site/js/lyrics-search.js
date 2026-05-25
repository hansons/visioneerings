document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('lyrics-search');
  const list = document.getElementById('lyrics-list');
  const noResults = document.getElementById('lyrics-no-results');

  if (!input || !list) return;

  const items = list.querySelectorAll('.lyrics-list__item');

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    let matchCount = 0;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const match = !query || text.includes(query);
      item.style.display = match ? '' : 'none';
      if (match) matchCount++;
    });

    if (noResults) {
      noResults.style.display = matchCount === 0 ? 'block' : 'none';
    }
  });
});
