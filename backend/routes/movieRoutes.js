const express = require("express");

const {
    getPopularMovies,
    searchMovies,
    getMovieDetails,
    getMovieGenres,
    getMoviesByGenre
} = require("../services/tmdbService");

const router = express.Router();


// ===============================
// Popular Movies
// ===============================
router.get("/popular", async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const sortBy =
            req.query.sortBy || "popularity.desc";

        const allowedSorts = [
            "popularity.desc",
            "vote_average.desc",
            "primary_release_date.desc",
            "primary_release_date.asc"
        ];

        if (!allowedSorts.includes(sortBy)) {

            return res.status(400).json({
                message: "Invalid sort option"
            });

        }

        const data = await getPopularMovies(
            page,
            sortBy
        );

        res.json(data);

    } catch (error) {

        console.error(
            "TMDB Popular Movies Error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to fetch movies",
            error: error.message
        });

    }

});


// ===============================
// Search Movies
// ===============================
router.get("/search", async (req, res) => {

    try {

        const { query } = req.query;

        const page =
            Number(req.query.page) || 1;

        if (!query || !query.trim()) {

            return res.status(400).json({
                message: "Search query is required"
            });

        }

        const data = await searchMovies(
            query.trim(),
            page
        );

        res.json(data);

    } catch (error) {

        console.error(
            "TMDB Search Error:",
            error.message
        );

        console.error(
            "TMDB Status:",
            error.response?.status
        );

        console.error(
            "TMDB Response:",
            error.response?.data
        );

        res.status(500).json({
            message: "Unable to search movies",
            error:
                error.response?.data ||
                error.message
        });

    }

});


// ===============================
// Movie Genres
// ===============================
router.get("/genres", async (req, res) => {

    try {

        const data =
            await getMovieGenres();

        res.json(data);

    } catch (error) {

        console.error(
            "TMDB Genres Error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to fetch movie genres",
            error: error.message
        });

    }

});


// ===============================
// Movies By Genre
// ===============================
router.get("/genre/:genreId", async (req, res) => {

    try {

        const genreId =
            Number(req.params.genreId);

        const page =
            Number(req.query.page) || 1;

        const sortBy =
            req.query.sortBy || "popularity.desc";


        // Allowed sorting options
        const allowedSorts = [
            "popularity.desc",
            "vote_average.desc",
            "primary_release_date.desc",
            "primary_release_date.asc"
        ];


        // Validate Genre ID
        if (
            !genreId ||
            !Number.isInteger(genreId) ||
            genreId < 1
        ) {

            return res.status(400).json({
                message: "Valid genre ID is required"
            });

        }


        // Validate Sorting
        if (!allowedSorts.includes(sortBy)) {

            return res.status(400).json({
                message: "Invalid sort option"
            });

        }


        // Fetch genre movies
        const data =
            await getMoviesByGenre(
                genreId,
                page,
                sortBy
            );

        res.json(data);

    } catch (error) {

        console.error(
            "TMDB Genre Movies Error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to fetch genre movies",
            error: error.message
        });

    }

});


// ===============================
// Movie Details
// ===============================
router.get("/:id", async (req, res) => {

    try {

        const movieId =
            Number(req.params.id);


        if (
            !movieId ||
            !Number.isInteger(movieId) ||
            movieId < 1
        ) {

            return res.status(400).json({
                message: "Valid movie ID is required"
            });

        }


        const data =
            await getMovieDetails(movieId);

        res.json(data);

    } catch (error) {

        console.error(
            "================================="
        );

        console.error(
            "TMDB DETAILS ERROR"
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Code:",
            error.code
        );

        console.error(
            "================================="
        );


        res.status(500).json({
            message:
                "Unable to fetch movie details",

            error: error.message
        });

    }

});


module.exports = router;