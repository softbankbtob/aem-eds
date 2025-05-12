export default function decorate(block) {
  const tags = document.querySelector("meta[property='article:tag']")?.content.split(",").map(tag => tag.trim());
  const ul = document.createElement('ul');
  if (tags) {
    tags.forEach(tag => {
      const li = document.createElement('li');
      li.textContent = tag;
      ul.appendChild(li);
    });
    block.appendChild(ul);
  } else {
    block.remove();
  }
}
