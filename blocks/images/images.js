export default function decorate(block) {
  [...block.children].forEach((row) => {
    const picture = row.querySelector('picture');
    const link = row.querySelector('a');
    
    // リンク付き画像
    if (picture && link) {
      const href = link.href;
      
      // 新しいaタグを作成
      const newLink = document.createElement('a');
      newLink.href = href;
      
      // リンク内に画像を配置
      newLink.appendChild(picture);
      
      // ブロックの内容を置き換え
      block.textContent = '';
      block.appendChild(newLink);
    }
  });
}