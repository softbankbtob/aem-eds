/**
 * ダウンロードバナーをデコレートする関数
 * @param {HTMLElement} block - ダウンロードバナーブロック要素
 */
export default function decorate(block) {
  // 元のコンテンツを取得
  const downloadBannerBlock = block.querySelector('.download-banner.block > div');
  if (!downloadBannerBlock) return;

  // 新しい構造のための要素を作成
  const anchor = document.createElement('a');
  anchor.href = downloadBannerBlock.querySelector('p a').href;
  anchor.title = downloadBannerBlock.querySelector('p a').title;

  const downloadBannerImg = document.createElement('div');
  downloadBannerImg.className = 'download-banner-img';

  const picture = downloadBannerBlock.querySelector('picture');
  if (picture) {
    downloadBannerImg.appendChild(picture.cloneNode(true));
  }

  const downloadBannerText = document.createElement('div');
  downloadBannerText.className = 'download-banner-text';

  // タイトルと説明文を移動
  const titleP = downloadBannerBlock.querySelector('div:nth-child(3) p:nth-child(1)');
  const descriptionP = downloadBannerBlock.querySelector('div:nth-child(3) p:nth-child(2)');

  if (titleP) {
    downloadBannerText.appendChild(titleP.cloneNode(true));
  }

  if (descriptionP) {
    downloadBannerText.appendChild(descriptionP.cloneNode(true));
  }

  // 新しい構造を組み立て
  anchor.appendChild(downloadBannerImg);
  anchor.appendChild(downloadBannerText);

  // 元のコンテンツを空にして新しい構造を追加
  downloadBannerBlock.textContent = '';
  downloadBannerBlock.appendChild(anchor);
}
