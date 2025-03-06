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

import ArticleDataHandler from './classes/ArticleDataHandler.js';
import AccordionBuilder from './classes/AccordionBuilder.js';
import { createOptimizedPicture } from './aem.js';

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
    // do nothing
  }
}

/**
 * Teriaryボタン
 * @param {Element} element container element
 */
function decorateTertiaryButtons(element) {
  element.querySelectorAll('p > strong > em > a').forEach((a) => {
    const p = a.parentElement.parentElement.parentElement;
    if (
      // 親要素の構造を確認
      a.parentElement.tagName === 'EM'
      && a.parentElement.parentElement.tagName === 'STRONG'
      && p.tagName === 'P'
      // 各要素が単一の子要素のみを持つことを確認
      && a.parentElement.childNodes.length === 1
      && a.parentElement.parentElement.childNodes.length === 1
      && p.childNodes.length === 1
    ) {
      a.className = 'button tertiary';
      p.classList.add('button-container');
    }
  });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  // tertiary buttonの装飾を追加
  decorateTertiaryButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

class ArticleDisplay {
  constructor(container, groupedTags, extractedData) {
    this.container = container;
    this.groupedTags = groupedTags;
    this.extractedData = extractedData;
    this.currentIndex = 0;
    this.itemsPerPage = 9;
    this.filteredData = [...extractedData];
    this.tagContainer = document.createElement('div');
    this.tagContainer.className = 'tag-container';
  }

  static createInitialStructure() {
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
    this.container.innerHTML = ArticleDisplay.createInitialStructure();

    // アコーディオンの作成と追加
    const accordion = new AccordionBuilder(
      'キーワードから探す',
      this.tagContainer,
      true,
    ).build();

    // アコーディオンをp-index-contentに追加
    document.querySelector('.p-index-content').insertBefore(
      accordion,
      document.querySelector('.p-index-content').firstChild,
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

  createTagCheckboxes() {
    Object.entries(this.groupedTags).forEach(([groupName, tags]) => {
      const groupItem = document.createElement('div');
      const groupContainer = document.createElement('div');
      groupContainer.className = 'tag-group';
      groupItem.className = 'tag-group-item';

      const groupTitle = document.createElement('h3');
      groupTitle.className = 'tag-group-title';
      groupTitle.textContent = groupName;
      groupItem.appendChild(groupTitle);

      const tagList = document.createElement('ul');
      tagList.className = 'tag-list';

      tags.forEach((tag) => {
        const checkboxWrapper = document.createElement('li');
        checkboxWrapper.className = 'checkbox-wrapper';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${groupName}-${tag}`;
        checkbox.value = tag;
        checkbox.dataset.group = groupName;

        const label = document.createElement('label');
        label.htmlFor = `${groupName}-${tag}`;
        label.textContent = tag;
        label.className = 'tag-label';

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
        tagList.appendChild(checkboxWrapper);
      });

      groupItem.appendChild(tagList);
      groupContainer.appendChild(groupItem);
      this.tagContainer.appendChild(groupContainer);
    });

    // チェックボックスの変更イベントを一括で設定
    this.tagContainer.addEventListener('change', () => {
      this.filterArticles();
    });
  }

  /**
   * 選択されたタグに基づいて記事をフィルタリングする
   */
  filterArticles() {
    const selectedTagsByGroup = this.getSelectedTagsByGroup();
    this.filteredData = ArticleDisplay.filterDataByTags(this.extractedData, selectedTagsByGroup);
    this.updateDisplayAfterFiltering();
  }

  /**
   * 各グループで選択されているタグを取得する
   * @returns {Object} グループ名をキーとし、選択されたタグの配列を値とするオブジェクト
   */
  getSelectedTagsByGroup() {
    return Object.keys(this.groupedTags).reduce((acc, group) => {
      const checkboxes = this.tagContainer.querySelectorAll(`input[data-group="${group}"]:checked`);
      acc[group] = Array.from(checkboxes).map((cb) => cb.value);
      return acc;
    }, {});
  }

  /**
   * 記事データを選択されたタグでフィルタリングする
   * @param {Array} target - フィルタリング対象の記事データ配列
   * @param {Object} selectedTagsByGroup - グループごとの選択されたタグ
   * @returns {Array} フィルタリングされた記事データ配列
   */
  static filterDataByTags(data, selectedTagsByGroup) {
    const target = data;
    return target.filter((item) => {
      // 各グループのタグ選択状態をチェック
      const isItemValid = Object.entries(selectedTagsByGroup).every(([_, selectedTags]) => {
        // タグが選択されていない場合は true
        if (selectedTags.length === 0) return true;

        // 選択されたタグのいずれかが記事のタグに含まれているかチェック
        return selectedTags.some((tag) => item.tags.includes(tag));
      });

      return isItemValid;
    });
  }

  /**
   * フィルタリング後の表示を更新する
   */
  updateDisplayAfterFiltering() {
    this.updateArticleCount(this.filteredData.length);
    this.currentIndex = 0;
    const articleCardsList = this.container.querySelector('.articleCards-list');
    if (articleCardsList) {
      articleCardsList.innerHTML = '';
      this.displayItems(this.currentIndex);
      this.updateLoadMoreButton();
    }
  }

  /**
   * 記事件数の表示を更新する
   * @param {number} count - 表示する記事の件数
   */
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
      this.container.querySelector('.articleCards').insertBefore(
        newCountElement,
        this.container.querySelector('.articleCards-list'),
      );
    }
  }

  static createCardElement(data) {
    return `
      <li class="articleCards-card-item">
        <a href="${data.path}" class="articleCards-card-link">
          <div class="articleCards-card-image">
            ${createOptimizedPicture(data.imagePath, data.title, false, [{ width: '600' }]).outerHTML}
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
                  ${data.tags.map((tag) => `<li class="articleCards-card-tag">${tag}</li>`).join('')}
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
    if (!articleCardsList) return;

    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredData.length);
    const newCards = this.filteredData
      .slice(startIndex, endIndex)
      .map((data) => ArticleDisplay.createCardElement(data))
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
          const groupedTags = await articleDataHandler.getGroupedTags();

          // 4. 記事表示の初期化
          if (articleCardsContainer) {
            const articleDisplay = new ArticleDisplay(
              articleCardsContainer,
              groupedTags,
              extractedData,
            );
            await articleDisplay.initialize();
          }

          // 5. コンテナの移動
          topArticleWrap.appendChild(articleCardsContainer);
          topArticleWrap.appendChild(fragmentContainer);
        } catch (error) {
          // do nothing
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
          && !href.includes('https://main--aem-eds--softbankbtob.aem.page/')
          && !href.includes('https://www.softbank.jp/biz/')
          && !href.includes('http://localhost:3000/')) {
        link.setAttribute('target', '_blank');
      }
    });
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
    { title: 'ビジネスブログ', url: 'https://www.softbank.jp/biz/blog/business/' },
  ];

  // 現在のページのURLを取得
  const currentUrl = document.location.href;
  const isHomePage = currentUrl === 'https://www.softbank.jp/biz/'
    || currentUrl === 'https://main--aem-eds--softbankbtob.aem.page/'
    || currentUrl === 'https://main--softbank-eds-develop--aquaring.aem.page/'
    || currentUrl === 'http://localhost:3000/';

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
