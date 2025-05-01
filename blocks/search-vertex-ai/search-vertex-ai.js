export default async function decorate(block) {
  block.innerHTML = `
    <!-- Widget JavaScript bundle -->
    <script src="https://cloud.google.com/ai/gen-app-builder/client?hl=ja"></script>
    <!-- Search widget element is not visible by default -->
    <gen-search-widget
    configId="f760eeb7-3667-4bc1-99e0-6189313e2ab9"
    triggerId="searchWidgetTrigger">
    </gen-search-widget>
    <!-- Element that opens the widget on click. It does not have to be an input -->
    <input placeholder="ここで検索" id="searchWidgetTrigger" />
  `;
}