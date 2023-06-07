const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type: String, required: true},
  desc: String,
  number_in_stock: {type: Number, required: true},
  price: {type: Schema.Types.Decimal128, required: true},
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true}
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

ItemSchema.virtual("price_format").get(function () {
  return `£${(this.price * 100 / 100).toFixed(2)}`
})

module.exports = mongoose.model("Item", ItemSchema);