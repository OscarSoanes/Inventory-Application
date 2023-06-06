#! /usr/bin/env node

console.log(
  'This script populates some test categories and items to your database. Specified database is using .env with the name "MONGO" for the mongo connection string'
);

const Category = require("./models/Category");
const Item = require("./models/Item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Uses mongoDB connection string stored in dotenv for security
require('dotenv').config();
const mongoDB = process.env.MONGO;

main().catch((err) => console.error(err))
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);

  console.log("Debug: Should be connected.");

  await createCategories();
  await createItems();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createCategory(name, desc) {
  const category = new Category({ name: name, desc: desc});
  await category.save();
  categories.push(category);

  console.log(`Added category: ${category}`);
}

async function createItem(name, desc, category, number_in_stock, price) {
  const item = new Item({
    name: name,
    desc: desc,
    category: category,
    number_in_stock: number_in_stock,
    price: price
  });

  await item.save();
  items.push(item);

  console.log(`Added item: ${item}`);
}

async function createCategories() {
  console.log("Adding Categories");

  await Promise.all([
    createCategory("Fruit", "Juicy Delights: Experience nature's sweet offerings with a vibrant assortment of fresh, ripe produce. Discover a colorful range of flavors, textures, and aromas that will tantalize your taste buds. From crisp apples to succulent berries, our handpicked selection promises quality and nourishment. Whether enjoyed as a wholesome snack, blended into smoothies, or incorporated into your favorite recipes, these natural treasures provide essential vitamins, minerals, and antioxidants. Embrace the goodness of nature's bounty with Juicy Delights, where freshness and taste unite to bring you the finest selection of delicious and nutritious delights."),
    createCategory("Fresh", "Gourmet Essentials: Indulge in our selection of fresh, artisanal delights. Explore an enticing range of ready meals, handcrafted cheeses, creamy yogurts, farm-fresh milk, and invigorating juices. Sourced from trusted suppliers, our high-quality products are meticulously curated to provide you with convenience without compromising on taste or nutrition. From quick and wholesome meals to nourishing beverages, Gourmet Essentials offers a delightful array of flavors and textures. Experience the goodness of freshly prepared, premium ingredients that will elevate your culinary journey. Immerse yourself in the world of exquisite flavors and savor the essence of Gourmet Essentials."),
    createCategory("Frozen", "Frozen Bliss: Discover a frozen paradise of culinary delights. Indulge in convenient frozen treasures, from savory ready meals to irresistible desserts. Our selection features creamy ice creams, flavorful fruits, and more. Each item is expertly frozen, preserving freshness and nutrients. Experience the convenience of Frozen Bliss, where taste meets convenience. Enjoy the magic of frozen goodness without compromise. Embrace a world of culinary possibilities with Frozen Bliss."),
  ])

  console.log("Finished building Categories.");
}

async function createItems() {
  console.log("Adding Items");

  await Promise.all([
    createItem("Orange", "Zesty Citrus: Oranges burst with vibrant flavor and refreshing juiciness, delivering a tangy and invigorating experience with each bite.", categories[0], 7, 1.25 ),
    createItem("Strawberries", "Juicy Gems: Strawberries dazzle with their succulent sweetness and vibrant red hue, offering a burst of luscious flavor in every bite.", categories[0], 25, 1.5),
    createItem("Cheese Pizza", "Cheesy Delight: Savor the perfect harmony of melted cheese and savory tomato sauce atop a crispy crust, delivering pizza perfection.", categories[1], 12, 1.99),
    createItem("Banana Yogurt", "Creamy Bliss: Experience the velvety smoothness of banana yogurt, blending rich creaminess with the natural sweetness of ripe bananas.", categories[1], 6, 3.5),
    createItem("Frozen Fish", "Oceanic Delight: Dive into the frozen waters and savor the freshness of frozen fish, capturing the natural flavors of the sea.", categories[2], 28, 3),
  ]);

  console.log("Finished building Items");
}