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
  
  const result = tagTypeMap.forEach((tagValArray) => {
    if (queryIndexData.length) {
      return result = queryIndexData.filter((page) => getIsDuplicate(page.tags, tagValArray));
    } else {
      return queryIndexData;
    };
  });

  console.log(result);
};
