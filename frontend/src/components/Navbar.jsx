import { Link, NavLink } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
    const { wishlist } = useWishlist();

    return (
        <nav className="movie-navbar">
            <div className="container">

                <div className="movie-navbar-inner">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="movie-logo"
                    >
                        <span className="movie-logo-icon">
                            🎬
                        </span>

                        <span>
                            Movie<span>Discovery</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="movie-nav-links">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `movie-nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            <span>⌂</span>
                            Home
                        </NavLink>

                        <NavLink
                            to="/wishlist"
                            className={({ isActive }) =>
                                `movie-nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            <span>♡</span>
                            Wishlist

                            <span className="wishlist-nav-count">
                                {wishlist.length}
                            </span>
                        </NavLink>

                    </div>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;