/**
 * 目次ブロックをデコレートする関数
 * @param {HTMLElement} block - 目次ブロック要素
 */
export default function decorate(block) {
  // button-containerクラスを持つp要素を全て取得
  const buttonContainers = block.querySelectorAll('p.button-container');
  
  if (buttonContainers.length === 0) return;

  // ul要素を作成
  const ulElem = document.createElement('ul');
  
  // 各button-containerをli要素に変換
  buttonContainers.forEach((container) => {
    // li要素を作成
    const liElem = document.createElement('li');
    
    // aタグを取得して li 要素に移動
    const linkElem = container.querySelector('a');
    if (linkElem) {
      // buttonクラスを削除
      linkElem.classList.remove('button');
      liElem.appendChild(linkElem);
    }
    
    // ulに追加
    ulElem.appendChild(liElem);
    
    // 元のp要素を削除
    container.remove();
  });

  // 「目次」の見出しの後にul要素を挿入
  const titleElem = block.querySelector('p strong');
  if (titleElem) {
    titleElem.parentElement.after(ulElem);
  }
}