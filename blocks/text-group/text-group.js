export default function decorate(domBlockRoot) {
  // h2, h3, h4 要素にクラスを追加
  domBlockRoot.querySelectorAll('h2, h3, h4').forEach((domTitle) => {
    domTitle.classList.add('text-group-title');
  });

  // p 要素にクラスを追加
  domBlockRoot.querySelectorAll('p').forEach((domParagraph) => {
    domParagraph.classList.add('text-group-paragraph');
  });
}
