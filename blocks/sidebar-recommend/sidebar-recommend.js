export default function decorate(block) {
  // ulを作成
  const ul = document.createElement('ul');
  ul.className = 'sidebar-recommend';

  // 各記事をliに変換
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'sidebar-recommend-item';

    // aタグを作成
    const link = document.createElement('a');
    const linkUrl = row.querySelector('a').href;
    const linkTitle = row.querySelector('a').title;
    link.href = linkUrl;
    link.title = linkTitle;

    // pictureとpを取得してaタグに追加
    const picture = row.querySelector('picture');
    const text = row.querySelector('div:nth-child(2) p').textContent;
    
    link.appendChild(picture);
    
    const p = document.createElement('p');
    p.textContent = text;
    link.appendChild(p);

    li.appendChild(link);
    ul.appendChild(li);
  });

  // 元のブロックの中身を空にして新しい要素を追加
  block.textContent = '';
  block.appendChild(ul);
}