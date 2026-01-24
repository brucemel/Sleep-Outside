import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get the product ID from the URL parameter
// Example: if URL is "index.html?product=880RR", productId will be "880RR"
const productId = getParam("product");

// Create an instance of ProductData to fetch product information
// Pass 'tents' as the category to look in the tents.json file
const dataSource = new ProductData("tents");

// Create an instance of ProductDetails with the productId and dataSource
const product = new ProductDetails(productId, dataSource);

// Initialize the product page - this will:
// 1. Fetch the product data
// 2. Render the product details to the page
// 3. Set up the Add to Cart button
product.init();
