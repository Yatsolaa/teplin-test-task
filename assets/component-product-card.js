if (!customElements.get("c-product-card")) {
  customElements.define( "c-product-card", class ComponentProductCard extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.addToCartButton = this.querySelector('.js-product-card__button');
        this.addToCartButton.addEventListener('click', this.addToCartHandler);

        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      }

      disconnectedCallback() {
        this.addToCartButton.removeEventListener('click', this.addToCartHandler);
      }

      addToCartHandler = (event) => {
        event.preventDefault();
        const button = event.target.closest('.js-product-card__button');
        const variantId = button.dataset.variantId;

        this.classList.add('is-loading');
        button.disabled = true;

        if (this.cart) {
          this.sections = this.cart.getSectionsToRender().map((section) => section.id)
          this.cart.setActiveElement(document.activeElement);
        }

        const formData = {
          items: [
            {
              id: variantId,
              quantity: 1,
            },
          ],
          sections: this.sections,
          sections_url: window.location.pathname
        };

        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((response) => {
            const cartResponse = response;
            cartResponse.key = response.items[0].key;
            if (this.cart){
              this.cart.renderContents(cartResponse);
            }
            button.disabled = false;
            this.classList.remove('is-loading');
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  );
}