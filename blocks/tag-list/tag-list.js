export default function decorate(block) {
  // 対象の要素を取得
  const tagListContainer = document.querySelector('.tag-list-container');

  // クラスのないdiv要素を削除し、中身を保持
  tagListContainer.querySelectorAll('div:not([class])').forEach(div => {
    // 中身を取得
    const content = div.innerHTML;
    // divを削除
    div.remove();
    tagListContainer.querySelectorAll('div:not([class]) > ul').forEach(ul => {
      ul.remove();
    });
    // 中身をblockに追加
    block.insertAdjacentHTML('beforeend', content);
  });
  // 元のブロックの中身を空にして新しい要素を追加
  block.tagListContainer = '';
  // 中身のないdivを削除
  tagListContainer.querySelectorAll('div:not([class])').forEach(emptyDiv => {
    emptyDiv.remove();
  });
  block.appendChild(tagListContainer);
}