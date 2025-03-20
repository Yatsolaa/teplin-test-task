if (!customElements.get('s-testimonials-slider')) {
  customElements.define(
    's-testimonials-slider',
    class SectionIconsSlider extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.sliderElement = this.querySelector('.js-testimonials-slider__slider');
        this.arrowPrev = this.querySelector('.js-arrow-prev');
        this.arrowNext = this.querySelector('.js-arrow-next');
        this.initSlider();

        this.arrowPrev.addEventListener('click', this.prevArrowHandler);
        this.arrowNext.addEventListener('click', this.nextArrowHandler);

        window.addEventListener('resize', this.handleResize.bind(this));
      }

      disconnectedCallback() {
        this.flickity?.destroy();
        window.removeEventListener('resize', this.handleResize);
      }

      initSlider = () => {
        this.slider = new Flickity(this.sliderElement, {
          cellAlign: 'left',
          cellSelector: '.js-testimonials-slider__slide',
          contain: true,
          groupCells: true,
          pageDots: false,
          prevNextButtons: false
        });
      
        this.slider.on('change', this.arrowsVisibilityHandler);
      
        this.arrowsVisibilityHandler();
      };

      handleResize = () => {
        this.slider?.resize();
      };

      prevArrowHandler = () => {
        if (this.slider) {
          this.slider.previous(false, false);
          this.arrowsVisibilityHandler();
        }
      };
      
      nextArrowHandler = () => {
        if (this.slider) {
          this.slider.next(false, false);
          this.arrowsVisibilityHandler();
        }
      };

      arrowsVisibilityHandler = () => {
        if (!this.slider || !this.slider.cells.length) return;
      
        const selectedIndex = this.slider.selectedIndex;
        const lastIndex = this.slider.slides.length - 1;
        
        this.arrowPrev?.classList.toggle("is-disabled", selectedIndex === 0);
        this.arrowNext?.classList.toggle("is-disabled", selectedIndex === lastIndex);
      };
    }
  );
}