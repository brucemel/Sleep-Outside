import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

// Get the category from the URL parameter
const category = getParam("category");

// Create an instance of ProductData
const dataSource = new ProductData();

// Get the HTML element where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList and send it the correct information
const myList = new ProductList(category, dataSource, listElement);

// Call the init method to show the products
myList.init();
