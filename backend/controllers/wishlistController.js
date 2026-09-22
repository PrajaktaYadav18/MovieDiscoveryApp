const Wishlist = require("../models/Wishlist");

// Get all wishlist movies
const getWishlist = async (req, res) => {
    try {
        const movies = await Wishlist.find()
            .sort({ createdAt: -1 });

        res.json(movies);

    } catch (error) {

        console.error(
            "Get Wishlist Error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to fetch wishlist"
        });
    }
};


// Add movie to wishlist
const addToWishlist = async (req, res) => {

    try {

        const {
            movieId,
            title,
            posterPath,
            releaseDate,
            voteAverage,
            overview
        } = req.body;


        if (!movieId || !title) {

            return res.status(400).json({
                message: "Movie ID and title are required"
            });
        }


        const existingMovie =
            await Wishlist.findOne({ movieId });


        if (existingMovie) {

            return res.status(409).json({
                message: "Movie already exists in wishlist"
            });
        }


        const movie = await Wishlist.create({

            movieId,
            title,
            posterPath,
            releaseDate,
            voteAverage,
            overview

        });


        res.status(201).json(movie);

    } catch (error) {

        console.error(
            "Add Wishlist Error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to add movie to wishlist"
        });
    }
};


// Remove movie from wishlist
const removeFromWishlist = async (req, res) => {

    try {

        const movieId =
            Number(req.params.movieId);


        const movie =
            await Wishlist.findOneAndDelete({
                movieId
            });


        if (!movie) {

            return res.status(404).json({
                message: "Movie not found in wishlist"
            });
        }


        res.json({
            message: "Movie removed from wishlist"
        });

    } catch (error) {

        console.error(
            "Remove Wishlist Error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to remove movie from wishlist"
        });
    }
};


module.exports = {

    getWishlist,
    addToWishlist,
    removeFromWishlist

};