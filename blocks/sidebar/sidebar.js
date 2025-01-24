export default function decorate(block) {
  // sidebar-containerを取得
  const sidebarContainer = block.closest('.sidebar-container');

  // sidebar-container内の要素を削除
  if (sidebarContainer) {
    // sidebar-container内の全てのsidebar-wrapperを削除
    const sidebarBlocks = sidebarContainer.querySelectorAll('.sidebar-wrapper');
    sidebarBlocks.forEach((sidebarBlock) => {
      sidebarContainer.removeChild(sidebarBlock);
    });

    // "p.button-container"を"div.sidebar-button"に書き換え
    const buttonContainer = sidebarContainer.querySelector('.default-content-wrapper p.button-container');
    if (buttonContainer) {
      const newButtonDiv = document.createElement('div');
      newButtonDiv.className = 'sidebar-button';
      newButtonDiv.innerHTML = buttonContainer.innerHTML; // 元の内容を保持

      // buttonContainerがsidebarContainerの子であることを確認
      if (buttonContainer.parentNode) {
        buttonContainer.parentNode.replaceChild(newButtonDiv, buttonContainer);

        // sidebar-buttonの直下のaタグにtarget="_blank"を付与
        const buttonLink = newButtonDiv.querySelector('a');
        if (buttonLink) {
          buttonLink.setAttribute('target', '_blank');
        }
      }

      // div.sidebar-button内のa.buttonのクラス名を削除
      const buttonLink = newButtonDiv.querySelector('a.button');
      if (buttonLink) {
        buttonLink.className = ''; // クラス名を削除
      }
    }
  }
}
