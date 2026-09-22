const axios = require("axios");

// ===============================
// Simple In-Memory Cache
// ===============================

const cache = new Map();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_ITEMS = 100;

const sleep = (ms) =>
new Promise((resolve) => setTimeout(resolve, ms));

// ===============================
// Cache Helpers
// ===============================

const getCacheKey = (path, params) => {
const query = new URLSearchParams(params).toString();

return `${path}?${query}`;


};

const getCachedData = (key) => {
const cached = cache.get(key);


if (!cached) {
    return null;
}

const isExpired =
    Date.now() - cached.timestamp > CACHE_DURATION;

if (isExpired) {
    cache.delete(key);
    return null;
}

return cached.data;


};

const setCachedData = (key, data) => {


// Prevent unlimited memory usage
if (cache.size >= MAX_CACHE_ITEMS) {

    const firstKey =
        cache.keys().next().value;

    if (firstKey) {
        cache.delete(firstKey);
    }
}

cache.set(key, {
    data,
    timestamp: Date.now(),
});


};

// ===============================
// TMDB Request
// ===============================

const tmdbRequest = async (
path,
params = {}
) => {


const cacheKey =
    getCacheKey(path, params);

// Check cache first
const cachedData =
    getCachedData(cacheKey);

if (cachedData) {

    console.log(
        "TMDB Cache HIT:",
        cacheKey
    );

    return cachedData;
}

console.log(
    "TMDB Cache MISS:",
    cacheKey
);

const url =
    `${process.env.TMDB_BASE_URL}${path}`;

let lastError;

// Retry up to 3 times
for (
    let attempt = 1;
    attempt <= 3;
    attempt++
) {

    try {

        const response =
            await axios.get(
                url,
                {
                    params,

                    headers: {
                        Authorization:
                            `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,

                        accept:
                            "application/json",
                    },

                    timeout: 30000,
                }
            );

        const result =
            response.data;

        // Save successful response
        // into cache
        setCachedData(
            cacheKey,
            result
        );

        console.log(
            `TMDB Success on attempt ${attempt}`
        );

        return result;

    } catch (error) {

        lastError = error;

        console.error(
            `TMDB attempt ${attempt} failed:`,
            error.response?.data ||
            error.message
        );

        if (attempt < 3) {
            await sleep(1000);
        }
    }
}

throw lastError;


};

// ===============================
// Popular Movies
// ===============================

const getPopularMovies = async (
page = 1,
sortBy = "popularity.desc"
) => {


return await tmdbRequest(
    "/discover/movie",
    {
        language: "en-US",
        sort_by: sortBy,
        page,
    }
);


};

// ===============================
// Search Movies
// ===============================

const searchMovies = async (
query,
page = 1
) => {


return await tmdbRequest(
    "/search/movie",
    {
        query,
        include_adult: "false",
        language: "en-US",
        page,
    }
);


};

// ===============================
// Movie Details
// ===============================

const getMovieDetails = async (
movieId
) => {


return await tmdbRequest(
    `/movie/${movieId}`,
    {
        language: "en-US",
    }
);


};

// ===============================
// Movie Genres
// ===============================

const getMovieGenres = async () => {


return await tmdbRequest(
    "/genre/movie/list",
    {
        language: "en-US",
    }
);


};

// ===============================
// Movies By Genre
// ===============================

const getMoviesByGenre = async (
genreId,
page = 1,
sortBy = "popularity.desc"
) => {


return await tmdbRequest(
    "/discover/movie",
    {
        language: "en-US",
        with_genres: genreId,
        sort_by: sortBy,
        page,
    }
);


};

// ===============================
// Exports
// ===============================

module.exports = {
getPopularMovies,
searchMovies,
getMovieDetails,
getMovieGenres,
getMoviesByGenre,
};
