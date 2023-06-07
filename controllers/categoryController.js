const Category = require("../models/Category");
const Item = require("../models/Item");

const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

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
  res.send("NOT IMPLEMENTED: Category create GET");
})

// Handle Category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create POST");
})

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete GET");
})

// Handle Category delete form on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete POST");
})

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update GET");
})

// Handle Category update form on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update POST");
})