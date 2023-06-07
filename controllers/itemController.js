const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display list of all item
exports.item_list = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item List");
})

// Display detail page for a specific item
exports.item_detail = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item Detail");
})

// Display item create form on GET
exports.item_create_get = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create GET");
})

// Handle item create on POST.
exports.item_create_post = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create POST");
})

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
})

// Handle item delete form on POST.
exports.item_delete_post = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
})

// Display item update form on GET.
exports.item_update_get = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
})

// Handle item update form on POST.
exports.item_update_post = asyncHandler(async, (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
})