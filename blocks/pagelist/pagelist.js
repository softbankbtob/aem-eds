export default async function decorate() {
  const orign = location.origin;
  const queryIndexRes = await fetch(`${orign}/query-index.json`);
  const tagListRes = await fetch(`${orign}/tag-list.json`);
  let queryIndex = await queryIndexRes.json();
  let tagList = await tagListRes.json();
  queryIndex = JSON.parse(queryIndex);
  tagList = JSON.parse(tagList);

  let format, tags, display;  
  document.querySelectorAll('.pagelist p').forEach((p, i) => {
    if (i === 1) format = p.textContent;
    if (i === 3) tags = p.textContent.split(',');
    if (i === 5) display = p.textContent;
  });

  console.log(queryIndex);
  console.log(tagList);
};
