const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        movieId: {
            type: Number,
            required: true,
            unique: true
        },

        title: {
            type: String,
            required: true
        },

        posterPath: {
            type: String,
            default: null
        },

        releaseDate: {
            type: String,
            default: ""
        },

        voteAverage: {
            type: Number,
            default: 0
        },

        overview: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Wishlist = mongoose.model(
    "Wishlist",
    wishlistSchema
);

module.exports = Wishlist;