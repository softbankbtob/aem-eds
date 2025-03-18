export default async function decorate() {
  function getIsDuplicate(arr1, arr2) {
    return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length > 0;
  };

  const orign = location.origin;
  const queryIndexRes = await fetch(`${orign}/query-index.json`);
  const tagListRes = await fetch(`${orign}/tag-list.json`);
  const queryIndex = await queryIndexRes.json();
  const tagList = await tagListRes.json();
  
  let format, tags, display;  
  document.querySelectorAll('.pagelist p').forEach((p, i) => {
    if (i === 1) format = p.textContent;
    if (i === 3) tags = p.textContent.split(',');
    if (i === 5) display = p.textContent;
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
  } else {
    result = [];
  };
  
  const iframe = document.createElement('iframe');
  iframe.src = '/tools/sidekick/blocks/card';
  iframe.style.display = 'none';
  iframe.onload = function() {
    setTimeout(() => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const cardsBlock = iframeDoc.querySelector('.cards.block.borderradius');
        result.forEach((page, i) => {
          if (i < 3) {
            //書き換え対象の取得
            const item = cardsBlock.querySelectorAll('ul')[0].children[i];

            //一覧表示させるページ情報の取得
            const pageNavigationTitle = page.navigation-title;
            const pageImage = page.image;
            const pagePath = page.path;
            const pageTags = page.tags;
            
            //pathの書き換え
            item.querySelector('a').href = pagePath;
            
            //画像pathの書き換え
            let sourcePath = item.querySelector('picture > source').srcset;
            sourcePath = sourcePath.replace(sourcePath.split('?')[0], pageImage.split('?')[0]);
            item.querySelector('picture > source').srcset = sourcePath;
            let imgSrc = item.querySelector('img').src;
            imgSrc = imgSrc.repeat(imgSrc.split('?')[0], pageImage.split('?')[0]);
            item.querySelector('img').src = imgSrc;
            console.log(item);
          } else {
            
          };
        });
      } catch(error) {
        console.error('Error accessing iframe content:', error);
      };
    }, 1000);
  };

  document.querySelector('.pagelist.block').append(iframe);
};
