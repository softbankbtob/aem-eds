import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * media-normalブロックを装飾する関数
 * @param {HTMLElement} block - 装飾対象のブロック要素
 */
export default function decorate(block) {
  // クラス名の定義
  const baseClass = 'media-normal';
  const itemsClass = `${baseClass}-items`;
  const imgClass = `${baseClass}-img`;
  const contentClass = `${baseClass}-content`;
  const buttonWrapClass = `${baseClass}-button-wrap`;

  // 画像の最適化設定
  const breakpoints = [
    { media: '(min-width: 600px)', width: '2000' },
    { width: '750' },
  ];

  // 各アイテムを処理
  [...block.children].forEach((row) => {
    // 親divにクラスを追加
    row.className = itemsClass;

    // 子要素を処理
    [...row.children].forEach((div) => {
      // imgタグの有無でクラスを決定
      if (div.querySelector('img')) {
        div.className = imgClass;
      } else {
        div.className = contentClass;
      }

      // data-alignとdata-valignの処理
      if (div.hasAttribute('data-align')) {
        const alignValue = div.getAttribute('data-align');
        div.style.textAlign = alignValue;
      }

      if (div.hasAttribute('data-valign')) {
        const valignValue = div.getAttribute('data-valign');
        div.style.verticalAlign = valignValue;
      }
    });

    // 画像部分の処理
    const imgDiv = row.querySelector(`.${imgClass}`);
    if (imgDiv) {
      // 画像の最適化
      const img = imgDiv.querySelector('img');
      if (img) {
        const picture = img.closest('picture');
        if (picture) {
          // 既存のpicture要素を最適化されたものに置き換える
          const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, breakpoints);
          picture.replaceWith(optimizedPicture);
        }
      }
    }

    // 内容部分の処理
    const contentDiv = row.querySelector(`.${contentClass}`);
    if (contentDiv) {
      // ボタンコンテナを処理
      const buttonContainers = contentDiv.querySelectorAll('p.button-container');
      if (buttonContainers.length > 0) {
        // ボタンラップ要素を作成
        const buttonWrap = document.createElement('div');
        buttonWrap.className = buttonWrapClass;
        // 最初のボタンコンテナの位置を特定
        const firstButtonContainer = buttonContainers[0];
        const { parentElement } = firstButtonContainer;
        const firstButtonIndex = Array.from(parentElement.children).indexOf(firstButtonContainer);
        // すべてのボタンコンテナをボタンラップに移動
        buttonContainers.forEach((container) => {
          buttonWrap.appendChild(container);
        });
        // 元の位置にボタンラップを挿入
        parentElement.insertBefore(buttonWrap, parentElement.children[firstButtonIndex] || null);
      }
    }

    // link-all判定を追加
    const isLinkAll = block.classList.contains('link-all') && row.querySelector('a');

    // link-allの場合は行全体をリンクに変換
    if (isLinkAll) {
      const innerLink = row.querySelector('a');
      if (innerLink) {
        // ボタンラップを削除
        const buttonWrap = row.querySelector(`.${buttonWrapClass}`);
        if (buttonWrap) {
          buttonWrap.remove();
        }

        // ボタンコンテナを削除
        row.querySelectorAll('.button-container').forEach((container) => {
          container.remove();
        });

        const linkWrapper = document.createElement('a');
        linkWrapper.href = innerLink.href;
        linkWrapper.className = itemsClass;
        linkWrapper.classList.add('-link');
        linkWrapper.append(...row.childNodes);
        row.replaceWith(linkWrapper);
      }
    }
  });
}
