export default async function decorate() {
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

  // タグとtypeの辞書を作成
  const tagTypeMap = {};
  tagListData.forEach(item => {
      tagTypeMap[item.tag] = item.type;
  });

  // typeごとにタグを分類
  const typeTagMap = {};
  tags.forEach(tag => {
      const tagType = tagTypeMap[tag];
      if (tagType) {
          if (!typeTagMap[tagType]) {
              typeTagMap[tagType] = [];
          }
          typeTagMap[tagType].push(tag);
      };
  });

  function findBlogPosts(posts, typeTagMap) {
      return posts.filter(post => {
          const postTags = JSON.parse(post.tags.replace(/'/g, "\""));
          return Object.keys(typeTagMap).some(type => 
              typeTagMap[type].every(tag => postTags.includes(tag))
          );
      });
  }

  const filteredPosts = findBlogPosts(queryIndexData, typeTagMap);
  console.log(filteredPosts);
};
