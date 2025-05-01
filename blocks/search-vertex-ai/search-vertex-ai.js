export default async function decorate(block) {
  const script = document.createElement('script');
  script.src = 'https://cloud.google.com/ai/gen-app-builder/client?hl=ja';
  block.append(script);
  script.onload = () => {
    const genSearchWidget = document.createElement('gen-search-widget');
    genSearchWidget.configId = 'f760eeb7-3667-4bc1-99e0-6189313e2ab9';
    genSearchWidget.triggerId = 'searchWidgetTrigger';
    block.append(genSearchWidget);
    const input = document.createElement('input');
    input.placeholder = 'ここで検索';
    input.id = 'searchWidgetTrigger';
    block.append(input);
  };
}