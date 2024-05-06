const mongoose = require("mongoose");

const CartWishlistSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    size: [{ type: String, required: true }], 
    imageURL: [{ type: String, required: true }],
    stock: { type: Number, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    userId: { type: String,}
})

const cartModel = mongoose.model("cart",CartWishlistSchema)
const wishlistModel = mongoose.model("wishlist",CartWishlistSchema)

module.exports = {
    cartModel,wishlistModel
}