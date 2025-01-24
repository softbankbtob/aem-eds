export default function decorate(block) {
  // 各サービスアイテムを処理
  const relatedServicesList = document.createElement('ul');

  [...block.children].forEach((row) => {
    // 各サービスアイテムを作成
    const serviceItem = document.createElement('li');
    serviceItem.className = 'related-services-items';

    // aタグを作成
    const link = document.createElement('a');
    const linkUrl = row.querySelector('a').href;
    const linkTitle = row.querySelector('a').title;
    link.href = linkUrl;
    link.title = linkTitle;

    // 画像用のdivを作成
    const imageDiv = document.createElement('div');
    imageDiv.className = 'related-services-image';
    const picture = row.querySelector('picture').cloneNode(true);
    imageDiv.appendChild(picture);

    // テキスト用のdivを作成
    const textDiv = document.createElement('div');
    textDiv.className = 'related-services-text';

    // タイトルと説明を取得
    const title = row.querySelector('div:nth-child(2) p strong').textContent;
    const description = row.querySelector('div:nth-child(2) p:nth-child(2)').textContent;

    // タイトルと説明を追加
    const titleElement = document.createElement('p');
    titleElement.innerHTML = `<strong>${title}</strong>`;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    textDiv.appendChild(titleElement);
    textDiv.appendChild(descriptionElement);

    // aタグに画像とテキストを追加
    link.appendChild(imageDiv);
    link.appendChild(textDiv);

    // サービスアイテムにaタグを追加
    serviceItem.appendChild(link);
    relatedServicesList.appendChild(serviceItem);
  });

  // 元のブロックの中身を空にして新しい要素を追加
  block.textContent = '';
  block.appendChild(relatedServicesList);
}
