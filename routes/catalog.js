const express = require("express");
const router = express.Router();

// Controller modules.
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

router.get("/", category_controller.index);

/// CATEGORY ROUTES ///
// GET request for list of all Categories.
router.get("/categories", category_controller.category_list);

// GET request for creating a Category
router.get("/category/create", category_controller.category_create_get);

// POST request for creating a Category
router.post("/category/create", category_controller.category_create_post);

// GET request for deleting a Category
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request for deleting a Category
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request for updating a Category
router.get("/category/:id/update", category_controller.category_update_get);

// POST request for updating a Category
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category
router.get("/category/:id", category_controller.category_detail);

/// ITEM ROUTES ///

// GET request for list of all Items.
router.get("/items", item_controller.item_list);

// GET request for creating a Item
router.get("/item/create", item_controller.item_create_get);

// POST request for creating a Item
router.post("/item/create", item_controller.item_create_post);


// GET request for deleting a Item
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request for deleting a Item
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request for updating a Item
router.get("/item/:id/update", item_controller.item_update_get);

// POST request for updating a Item
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one Item
router.get("/item/:id", item_controller.item_detail);

module.exports = router;