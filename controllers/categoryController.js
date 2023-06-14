const Category = require("../models/Category");
const Item = require("../models/Item");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display Index page.
exports.index = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  
  res.render("index", {
    title: "Index",
    all_categories: allCategories,
  });
})

// Display list of all Category
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("category_list", {
    title: "Category List",
    all_categories: allCategories,
  });
})

// Display detail page for a specific category
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, allCategories, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Category.find().sort({ name: 1 }).exec(),
    Item.find({ category: req.params.id }, "name number_in_stock").exec(),
  ]);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    all_categories: allCategories,
    all_items: allItemsByCategory
  })
})

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("category_form", {
    title: "Create Category",
    all_categories: allCategories,
    category: undefined,
    errors: undefined
  });
})

// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitize fields.

  body("name", "Name must not be empty")
    .trim()
    .isLength({ min: 1})
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1})
    .escape(),
  
  asyncHandler(async (req, res, next) => {
    // Extract the errors from request
    const errors = validationResult(req);

    // Create a new Category with sanitized data.
    const category = new Category({
      name: req.body.name,
      desc: req.body.description
    })

    if (!errors.isEmpty()) {
      // There are errors. Rerender form with sanitized data.

      const allCategories = await Category.find().sort({ name: 1 }).exec();

      res.render("category_form", {
        title: "Create Category",
        all_categories: allCategories,
        category: category,
        errors: errors.array()
      });
    } else {
      await category.save();
      res.redirect(category.url);
    }
  })
]

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, getAllCategories, allItemsWithCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Category.find().sort({ name: 1 }).exec(),
    Item.find( {category: req.params.id }, "name price").exec(),
  ]);

  if (category === null) {
    // No results

    res.redirect("/catalog/categories");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    all_categories: getAllCategories,
    items: allItemsWithCategory,
  });
});

// Handle Category delete form on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, getAllCategories, allItemsWithCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Category.find().sort({ name: 1 }).exec(),
    Item.find( {category: req.params.id }, "name price").exec(),
  ]);
  
  if (allItemsWithCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      all_categories: getAllCategories,
      items: allItemsWithCategory,
    });
    return;
  }  else {
    await Category.findByIdAndDelete(category._id);
    res.redirect("/catalog/categories");
  }
})

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const [category, getAllCategories] = await Promise.all([
    Category.findById(req.params.id),
    Category.find().sort({ name: 1 }).exec(),
  ])
  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;

    return next(err);
  }

  res.render("category_form", {
    title: "Update Category",
    category: category,
    all_categories: getAllCategories,
    errors: []
  });
})

// Handle Category update form on POST.
exports.category_update_post = [
  // Validate and sanitize the fields
  body("name", "Name must not be empty")
  .trim()
  .isLength({ min: 1})
  .escape(),

  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      desc: req.body.desc,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      // There are errors. Rerender form.
      const getAllCategories = await Category.find().sort({ name: 1 }).exec();

      res.render("category_form", {
        title: "Update Category",
        all_categories: getAllCategories,
        category: category,
        errors: errors.array()
      });
    } else {
      const thecategory = await Category.findByIdAndUpdate(req.params.id, category);
      res.redirect(thecategory.url);
    }
  })
  ]