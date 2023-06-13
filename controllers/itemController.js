const Item = require("../models/Item");
const Category = require("../models/Category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all item
exports.item_list = asyncHandler(async (req, res, next) => {
  const [allItems, allCategories] = await Promise.all([
    Item.find().sort({ name: 1 }).populate("category").exec(),
    Category.find().sort({ name: 1 }).exec()
  ])

  res.render("item_list", {
    title: "Item List",
    all_items: allItems,
    all_categories: allCategories
  })
})

// Display detail page for a specific item
exports.item_detail = asyncHandler(async (req, res, next) => {
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id).populate("category").exec(),
    Category.find().sort({ name: 1 }).exec()
  ]);

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: "Item Detail",
    item: item,
    all_categories: allCategories
  })
})

// Display item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().exec();

  res.render("item_form", {
    title: "Create Item",
    all_categories: allCategories,
    item: {},
    errors: [],
  })
})

// Handle item create on POST.
exports.item_create_post = [
  // Validate and sanitize fields.

  body("name", "Name must not be empty")
    .trim()
    .isLength({ min: 1})
    .escape(),
  body("desc", "Description must not be empty")
    .trim()
    .isLength({ min: 1})
    .escape(),
  body("number_in_stock", "Number in Stock must not be empty")
    .trim()
    .isNumeric()
    .escape(),
  body("price", "Price must not be empty")
    .trim()
    .isDecimal().withMessage("Price must be a decimal")
    .escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1})
    .escape(),
  
    asyncHandler(async (req, res, next) => {
      // Extract the errors from request
      const errors = validationResult(req);

      // Create a new item
      const item = new Item({
        name: req.body.name,
        desc: req.body.desc,
        number_in_stock: req.body.number_in_stock,
        price: req.body.price,
        category: req.body.category
      })

      if (!errors.isEmpty()) {
        // Error
        const allCategories = await Category.find().sort({ name: 1 }).exec();

        res.render("item_form", {
          title: "Create Item",
          all_categories: allCategories,
          item: item,
          errors: errors.array()
        });
      } else {
        await item.save();
        res.redirect(item.url);
      }
    })
]

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
})

// Handle item delete form on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
})

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
})

// Handle item update form on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
})