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

  const tagToType = tagListData.reduce((acc, { tag, type }) => {
    acc[tag] = type;
    return acc;
  }, {});

  const typeToTags = tags.reduce((acc, tag) => {
    const tagType = tagToType[tag];
    if (!acc[tagType]) {
      acc[tagType] = [];
    }
    acc[tagType].push(tag);
    return acc;
  }, {});

  const filteredBlogs = queryIndexData.filter((blog) => {
    const tags = blog.tags;
    return Object.entries(typeToTags).every(([type, tagsList]) => {
      if (type === "キーワード" || type === "カテゴリー") {
        // OR条件
        return tagsList.some((tag) => tags.includes(tag));
      } else {
        // AND条件
        return tagsList.every((tag) => tags.includes(tag));
      }
    });
  });

  console.log(filteredBlogs);
};
