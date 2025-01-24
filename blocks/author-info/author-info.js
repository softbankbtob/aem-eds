/**
 * 著者情報ブロックをデコレートする関数
 * @param {HTMLElement} block - 著者情報ブロック要素
 */
export default function decorate(block) {
  // 元のコンテンツを取得
  const authorInfoBlock = block.querySelector('.author-info.block > div');
  if (!authorInfoBlock) return;

  // 新しい構造のための要素を作成
  const authorInfoHeading = document.createElement('div');
  authorInfoHeading.className = 'author-info-heading';

  const authorInfoText = document.createElement('div');
  authorInfoText.className = 'author-info-text';

  // pictureを移動
  const picture = authorInfoBlock.querySelector('picture');
  if (picture) {
    authorInfoHeading.appendChild(picture.cloneNode(true));
  }

  // 執筆者情報のpタグを移動
  const authorP = authorInfoBlock.querySelector('div:nth-child(2) p');
  if (authorP) {
    authorInfoHeading.appendChild(authorP.cloneNode(true));
  }

  // 説明文のpタグを移動
  const descriptionP = authorInfoBlock.querySelector('div:nth-child(3) p');
  if (descriptionP) {
    authorInfoText.appendChild(descriptionP.cloneNode(true));
  }

  // 元のコンテンツを空にして新しい構造を追加
  authorInfoBlock.textContent = '';
  authorInfoBlock.appendChild(authorInfoHeading);
  authorInfoBlock.appendChild(authorInfoText);
}
