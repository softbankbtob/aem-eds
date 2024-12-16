export default function decorate(block) {
  // section.article-main-containerが存在する場合
  const articleMainContainer = document.querySelector('.section.article-main-container');
  const main = document.querySelector('main');

  if (articleMainContainer) {
    // mainタグに"page-article"のクラスを付与
    main.classList.add('page-article');

    // article-containerを作成
    const articleContainer = document.createElement('div');
    articleContainer.className = 'article-container';

    // mainタグ直下の要素を取得
    const children = Array.from(main.children);

    // section.article-main-containerとsection.fragment-container以外の要素をarticle-containerに移動
    children.forEach((child) => {
      if (!child.classList.contains('article-main-container') && !child.classList.contains('fragment-container')) {
        articleContainer.appendChild(child);
      }
    });

    // article-containerをmainタグに追加
    main.insertBefore(articleContainer, articleMainContainer.nextSibling);
  }

  // page-article-containerを追加
  const pageArticleContainer = document.createElement('div');
  pageArticleContainer.className = 'page-article-container';

  // mainの中身をすべてpage-article-containerに入れる
  const pageArticleChildren = Array.from(main.children);
  pageArticleChildren.forEach((child) => {
    pageArticleContainer.appendChild(child);
  });

  // page-article-containerをmainの直下に追加
  main.appendChild(pageArticleContainer);
}