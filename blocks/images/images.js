export default function decorate(block) {
  [...block.children].forEach((row) => {
    const picture = row.querySelector('picture');
    const link = row.querySelector('a');

    // リンク付き画像
    if (picture && link) {
      const { href } = link;

      // target="_blank"を設定
      if (!href.includes('https://main--softbank-eds-develop--aquaring.aem.page/')
          && !href.includes('https://main--aem-eds--softbankbtob.aem.page/')
          && !href.includes('https://www.softbank.jp/biz/')
          && !href.includes('http://localhost:3000/')) {
        link.setAttribute('target', '_blank');
      }

      // 新しいaタグを作成
      const newLink = document.createElement('a');
      newLink.href = href;

      // linkのtargetを新しいリンクに引き継ぐ
      const target = link.getAttribute('target');
      if (target) {
        newLink.setAttribute('target', target);
      }

      // リンク内に画像を配置
      newLink.appendChild(picture);

      // 元のrowの内容を新しいリンクで置き換え
      row.textContent = '';
      row.appendChild(newLink);
    }
  });
}
