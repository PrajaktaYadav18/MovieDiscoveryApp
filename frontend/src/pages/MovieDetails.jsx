import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getMovieDetails } from "../services/movieApi";
import { useWishlist } from "../context/WishlistContext";

const IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p/w500";

const BACKDROP_BASE_URL =
    "https://image.tmdb.org/t/p/original";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMovieDetails(id);

                setMovie(data);
            } catch (err) {
                console.error(
                    "Movie Details Error:",
                    err
                );

                setError(
                    "Unable to load movie details. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="details-loading">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p>
                    Loading movie details...
                </p>

            </div>
        );
    }

    if (error) {
        return (
            <div className="details-error container">

                <div className="alert alert-danger">
                    {error}
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                >
                    ← Back to Movies
                </button>

            </div>
        );
    }

    if (!movie) {
        return null;
    }

    const releaseYear = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "N/A";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "N/A";

    const runtime = movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${
              movie.runtime % 60
          }m`
        : "N/A";

    const saved = isInWishlist(movie.id);

    const handleWishlist = () => {
        if (saved) {
            removeFromWishlist(movie.id);
        } else {
            addToWishlist(movie);
        }
    };

    return (
        <main className="movie-details-page">

            {movie.backdrop_path && (
                <div
                    className="movie-backdrop"
                    style={{
                        backgroundImage:
                            `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`
                    }}
                />
            )}

            <div className="movie-details-overlay" />

            <div className="container movie-details-container">

                <button
                    type="button"
                    className="details-back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="row g-4 g-lg-5 align-items-center">

                    {/* Poster */}
                    <div className="col-12 col-md-5 col-lg-4">

                        <div className="details-poster-wrapper">

                            {movie.poster_path ? (
                                <img
                                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="details-poster"
                                />
                            ) : (
                                <div className="details-no-poster">
                                    🎬

                                    <span>
                                        No Image Available
                                    </span>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Movie Information */}
                    <div className="col-12 col-md-7 col-lg-8">

                        <div className="movie-details-content">

                            <span className="details-label">
                                MOVIE DETAILS
                            </span>

                            <h1 className="details-title">
                                {movie.title}
                            </h1>

                            {movie.tagline && (
                                <p className="details-tagline">
                                    "{movie.tagline}"
                                </p>
                            )}

                            <div className="details-meta">

                                <span>
                                    📅 {releaseYear}
                                </span>

                                <span>
                                    ⭐ {rating}
                                </span>

                                <span>
                                    ⏱️ {runtime}
                                </span>

                            </div>

                            {/* Genres */}
                            {movie.genres?.length > 0 && (
                                <div className="details-genres">

                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="genre-badge"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}

                                </div>
                            )}

                            {/* Overview */}
                            <div className="details-overview">

                                <h3>
                                    Overview
                                </h3>

                                <p>
                                    {movie.overview ||
                                        "No overview available."}
                                </p>

                            </div>

                            {/* Information Grid */}
                            <div className="details-info-grid">

                                <div>
                                    <span>
                                        Language
                                    </span>

                                    <strong>
                                        {movie.spoken_languages?.[0]
                                            ?.english_name || "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Status
                                    </span>

                                    <strong>
                                        {movie.status || "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Votes
                                    </span>

                                    <strong>
                                        {movie.vote_count?.toLocaleString() ||
                                            "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Popularity
                                    </span>

                                    <strong>
                                        {movie.popularity?.toFixed(1) ||
                                            "N/A"}
                                    </strong>
                                </div>

                            </div>

                            {/* Actions */}
                            <div className="details-actions">

                                <button
                                    type="button"
                                    className={`btn ${
                                        saved
                                            ? "btn-danger"
                                            : "btn-primary"
                                    }`}
                                    onClick={handleWishlist}
                                >
                                    {saved
                                        ? "❤️ Remove from Wishlist"
                                        : "🤍 Add to Wishlist"}
                                </button>

                                {movie.homepage && (
                                    <a
                                        href={movie.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-light"
                                    >
                                        Official Website →
                                    </a>
                                )}

                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={() => navigate("/")}
                                >
                                    Browse More Movies
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default MovieDetails;