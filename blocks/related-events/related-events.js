export default async function decorate(block) {
  const ckParm = new Date().getTime().toString();
  const contentsEndpoint = `https://www.softbank.jp/biz/assets-api/execute.json/softbankbtob/all-events?${ckParm}`;
  const tagsEndpoint = `https://www.softbank.jp/biz/events/json/tag-lists.model.json?${ckParm}`;

  let endpoints = [fetch(contentsEndpoint), fetch(tagsEndpoint)];
  endpoints = await Promise.all(endpoints);

  let contents, tags;
  for (let i = 0; i < endpoints.length; i++) {
    if (i === 0) {
      contents = await endpoints[i].json();
    } else if (i === 1) {
      tags = await endpoints[i].json();
    };
  };

  contents = contents.data.eventsList.items;
  //配信日時が過ぎていた場合は処理をスキップ（アーカイブ以外）
  const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  const liveAllItems = contents.filter((item) => (item.style[0] !== "softbankbtob:events/style/archive") && (new Date(item.date_end) > jstNow));
   //リストの並び替え
  liveAllItems.sort((a, b) => (a.date_start > b.date_start ? 1 : -1));
  const archiveAllItems = pageList.filter((item) => item.style[0] === "softbankbtob:events/style/archive");
  archiveAllItems.sort((a, b) => (a.date_start < b.date_start ? 1 : -1));
  const eventList = [...liveAllItems, ...archiveAllItems];

  console.log(eventList)
}
