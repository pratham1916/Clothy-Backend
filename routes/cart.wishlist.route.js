const express = require("express");
const { cartModel, wishlistModel } = require("../model/cart.wishlist.model");
const { auth } = require("../middleware/auth.middleware");
const CartWishlistRouter = express.Router();

async function getCartWishlist(model,req,res) {
    try {
        const id = req.params.id;
        const data = await model.find({userId:id})
        if(data){
            res.status(200).json(data);
        }else{
            return res.status(404).json({ message: `No Product cart found with the ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
}

CartWishlistRouter.get("/cart/:id",auth,(req,res)=>{
    getCartWishlist(cartModel,req,res)
})
CartWishlistRouter.get("/wishlist/:id",auth,(req,res)=>{
    getCartWishlist(wishlistModel,req,res)
})

function AddCartWishlist(model,itemData){
    const item = new model(itemData);
    return item.save();
}

CartWishlistRouter.post('/cart',auth, async (req, res) => {
    try {
        const itemData = {...req.body,userId:req.user._id}
        const newItem = await AddCartWishlist(cartModel,itemData);
        res.status(200).json(newItem);
    } catch (error) {
        return res.status(400).json({error });
    }
});

CartWishlistRouter.post('/wishlist',auth, async (req, res) => {
    try {
        const itemData = {...req.body,userId:req.user._id}
        const newItem = await AddCartWishlist(wishlistModel,itemData);
        res.status(200).json(newItem);
    } catch (error) {
        return res.status(400).json({error });
    }
});

module.exports = {
    CartWishlistRouter
}