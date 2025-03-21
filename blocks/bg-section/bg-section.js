/**
 * 背景セクションをデコレートする関数
 * @param {HTMLElement} block - 背景セクションブロック要素
 */
export default function decorate(block) {
  // 元のコンテンツを取得
  const bgSectionBlock = block.closest('.bg-section-container');
  if (!bgSectionBlock) return;

  // プライマリカラー
  if (block.classList.contains('color-primary')) {
    bgSectionBlock.classList.add('color-primary');
  }

  // セカンダリカラー
  if (block.classList.contains('color-secondary')) {
    bgSectionBlock.classList.add('color-secondary');
  }

  // 背景セクションのラップ要素を取得
  const bgSectionWrapper = bgSectionBlock.querySelector('.bg-section-wrapper');
  if (!bgSectionWrapper) return;

  // wrapperの後の要素をすべて取得
  const wrapperSiblings = [];
  let nextSibling = bgSectionWrapper.nextElementSibling;
  while (nextSibling) {
    wrapperSiblings.push(nextSibling);
    nextSibling = nextSibling.nextElementSibling;
  }

  // 取得した要素をwrapperの中に移動
  wrapperSiblings.forEach(sibling => {
    bgSectionWrapper.appendChild(sibling);
  });

  // `bg-section-container` の兄弟要素を取得
  let sibling = bgSectionBlock.nextElementSibling;
  while (sibling) {
    const next = sibling.nextElementSibling; // 次の要素を取得しておく

    // `div.section` かつ中身が空なら削除
    if (sibling.matches('.section') && sibling.innerHTML.trim() === '') {
      sibling.remove();
    }

    sibling = next; // 次の要素に進む
  }
}
