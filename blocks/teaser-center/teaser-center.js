export default function decorate(block) {
  // teaser-centerの直下のdivにteaser-center-innerクラスを追加
  const innerDiv = document.createElement('div');
  innerDiv.className = 'teaser-center-inner';

  // 元の内容をinnerDivに移動
  while (block.firstChild) {
    const child = block.firstChild;
    if (child.tagName === 'DIV') {
      child.className = 'teaser-center-body';

      // teaser-center-body内の子要素にクラスを追加
      const bodyChildren = [...child.children];
      if (bodyChildren.length >= 1) bodyChildren[0].className = 'teaser-center-img';
      if (bodyChildren.length >= 2) bodyChildren[1].className = 'teaser-center-title';
      if (bodyChildren.length >= 3) bodyChildren[2].className = 'teaser-center-text';
    }
    innerDiv.appendChild(child);
  }

  // innerDivをblockに追加
  block.appendChild(innerDiv);

  // teaser-center-titleクラスの中にあるpタグにpretitleクラスを追加（画像を含むpタグは除外）
  const teaserCenterTitle = innerDiv.querySelector('.teaser-center-title');
  if (teaserCenterTitle) {
    const paragraphs = teaserCenterTitle.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      // pタグ内にpictureタグがある場合は処理
      const pictureElement = paragraph.querySelector('picture');
      if (pictureElement) {
        // pictureの前後にテキストノードがあるか確認
        const childNodes = Array.from(paragraph.childNodes);
        const textNodes = childNodes.filter(node => 
          node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
        if (textNodes.length > 0) {
          // テキストがある場合、pictureを新しいpタグに移動
          const newParagraph = document.createElement('p');
          newParagraph.classList.add('pre-img');
          newParagraph.appendChild(pictureElement);
          paragraph.parentNode.insertBefore(newParagraph, paragraph.nextSibling);
        }
      } else if (!paragraph.querySelector('img')) {
        // 画像要素がない場合はpretitleクラスを追加
        paragraph.classList.add('pretitle');
      }
    });
  }

  // teaser-center-titleとteaser-center-text内の画像を含むpタグにpre-imgクラスを追加
  const containers = innerDiv.querySelectorAll('.teaser-center-title, .teaser-center-text');
  containers.forEach(container => {
    const paragraphsWithImages = container.querySelectorAll('p > img, p > picture > img');
    paragraphsWithImages.forEach(img => {
      const parentParagraph = img.closest('p');
      if (parentParagraph) {
        // pre-imgクラスを追加する前に、テキストノードがあるか確認
        const childNodes = Array.from(parentParagraph.childNodes);
        const textNodes = childNodes.filter(node => 
          node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');
        
        if (textNodes.length > 0) {
          // テキストがある場合、画像だけを新しいpタグに移動
          const newParagraph = document.createElement('p');
          newParagraph.classList.add('pre-img');
          const pictureElement = parentParagraph.querySelector('picture');
          if (pictureElement) {
            newParagraph.appendChild(pictureElement);
            parentParagraph.parentNode.insertBefore(newParagraph, parentParagraph.nextSibling);
          } else if (img) {
            newParagraph.appendChild(img);
            parentParagraph.parentNode.insertBefore(newParagraph, parentParagraph.nextSibling);
          }
        } else {
          // テキストがない場合はそのままpre-imgクラスを追加
          parentParagraph.classList.add('pre-img');
        }
      }
    });
  });

  // ボタンコンテナの処理
  const buttonLinks = innerDiv.querySelectorAll('.button-container');
  // ボタンコンテナが存在する場合、それらをbuttons-wrapperで囲む
  if (buttonLinks.length > 0) {
    // 最初のボタンコンテナの親要素を取得
    const parentElement = buttonLinks[0].parentElement;
    // buttons-wrapperを作成
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'buttons-wrapper';
    // 最初のボタンコンテナの位置を特定
    const firstButtonIndex = Array.from(parentElement.children).indexOf(buttonLinks[0]);
    // すべてのボタンコンテナを取得して配列に変換
    const buttonContainers = Array.from(buttonLinks);
    // ボタンコンテナをbuttons-wrapperに移動
    buttonContainers.forEach(container => {
      buttonsWrapper.appendChild(container);
    });
    // 元の位置にbuttons-wrapperを挿入
    parentElement.insertBefore(buttonsWrapper, parentElement.children[firstButtonIndex]);
  }
}
