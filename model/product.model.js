const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    size: [{ type: String, required: true }], 
    imageURL: [{ type: String, required: true }],
    stock: { type: Number, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 }
});

const productMensModel = mongoose.model("mens",productSchema);
const productWomensModel = mongoose.model("womens",productSchema);

module.exports = {
    productMensModel,productWomensModel
}