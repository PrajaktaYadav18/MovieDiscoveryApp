const express = require("express");

const {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require("../controllers/wishlistController");

const router = express.Router();


// GET all wishlist movies
router.get("/", getWishlist);


// POST add movie to wishlist
router.post("/", addToWishlist);


// DELETE remove movie from wishlist
router.delete("/:movieId", removeFromWishlist);


module.exports = router;