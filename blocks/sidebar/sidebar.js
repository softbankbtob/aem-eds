export default function decorate(block) {
  // sidebar-containerを取得
  const sidebarContainer = block.closest('.sidebar-container');

  // sidebar-container内の要素を削除
  if (sidebarContainer) {
    // sidebar-container内の全てのsidebar-wrapperを削除
    const sidebarBlocks = sidebarContainer.querySelectorAll('.sidebar-wrapper');
    sidebarBlocks.forEach((sidebarBlock) => {
      sidebarContainer.removeChild(sidebarBlock);
    });

    // "p.button-container"を"div.sidebar-button"に書き換え
    const buttonContainer = sidebarContainer.querySelector('.default-content-wrapper p.button-container');
    if (buttonContainer) {
      const newButtonDiv = document.createElement('div');
      newButtonDiv.className = 'sidebar-button';
      newButtonDiv.innerHTML = buttonContainer.innerHTML; // 元の内容を保持

      // buttonContainerがsidebarContainerの子であることを確認
      if (buttonContainer.parentNode) {
        buttonContainer.parentNode.replaceChild(newButtonDiv, buttonContainer);
      }

      // div.sidebar-button内のa.buttonのクラス名を削除
      const buttonLink = newButtonDiv.querySelector('a.button');
      if (buttonLink) {
        buttonLink.className = ''; // クラス名を削除
      }
    }

    // トップ用
    // cardsとsidebarを囲むdivを生成
    const main = document.querySelector('main');
    if (main) {
      const cardsContainer = main.querySelector('.cards-container');
      const fragmentContainer = main.querySelector('.fragment-container');
      
      if (cardsContainer && cardsContainer.nextElementSibling === fragmentContainer) {
        // top-article-wrapを作成
        const topArticleWrap = document.createElement('div');
        topArticleWrap.className = 'section top-article-wrap';

        // 既存の要素を新しいdivで囲む
        main.insertBefore(topArticleWrap, fragmentContainer); // mainを親要素として使用
        topArticleWrap.appendChild(cardsContainer);
        topArticleWrap.appendChild(fragmentContainer);
      }
    }
  }
}