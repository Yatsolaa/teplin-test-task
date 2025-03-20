if (!customElements.get('c-mega-menu')) {
  customElements.define(
    'c-mega-menu',
    class ComponentCustomMegaMenu extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.modal = this.querySelector('.js-mega-menu__modal');
        this.megaMenuTriggers = this.querySelectorAll('.js-mega-menu__trigger');
        this.megaMenuTabs = this.querySelectorAll('.js-mega-menu__tab');

        this.megaMenuTriggers.forEach(link => {
          link.addEventListener('mouseover', this.modalHandler)
        })
      }

      disconnectedCallback() {
        this.megaMenuTriggers.forEach(link => {
          link.addEventListener('mouseover', this.modalHandler)
        })
      }

      modalHandler = (event) => {
        this.modal.classList.add('is-active');

        const currentLink = event.target.closest('.js-mega-menu__trigger');
        const currentLinkHandle = currentLink.dataset.linkHandle;

        this.megaMenuTabs.forEach(tab => {
          tab.classList.remove('is-active');
          if(tab.dataset.linkHandle === currentLinkHandle){
            this.megaMenuTriggers.forEach(link => link.classList.remove('is-active'));
            currentLink.classList.add('is-active');
            
            tab.classList.add('is-active');
            tab.addEventListener('mouseleave', this.closeTabHandler);
          }
        })
      }

      closeTabHandler = (event) => {
        this.megaMenuTriggers.forEach(link => link.classList.remove('is-active'));
        this.modal.classList.remove('is-active');
        const currentTab = event.target.closest('.js-mega-menu__tab');
        currentTab.classList.remove('is-active');
      }
    }
  );
}
