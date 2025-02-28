/**
 * 目次ロックをデコレートする関数
* @param {HTMLElement} block - 目次ブロック要素
*/
export default function decorate(block) {
  // MutationObserverを作成
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes'
          && mutation.attributeName === 'data-section-status'
          && mutation.target.dataset.sectionStatus === 'loaded') {
        // article-container内のh2要素を取得
        const articleContainer = document.querySelector('.article-container') || document.querySelector('.contents-container');
        if (!articleContainer) return;

        const headings = articleContainer.querySelectorAll('h2');
        if (headings.length === 0) return;

        // 目次のリストを作成
        const ul = document.createElement('ul');

        // 現在のページのURLを取得
        const currentUrl = window.location.href.split('#')[0];

        // 各見出しに対してリストアイテムを作成
        headings.forEach((heading) => {
          // 特定のh2を除外
          if (heading.id === '同じタグがついた記事をみる') return;
          const li = document.createElement('li');
          const a = document.createElement('a');

          // アンカーリンクを設定
          a.href = `${currentUrl}#${heading.id}`;
          a.title = heading.textContent;
          a.textContent = heading.textContent;
          li.appendChild(a);
          ul.appendChild(li);
        });

        // 目次のタイトル要素の後にulを追加
        const titleP = block.querySelector('p');
        if (titleP) {
          titleP.after(ul);
        }
        observer.disconnect();
      }
    });
  });

  // 監視を開始
  const section = block.closest('.section');
  if (section) {
    observer.observe(section, {
      attributes: true,
      attributeFilter: ['data-section-status'],
    });
  }
}
