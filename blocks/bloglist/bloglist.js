export default async function decorate() {
  const orign = location.origin;
  const queryIndexRes = await fetch(`${orign}/query-index.json`);
  const tagListRes = await fetch(`${orign}/tag-list.json`);
  const queryIndex = await queryIndexRes.json();
  const tagList = await tagListRes.json();
  
  let tags, display;  
  document.querySelectorAll('.bloglist p').forEach((p, i) => {
    if (i === 1) tags = p.textContent.split(',');
    if (i === 3) display = p.textContent;
  });

  let queryIndexData = queryIndex.data;
  let tagListData = tagList.data;
  queryIndexData = queryIndexData.filter(item => item.path.indexOf('/blog/business/articles/') > -1);

  queryIndexData.forEach((page) => {
    page.tags = JSON.parse(page.tags);
    if(page.tags.length) page.tags = page.tags[0]?.split(', ');
  });

  const tagTypeMap = new Map();
  tags.forEach((tag) => {
    const type = tagListData.find((data) => data.tag === tag)?.type;
    if (type) tagTypeMap.has(type) ? tagTypeMap.get(type).push(tag) : tagTypeMap.set(type, [tag]);
  });
  
  let result;
  if (queryIndexData.length) {
    result = [...queryIndexData];
    tagTypeMap.forEach( tagValArray => result = result.filter((page) => getIsDuplicate(page.tags, tagValArray)));

    function getIsDuplicate(arr1, arr2) {
      return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length > 0;
    };

  } else {
    result = [];
  };
  
  const iframe = document.createElement('iframe');
  iframe.src = '/tools/sidekick/blocks/cards-borderradius';
  iframe.style.display = 'none';
  iframe.onload = function() {
    setTimeout(() => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const cardsBlock = iframeDoc.querySelector('.cards.block.borderradius');
        function cardBlockUpdate(item, page) {
          //ページ情報の取得
          const pageNavigationTitle = page["navigation-title"];
          const pageImage = page.image;
          const pagePath = page.path;
          const pageTags = page.tags;
          const pageLastModified = Number(page.lastModified);

          //pathの書き換え
          item.querySelector('a').href = pagePath;

          //画像pathの書き換え
          const source = item.querySelector('picture > source');
          let sourcePath = source.srcset;
          sourcePath = sourcePath.replace(sourcePath.split('?')[0], pageImage.split('?')[0]);
          source.srcset = sourcePath;
          const img = item.querySelector('img');
          let imgSrc = img.src;
          imgSrc = imgSrc.replace(imgSrc.split('?')[0], pageImage.split('?')[0]);
          item.querySelector('img').src = imgSrc;

          // テキスト部分
          const cardBody = item.querySelector('.cards-card-body');

          // 日付の書き換え
          const p = cardBody.querySelector('p');
          const date = new Date(pageLastModified * 1000);
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          p.textContent = `${year}/${month}/${day}`;

          //タイトルの書き換え
          const h3 = cardBody.querySelector('h3');
          h3.id = '';
          h3.textContent = pageNavigationTitle;

          //タグの書き換え
          const liEls = cardBody.querySelectorAll('ul > li');
          liEls.forEach((li, i) => li.textContent = pageTags[i]);

          return item;
        };

        //自動で表示するカードを作成する
        result.forEach((page, i) => {
          if (display === 'part' && i === 2) return;
          if (i < 3) {
            const item = cardsBlock.querySelectorAll('ul')[0].children[i];
            cardBlockUpdate(item, page);
          } else {
            const item = cardsBlock.querySelectorAll('ul')[0].children[0].cloneNode(true);
            cardsBlock.querySelectorAll('ul')[0].appendChild(cardBlockUpdate(item, page));
          };
        });

        let loadMoreButtonContainer;
        if (display === 'all') {
          cardsBlock.querySelectorAll('ul')[0].children.forEach((child, i) => i > 2 && child.style.display === 'none');
          loadMoreButtonContainer = document.createElement('div');
          loadMoreButtonContainer.classList.add('load-more-container');
          loadMoreButtonContainer.innerHTML = '<button class="load-more-button" style="display: flex;">もっと見る</button>';
          loadMoreButtonContainer.querySelector('button').addEventListener('click', () => {
            const hiddenItems = Array.from(cardsBlock.querySelectorAll('ul')[0].children).filter(child => child.style.display === 'none');
            hiddenItems.forEach((item, i) => {
              if (i < 9) {
                item.style.display === 'block';
                hiddenItems.splice(i, 1);
              };
            });
            hiddenItems.length === 0 && this.remove();
          });
        };

        //作成したカードをHTMLに挿入
        const bloglistWrapper = document.querySelector('.bloglist-wrapper');
        bloglistWrapper.innerHTML = '';
        bloglistWrapper.append(cardsBlock);
        loadMoreButtonContainer && bloglistWrapper.append(loadMoreButtonContainer);

        //card.cssがない場合は追加
        const isExistCardCss = Array.from(document.querySelectorAll('link')).find(link => link.getAttribute('href').indexOf('cards.css') !== -1);
        if (!isExistCardCss) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/blocks/cards/cards.css';
          document.querySelector('head').appendChild(link);
        };
      } catch(error) {
        console.error('Error accessing iframe content:', error);
      };
    }, 500);
  };

  document.querySelector('.bloglist.block').append(iframe);
};
