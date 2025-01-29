export default function decorate(block) {
  // ulを取得
  const ul = block.querySelector('ul');

  if (ul) {
    // 既存のタグリストコンテナを取得
    const existingContainer = block.closest('.tag-list-container');

    if (existingContainer) {
      // タグリストラッパーを作成
      const tagListWrapper = document.createElement('div');
      tagListWrapper.className = 'tag-list-wrapper';

      // タグリストブロックを作成
      const tagList = document.createElement('div');
      tagList.className = 'tag-list block';
      tagList.setAttribute('data-block-name', 'tag-list');
      tagList.setAttribute('data-block-status', 'loaded');

      // 要素を階層構造に組み立て
      tagList.appendChild(ul);
      tagListWrapper.appendChild(tagList);

      // 既存のコンテナの中身を空にして新しい要素を追加
      existingContainer.textContent = '';
      existingContainer.appendChild(tagListWrapper);
    }
  }
}
