export default async function decorate(block) {
  //イベントとタグのJSON取得
  const ckParm = new Date().getTime().toString();
  const contentsEndpoint = `https://www.softbank.jp/biz/assets-api/execute.json/softbankbtob/all-events?${ckParm}`;
  const tagsEndpoint = `https://www.softbank.jp/biz/events/json/tag-lists.model.json?${ckParm}`;
  let endpoints = [fetch(contentsEndpoint), fetch(tagsEndpoint)];
  endpoints = await Promise.all(endpoints);
  let contentList, tagList;
  for (let i = 0; i < endpoints.length; i++) {
    if (i === 0) {
      contentList = await endpoints[i].json();
    } else if (i === 1) {
      tagList = await endpoints[i].json();
    };
  };

  //イベントリストの取得
  let events = contentList.data.eventsList.items;
  //配信日時が過ぎていた場合は処理をスキップ（アーカイブ以外）
  const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  const liveAllItems = events.filter((item) => (item.style[0] !== "softbankbtob:events/style/archive") && (new Date(item.date_end) > jstNow));
  //リストの並び替え
  liveAllItems.sort((a, b) => (a.date_start > b.date_start ? 1 : -1));
  const archiveAllItems = events.filter((item) => item.style[0] === "softbankbtob:events/style/archive");
  archiveAllItems.sort((a, b) => (a.date_start < b.date_start ? 1 : -1));
  events = [...liveAllItems, ...archiveAllItems];

  //タグ辞書の生成
  const categoryTags = tagList[":items"]["root"][":items"]["responsivegrid"][":items"]["container"][":items"]["container"][":items"]["list"]["listItems"][0]["categoryTags"];
  const categoryTagNames = tagList[":items"]["root"][":items"]["responsivegrid"][":items"]["container"][":items"]["container"][":items"]["list"]["listItems"][0]["categoryTagNames"];

  //blockに設定されているタグを取得
  // let tags = ['オンデマンド配信', 'ワークスタイルの変革'];
  let tags;
  if (block.querySelector('.related-events p')) {
    tags = block.querySelector('.related-events p').textContent.split(',').map(tag => tag.trim());
  };
  //タグのpathに変更
  tags = tags.map((tag) => {
    if (categoryTagNames.indexOf(tag) !== -1) {
      return categoryTags[categoryTagNames.indexOf(tag)];
    };
  });

  //blockに設定されているタグが含まれているページのデータのみ抽出（同一カテゴリはAND、別カテゴリはOR）
  //タグをタイプごとに分類
  const tagTypeMap = new Map();
  tags.forEach((tag) => {
    const type = tag.match(/^softbankbtob:[\w:/-]+\/([\w:/-]+)\/[\w:/-]+$/)[1];
    if (type) tagTypeMap.has(type) ? tagTypeMap.get(type).push(tag) : tagTypeMap.set(type, [tag]);
  });

  //抽出
  let result;
  if (events.length) {
    function getIsDuplicate(arr1, arr2) {
      return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length > 0;
    };

    result = [...events];
    tagTypeMap.forEach((tagValsArray, type) => {
      if (type === 'style') {
        result = result.filter((page) => getIsDuplicate(page.style, tagValsArray));
      } else {
        result = result.filter((page) => getIsDuplicate(page.keyword, tagValsArray));
      };
    });
  } else {
    result = [];
  };

  //ブロックに挿入
  if (result.length) {
    /**
      * 各ページに設定されている日付を生成する
      * @returns {String} 各ページに設定されている日付（ISO 8601）の形式を変換
      */
    function createEventDate(item) {
      let dateStr;
      const seminarStartDate = new Date(item.date_start);
      const seminarEndDate = new Date(item.date_end);
      const startDate = `${seminarStartDate.getFullYear()}年${seminarStartDate.getMonth() + 1}月${seminarStartDate.getDate()}日`;
      const startDayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][seminarStartDate.getDay()];
      let endDate = `${seminarEndDate.getFullYear()}年${seminarEndDate.getMonth() + 1}月${seminarEndDate.getDate()}日`;
      if (startDate === endDate) {
        //開催日と終了日が同じ場合
        const startTime = `${seminarStartDate.getHours().toString().padStart(2, "0")}:${seminarStartDate.getMinutes().toString().padStart(2, "0")}`;
        const endTime = `${seminarEndDate.getHours().toString().padStart(2, "0")}:${seminarEndDate.getMinutes().toString().padStart(2, "0")}`;
        dateStr = `${startDate}(${startDayOfWeek})${startTime}-${endTime}`;
      } else {
        //開催日と終了日が異なる場合（複数開催）
        endDate = `${seminarEndDate.getMonth() + 1}月${seminarEndDate.getDate()}日`;
        const endDayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][seminarEndDate.getDay()];
        dateStr = `${startDate}(${startDayOfWeek})-${endDate}(${endDayOfWeek})`;
      }
      return dateStr;
    };

    block.innerHTML = '';
    for (let i = 0; i < result.length; i++) {
      if (i === 3) break;
      const item = document.createElement('div');
      item.classList.add('related-events-items');
      item.innerHTML = `
        <div data-align="justify" class="related-events-tag"><p><a href="${result[i].url}" title="${categoryTagNames[categoryTags.indexOf(result[i].style[0])]}" class="" target="_blank">${categoryTagNames[categoryTags.indexOf(result[i].style[0])]}</a></p></div>
        <div data-align="justify" class="related-events-date">${result[i].style[0] !== "softbankbtob:events/style/archive" ? createEventDate(item) : ""}</div>
        <div data-align="justify" class="related-events-events"><p><a href="${result[i].url}" title="${result[i].title.plaintext}" class="" target="_blank">${result[i].title.plaintext}</a></p></div>
      `;
      block.appendChild(item);
    };
  };
};
