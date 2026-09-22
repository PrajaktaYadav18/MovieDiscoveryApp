import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
    const navigate = useNavigate();

    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();

    const handleDetails = () => {
        navigate(`/movie/${movie.id}`);
    };

    const handleWishlist = () => {
        if (isInWishlist(movie.id)) {
            removeFromWishlist(movie.id);
        } else {
            addToWishlist(movie);
        }
    };

    const releaseYear = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "N/A";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "N/A";

    const saved = isInWishlist(movie.id);

    return (
        <div className="movie-card h-100">

            <div className="movie-poster-wrapper">

                {movie.poster_path ? (
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                ) : (
                    <div className="no-poster">
                        <span>🎬</span>
                        <p>No Image Available</p>
                    </div>
                )}

                <div className="rating-badge">
                    ⭐ {rating}
                </div>

                <button
                    type="button"
                    className={`wishlist-btn ${
                        saved ? "saved" : ""
                    }`}
                    onClick={handleWishlist}
                    title={
                        saved
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"
                    }
                >
                    {saved ? "❤️" : "🤍"}
                </button>

            </div>

            <div className="movie-card-body">

                <h5
                    className="movie-title"
                    title={movie.title}
                >
                    {movie.title}
                </h5>

                <div className="movie-meta">

                    <span>
                        📅 {releaseYear}
                    </span>

                    <span>
                        ⭐ {rating}
                    </span>

                </div>

                <button
                    type="button"
                    className="btn btn-primary movie-details-btn"
                    onClick={handleDetails}
                >
                    View Details
                </button>

            </div>

        </div>
    );
}

export default MovieCard;