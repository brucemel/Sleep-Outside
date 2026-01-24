import { renderListWithTemplate } from "./utils.mjs";

// Template function that returns HTML for a single product card
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Store the category (e.g., "tents", "backpacks")
    this.category = category;
    // Store the data source (ProductData instance) to fetch products
    this.dataSource = dataSource;
    // Store the HTML element where products will be rendered
    this.listElement = listElement;
  }

  async init() {
    // Fetch the list of products from the data source
    // getData() returns a Promise, so we use await
    const list = await this.dataSource.getData();
    // Render the list of products to the page
    this.renderList(list);
  }

  renderList(list) {
    // Use the utility function to render the list with the template
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
