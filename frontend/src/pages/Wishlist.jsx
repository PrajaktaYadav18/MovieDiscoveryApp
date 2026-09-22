import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
    const navigate = useNavigate();

    const {
        wishlist,
        loading
    } = useWishlist();

    if (loading) {
        return (
            <main className="wishlist-page">
                <div className="wishlist-loading">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p>
                        Loading your wishlist...
                    </p>

                </div>
            </main>
        );
    }

    return (
        <main className="wishlist-page">

            <div className="container py-5">

                <div className="wishlist-header">

                    <div>
                        <h1>
                            ❤️ My Wishlist
                        </h1>

                        <p>
                            Movies you saved for later
                        </p>
                    </div>

                    <span className="wishlist-count">
                        {wishlist.length}{" "}
                        {wishlist.length === 1
                            ? "Movie"
                            : "Movies"}
                    </span>

                </div>

                {wishlist.length === 0 && (
                    <div className="wishlist-empty">

                        <div className="wishlist-empty-icon">
                            ❤️
                        </div>

                        <h2>
                            Your wishlist is empty
                        </h2>

                        <p>
                            Start adding movies you love
                            to your wishlist.
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/")}
                        >
                            Browse Movies
                        </button>

                    </div>
                )}

                {wishlist.length > 0 && (
                    <div className="row g-4">

                        {wishlist.map((movie) => (
                            <div
                                key={movie.id}
                                className="col-12 col-sm-6 col-md-4 col-lg-3"
                            >
                                <MovieCard
                                    movie={movie}
                                />
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </main>
    );
}

export default Wishlist;