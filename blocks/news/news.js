export default function decorate() {
  document.querySelectorAll(".news > div").forEach((newsItem) => {
    // news--innerクラスを追加
    newsItem.classList.add("news-inner");

    const linkElement = newsItem.querySelector("a");
    if (linkElement) {
      const url = linkElement.getAttribute("href");
      const titleText = linkElement.getAttribute("title");
      // .button-containerを削除
      const buttonContainers = newsItem.querySelectorAll(".button-container");
      buttonContainers.forEach((buttonContainer) => {
        buttonContainer.remove();
      });
      // リンク要素内のボタンコンテナも削除
      const linkButtonContainers = linkElement.querySelectorAll(".button-container");
      linkButtonContainers.forEach((buttonContainer) => {
        buttonContainer.remove();
      });

      // 新しい<a>タグを作成し、news-item-linkをラップ
      const wrapper = document.createElement("a");
      wrapper.href = url;
      wrapper.className = "news-item-link";
      wrapper.title = titleText;

      // titleの文言を<p>タグで追加
      if (titleText) {
        const titleParagraph = document.createElement("p");
        titleParagraph.className = "news-title";
        titleParagraph.textContent = titleText;
        newsItem.appendChild(titleParagraph);
      }

      // 元の<a>タグを削除
      linkElement.remove();

      // newsItemを<a>の中に移動
      newsItem.replaceWith(wrapper);
      wrapper.appendChild(newsItem);
    }
  });
};
