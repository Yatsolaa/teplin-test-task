if (!customElements.get('c-mega-menu')) {
  customElements.define(
    'c-mega-menu',
    class ComponentCustomMegaMenu extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        console.log("init");
      }

      disconnectedCallback() {
      }
    }
  );
}
