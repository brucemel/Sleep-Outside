import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    // Store the product ID that we'll use to look up the product
    this.productId = productId;
    // Store the data source (ProductData instance) that we'll use to fetch product info
    this.dataSource = dataSource;
    // This will hold the product data once we fetch it
    this.product = {};
  }

  async init() {
    // Use the dataSource to get the details for the current product
    // findProductById returns a promise, so we use await
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details to the page
    this.renderProductDetails();

    // Add a listener to the Add to Cart button
    // Notice the .bind(this) - this is necessary so that 'this' inside addToCart
    // refers to the ProductDetails instance, not the button element
    document.getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // Get existing cart from localStorage or initialize empty array
    let cart = getLocalStorage("so-cart") || [];
    // Add the current product to the cart array
    cart.push(this.product);
    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    // Get the container element where we'll insert the product HTML
    const productContainer = document.getElementById("product-detail");

    // Build the HTML string using the product data
    // This matches the structure from the original product pages
    const htmlContent = `
      <h3>${this.product.Brand.Name}</h3>

      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${this.product.Images.PrimaryLarge}"
        alt="${this.product.NameWithoutBrand}"
      />

      <p class="product-card__price">$${this.product.FinalPrice}</p>

      <p class="product__color">${this.product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;

    // Insert the HTML into the container
    productContainer.innerHTML = htmlContent;
  }
}
