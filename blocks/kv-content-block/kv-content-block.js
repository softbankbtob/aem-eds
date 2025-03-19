export default function decorate(block) {
  // kv-content-blockクラス直下のdivにkv-content-block-innerクラスを付与
  const innerDiv = block.querySelector(':scope > div');
  if (innerDiv) {
    innerDiv.classList.add('kv-content-block-inner');

    // kv-content-block-inner直下のdivにクラスを付与
    const childDivs = innerDiv.querySelectorAll(':scope > div');
    if (childDivs.length >= 1) {
      childDivs[0].classList.add('kv-content-block-title');
    }
    if (childDivs.length >= 2) {
      childDivs[1].classList.add('kv-content-block-text');
    }
  }

  // pタグの中にstrongタグがある場合、headingクラスを付与
  const paragraphs = block.querySelectorAll('p');
  paragraphs.forEach(p => {
    if (p.querySelector('strong')) {
      p.classList.add('heading');
    }
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