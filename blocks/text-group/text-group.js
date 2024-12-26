export default function decorate(domBlockRoot) {
  for(const domTitle of domBlockRoot.querySelectorAll('h2, h3, h4')) {
    domTitle.classList.add('text-group-title')
  }
  for(const domParagraph of domBlockRoot.querySelectorAll('p')) {
    domParagraph.classList.add('text-group-paragraph')
  }
}

