export default function decorate(block) {
  // author-info-wrapを作成
  const authorWrap = document.createElement('div');
  authorWrap.className = 'author-info-wrap';

  // 元のコンテンツを取得
  const originalContent = block.querySelector('div > div');
  if (!originalContent) return;

  // 画像用のdivを作成
  const imgDiv = document.createElement('div');
  imgDiv.className = 'author-info-img';

  // pictureを移動
  const picture = originalContent.querySelector('picture');
  if (picture) {
    imgDiv.appendChild(picture);
  }

  // テキスト用のdivを作成
  const textDiv = document.createElement('div');
  textDiv.className = 'author-info-text';

  // pタグを移動
  const paragraphs = originalContent.querySelectorAll('div:nth-child(2) p');
  paragraphs.forEach(p => {
    textDiv.appendChild(p);
  });

  // 要素を追加
  authorWrap.appendChild(imgDiv);
  authorWrap.appendChild(textDiv);

  // 元のコンテンツを空にして新しい構造を追加
  block.textContent = '';
  block.appendChild(authorWrap);
}