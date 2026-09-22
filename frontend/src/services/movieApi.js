import axios from "axios";


// =========================
// MOVIE API
// =========================

const API = axios.create({
    baseURL: "http://localhost:5000/api/movies",
    timeout: 30000
});


// Popular Movies
export const getPopularMovies = async (
    page = 1,
    sortBy = "popularity.desc"
) => {

    const response = await API.get("/popular", {
        params: {
            page,
            sortBy
        }
    });

    return response.data;
};


// Search Movies
export const searchMovies = async (
    query,
    page = 1
) => {

    const response = await API.get("/search", {
        params: {
            query,
            page
        }
    });

    return response.data;
};


// Movie Details
export const getMovieDetails = async (movieId) => {

    const response = await API.get(`/${movieId}`);

    return response.data;
};


// Movie Genres
export const getMovieGenres = async () => {

    const response = await API.get("/genres");

    return response.data;
};


// Movies By Genre
export const getMoviesByGenre = async (
    genreId,
    page = 1,
    sortBy = "popularity.desc"
) => {

    const response = await API.get(
        `/genre/${genreId}`,
        {
            params: {
                page,
                sortBy
            }
        }
    );

    return response.data;
};


// =========================
// WISHLIST API
// =========================

const WISHLIST_API = axios.create({
    baseURL: "http://localhost:5000/api/wishlist",
    timeout: 30000
});


// Get Wishlist
export const getWishlist = async () => {

    const response = await WISHLIST_API.get("/");

    return response.data;
};


// Add Movie To Wishlist
export const addToWishlist = async (movie) => {

    const response = await WISHLIST_API.post(
        "/",
        {
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            overview: movie.overview
        }
    );

    return response.data;
};


// Remove Movie From Wishlist
export const removeFromWishlist = async (movieId) => {

    const response = await WISHLIST_API.delete(
        `/${movieId}`
    );

    return response.data;
};