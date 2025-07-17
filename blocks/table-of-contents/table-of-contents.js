/**
 * 目次ブロックをデコレートする関数
 * @param {HTMLElement} block - 目次ブロック要素
 */
export default function decorate(block) {
  // MutationObserverを作成
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes'
          && mutation.attributeName === 'data-section-status'
          && mutation.target.dataset.sectionStatus === 'loaded') {
        createTableOfContents(block);
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

/**
 * 目次を作成する
 * @param {HTMLElement} block - 目次ブロック要素
 */
function createTableOfContents(block) {
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
    
    // アンカーアイコンを追加
    const iconSpan = createAnchorIcon();
    a.appendChild(iconSpan);
    
    li.appendChild(a);
    ul.appendChild(li);
  });

  // 目次のタイトル要素の後にulを追加
  const titleP = block.querySelector('p');
  if (titleP) {
    titleP.after(ul);
  }

  // スムーススクロールの設定
  setupSmoothScroll(ul);
}

/**
 * アンカーアイコン要素を作成する
 * @returns {HTMLElement} アンカーアイコンのspan要素
 */
function createAnchorIcon() {
  const iconSpan = document.createElement('span');
  iconSpan.className = 'icon icon-anchor-blue';
  
  const iconImg = document.createElement('img');
  iconImg.setAttribute('data-icon-name', 'anchor-blue');
  iconImg.src = '/icons/anchor-blue.svg';
  iconImg.alt = '';
  iconImg.loading = 'lazy';
  
  iconSpan.appendChild(iconImg);
  return iconSpan;
}

/**
 * スムーススクロールを設定する
 * @param {HTMLElement} list アンカーリンクのリスト要素
 */
function setupSmoothScroll(list) {
  const anchorLinks = list.querySelectorAll('a');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const href = link.getAttribute('href');
      const targetId = href.substring(href.indexOf('#') + 1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // URLのハッシュも更新
        history.pushState(null, null, href);
      }
    });
  });
}
