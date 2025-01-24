import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from './aem.js';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);

    const firstChild = main.firstElementChild;

    if (firstChild && firstChild.classList.contains('carousel-container')) {
      const carouselContainer = firstChild;
      const articleCardsContainer = document.createElement('div');
      articleCardsContainer.className = 'articleCards-container';
      const fragmentContainer = main.querySelector('.fragment-container');

      // mainタグにクラス付与
      main.classList.add('p-index');

      if (carouselContainer.nextElementSibling === fragmentContainer) {
        // DOM構築を順番に実行
        try {
          // 1. top-article-wrapの作成と配置
          const wrapParent = document.createElement('div');
          const topArticleWrap = document.createElement('div');
          wrapParent.className = 'p-index-content';
          topArticleWrap.className = 'section top-article-wrap';
          wrapParent.appendChild(topArticleWrap);
          main.insertBefore(wrapParent, fragmentContainer);

          // 2. JSONデータの取得
          const response = await fetch('/query-index.json');
          if (!response.ok) throw new Error('Network response was not ok');
          const jsonData = await response.json();

          // 3. データの処理
          const articleDataHandler = new ArticleDataHandler(jsonData);
          const extractedData = await articleDataHandler.extractData();
          const uniqueTags = articleDataHandler.getUniqueTags();

          // 4. 記事表示の初期化
          if (articleCardsContainer) {
            const articleDisplay = new ArticleDisplay(articleCardsContainer, uniqueTags, extractedData);
            await articleDisplay.initialize();
          }

          // 5. コンテナの移動
          topArticleWrap.appendChild(articleCardsContainer);
          topArticleWrap.appendChild(fragmentContainer);

        } catch (error) {
          console.error('DOM construction failed:', error);
        }
      }
    }
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }


  // 各aタグに対してtarget="_blank"を設定（別窓処理）
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const { href } = link;
    if (!href.includes('https://main--softbank-eds-develop--aquaring.aem.page/')
        && !href.includes('https://www.softbank.jp/biz/')
        && !href.includes('http://localhost:3000/')) {
      link.setAttribute('target', '_blank');
    }
  });
}


class ArticleDataHandler {
  constructor(jsonData) {
    this.jsonData = jsonData;
  }

  extractData() {
    const absolutePath = "";
    return this.jsonData.data.map(item => {
      const lastModifiedDate = new Date(item.lastModified * 1000);
      const formattedDate = `${lastModifiedDate.getFullYear()}/${String(lastModifiedDate.getMonth() + 1).padStart(2, '0')}/${String(lastModifiedDate.getDate()).padStart(2, '0')}`;

      return {
        title: item['navigation-title'] || item.title,
        path: absolutePath + item.path,
        imagePath: absolutePath + item.image,
        tags: item.tags ? JSON.parse(item.tags).flatMap(tag => tag.split(',').map(t => t.replace(/\s+/g, '').trim())) : [],
        lastModified: formattedDate
      };
    });
  }

  getUniqueTags() {
    return [...new Set(this.jsonData.data.flatMap(item => {
      return item.tags ? JSON.parse(item.tags).flatMap(tag => tag.split(',').map(t => t.replace(/\s+/g, '').trim())) : [];
    }))];
  }
}

class AccordionBuilder {
  constructor(title, content, isOpen = true) {
    this.title = title;
    this.content = content;
    this.isOpen = isOpen;
  }

  build() {
    // アコーディオン全体を囲むコンテナ
    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'accordion-container';

    const accordion = document.createElement('details');
    accordion.className = 'accordion';
    if (this.isOpen) accordion.setAttribute('open', '');

    const header = document.createElement('summary');
    header.className = 'accordion-header';
    
    // ヘッダーテキストを包むspan
    const headerText = document.createElement('span');
    headerText.className = 'accordion-title';
    headerText.textContent = this.title;
    header.appendChild(headerText);

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.appendChild(this.content);

    accordion.appendChild(header);
    accordion.appendChild(content);
    accordionContainer.appendChild(accordion);

    return accordionContainer;
  }
}

class ArticleDisplay {
  constructor(container, uniqueTags, extractedData) {
    this.container = container;
    this.uniqueTags = uniqueTags;
    this.extractedData = extractedData;
    this.currentIndex = 0;
    this.itemsPerPage = 9;
    this.filteredData = [...extractedData];
    this.tagContainer = document.createElement('ul');
    this.tagContainer.className = 'tag-container';
  }
  createInitialStructure() {
    return `
      <div class="articleCards-wrapper">
        <div class="articleCards" >
          <ul class="articleCards-list"></ul>
        </div>
      </div>
      <div class="load-more-container">
        <button class="load-more-button">もっと見る</button>
      </div>
    `;
  }

  async initialize() {
    this.createTagCheckboxes();
    this.container.innerHTML = this.createInitialStructure();
    
    // アコーディオンの作成と追加
    const accordion = new AccordionBuilder(
      'カテゴリーから探す',
      this.tagContainer,
      true
    ).build();

    // アコーディオンをp-index-contentに追加
    document.querySelector('.p-index-content').insertBefore(
      accordion,
      document.querySelector('.p-index-content').firstChild
    );

    this.displayItems(this.currentIndex);
    this.updateLoadMoreButton();
    
    // 記事件数を表示するDOMを作成
    this.updateArticleCount(this.extractedData.length); // 初期値として全件数を表示
  
    const loadMoreButton = this.container.querySelector('.load-more-button');
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', async () => {
        this.displayItems(this.currentIndex);
      });
    }
  }

  // 記事件数を更新する
  updateArticleCount(count) {
    const articleCountClass = 'article-count';
    const articleCountNumClass = 'article-count-num';
    const articleCountText = `該当する記事<span class="${articleCountNumClass}">${count}</span>件（新着順）`;
    const articleCountElement = this.container.querySelector(`.${articleCountClass}`);

    if (articleCountElement) {
      articleCountElement.innerHTML = articleCountText;
    } else {
      const newCountElement = document.createElement('div');
      newCountElement.className = articleCountClass;
      newCountElement.innerHTML = articleCountText;
      this.container.querySelector('.articleCards').insertBefore(newCountElement, this.container.querySelector('.articleCards-list'));
    }
  }

  createTagCheckboxes() {
    this.uniqueTags.forEach(tag => {
      const checkboxWrapper = document.createElement('li');
      checkboxWrapper.className = 'checkbox-wrapper';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = tag;
      checkbox.value = tag;
  
      const label = document.createElement('label');
      label.htmlFor = tag;
      label.textContent = tag;
      label.className = 'tag-label';
  
      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);
      this.tagContainer.appendChild(checkboxWrapper);
  
      checkbox.addEventListener('change', () => {
        this.filterArticles();
      });
    });
  }

  filterArticles() {
    const selectedTags = Array.from(document.querySelectorAll('.tag-container input:checked')).map(input => input.value);
    
    if (selectedTags.length > 0) {
      this.filteredData = this.extractedData.filter(data => {
        // いずれかの選択されたタグを含む記事をフィルタリング
        return data.tags && selectedTags.some(tag => data.tags.includes(tag));
      });
    } else {
      this.filteredData = [...this.extractedData];
    }
  
    // フィルタリング後の件数を更新
    this.updateArticleCount(this.filteredData.length);
  
    // リストをクリアして再表示
    this.currentIndex = 0;
    const articleCardsList = this.container.querySelector('.articleCards-list');
    if (articleCardsList) {
      articleCardsList.innerHTML = '';
      this.displayItems(this.currentIndex);
      this.updateLoadMoreButton();
    }
  }

  createCardElement(data) {
    return `
      <li class="articleCards-card-item">
        <a href="${data.path}" class="articleCards-card-link">
          <div class="articleCards-card-image">
            <picture>
              <img loading="lazy" alt="" src="${data.imagePath}">
            </picture>
          </div>
          <div class="articleCards-card-body">
            <div class="articleCards-card-date">
              <p>${data.lastModified}</p>
            </div>
            <div class="articleCards-card-title">
              <p id="${data.title.replace(/\s+/g, '-')}">${data.title}</p>
            </div>
            ${data.tags.length ? `
              <div class="articleCards-card-tags">
                <ul class="articleCards-card-tags-list">
                  ${data.tags.map(tag => `<li class="articleCards-card-tag">${tag}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </a>
      </li>
    `;
  }

  displayItems(startIndex) {
    const articleCardsList = this.container.querySelector('.articleCards-list');
    if (!articleCardsList) return; // カードリストが見つからない場合は処理を中止
      
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredData.length);
    const newCards = this.filteredData
      .slice(startIndex, endIndex)
      .map(data => this.createCardElement(data))
      .join('');
    
    articleCardsList.insertAdjacentHTML('beforeend', newCards);
    this.currentIndex = endIndex;
    this.updateLoadMoreButton();
  }


  updateLoadMoreButton() {
    const loadMoreButton = this.container.querySelector('.load-more-button');
    if (loadMoreButton) {
      if (this.currentIndex >= this.filteredData.length) {
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'flex';
      }
    }
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

/**
 * パンくずリストを作成する
 * @returns {Promise<HTMLElement>} パンくずリスト要素
 */
export async function buildBreadcrumbs() {
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'breadcrumbs';

  const crumbs = [
    { title: '法人のお客様', url: 'https://www.softbank.jp/biz/' },
    { title: 'ブログ', url: 'https://www.softbank.jp/biz/blog/' },
    { title: 'ビジネスブログ', url: 'https://www.softbank.jp/biz/blog/business/' }
  ];

  // 現在のページのURLを取得
  const currentUrl = document.location.href;
  const isHomePage =
    currentUrl === 'https://www.softbank.jp/biz/' ||
    currentUrl === 'https://main--softbank-eds-develop--aquaring.aem.page/' ||
    currentUrl === 'http://localhost:3000/';

  const ol = document.createElement('ol');
  crumbs.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.title;
    li.append(a);
    ol.appendChild(li);
  });

  // トップページ以外の場合、現在のページの情報を追加
  if (!isHomePage) {
    const h1 = document.querySelector('h1');
    if (h1) {
      const currentItem = document.createElement('li');
      const currentLink = document.createElement('a');
      currentLink.href = currentUrl;
      currentLink.textContent = h1.textContent;
      currentItem.appendChild(currentLink);
      ol.appendChild(currentItem);
    }
  }

  breadcrumbs.append(ol);
  return breadcrumbs;
}

loadPage();
