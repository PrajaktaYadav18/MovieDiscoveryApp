
import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";

import {
  getPopularMovies,
  searchMovies,
  getMovieGenres,
  getMoviesByGenre,
} from "../services/movieApi";

function Home() {
  const requestIdRef = useRef(0);

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Genre Error:", err);
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies
  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      const requestId = ++requestIdRef.current;

      try {
        setLoading(true);
        setError("");

        let data;

        if (search.trim()) {
          data = await searchMovies(
            search.trim(),
            page
          );
        } else if (selectedGenre) {
          data = await getMoviesByGenre(
            selectedGenre,
            page,
            sortBy
          );
        } else {
          data = await getPopularMovies(
            page,
            sortBy
          );
        }

        // Ignore old request
        if (
          cancelled ||
          requestId !== requestIdRef.current
        ) {
          return;
        }

        setMovies(data.results || []);

        setTotalPages(
          Math.min(
            data.total_pages || 1,
            500
          )
        );
      } catch (err) {
        // Ignore old request errors
        if (
          cancelled ||
          requestId !== requestIdRef.current
        ) {
          return;
        }

        console.error(
          "Movie Fetch Error:",
          err
        );

        setMovies([]);

        setError(
          "Unable to load movies. Please try again."
        );
      } finally {
        if (
          !cancelled &&
          requestId === requestIdRef.current
        ) {
          setLoading(false);
        }
      }
    };

    // 500ms debounce
    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    search,
    page,
    selectedGenre,
    sortBy,
  ]);

  // Search
  const handleSearch = (event) => {
    const value = event.target.value;

    setSearch(value);
    setSelectedGenre("");
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setPage(1);
  };

  // Pagination
  const handlePrevious = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Genre
  const handleGenreSelect = (genreId) => {
    setSearch("");
    setSelectedGenre(String(genreId));
    setPage(1);
  };

  const selectedGenreName =
    genres.find(
      (genre) =>
        String(genre.id) === selectedGenre
    )?.name || "";

  const handleClearGenre = () => {
    setSelectedGenre("");
    setPage(1);
  };

  // Retry
  const handleRetry = () => {
    setError("");
    setPage((currentPage) => currentPage);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content text-center">

            <span className="hero-badge">
              🎬 Discover • Explore • Enjoy
            </span>

            <h1 className="hero-title">
              Discover Your Next
              <span>Favorite Movie</span>
            </h1>

            <p className="hero-description">
              Search thousands of movies,
              explore details, and save your
              favorites.
            </p>

            {/* Search */}
            <div className="search-wrapper">

              <div className="search-box">

                <span className="search-icon">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search movies..."
                  value={search}
                  onChange={handleSearch}
                />

                {search && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={handleClearSearch}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}

                <button
                  type="button"
                  className="search-btn"
                  onClick={() => {
                    setSearch(search.trim());
                    setPage(1);
                  }}
                >
                  Search
                </button>

              </div>

              {/* Genre Filters */}
              <div className="genre-filter-wrapper">

                <button
                  type="button"
                  className={`genre-filter-btn ${
                    selectedGenre === ""
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedGenre("");
                    setPage(1);
                  }}
                >
                  All
                </button>

                {genres.map((genre) => (
                  <button
                    type="button"
                    key={genre.id}
                    className={`genre-filter-btn ${
                      selectedGenre ===
                      String(genre.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handleGenreSelect(genre.id)
                    }
                  >
                    {genre.name}
                  </button>
                ))}

              </div>

              {/* Selected Genre */}
              {selectedGenre &&
                !search.trim() && (
                  <div className="selected-filter">

                    <div className="selected-filter-info">

                      <span className="selected-filter-icon">
                        🎭
                      </span>

                      <span>
                        {selectedGenreName} Movies
                      </span>

                    </div>

                    <button
                      type="button"
                      className="selected-filter-clear"
                      onClick={handleClearGenre}
                    >
                      Clear
                      <span>✕</span>
                    </button>

                  </div>
                )}

              {/* Sort */}
              <div className="sort-wrapper">

                <label htmlFor="sortMovies">
                  Sort By:
                </label>

                <select
                  id="sortMovies"
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    setPage(1);
                  }}
                  className="sort-select"
                  disabled={search.trim() !== ""}
                >
                  <option value="popularity.desc">
                    Popularity
                  </option>

                  <option value="vote_average.desc">
                    Rating — High to Low
                  </option>

                  <option value="primary_release_date.desc">
                    Release Date — Newest
                  </option>

                  <option value="primary_release_date.asc">
                    Release Date — Oldest
                  </option>
                </select>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="movies-section">
        <div className="container">

          <div className="section-header">

            <div>
              <h2>
                {search.trim()
                  ? "Search Results"
                  : selectedGenre ? `${selectedGenreName} Movies`: "Popular Movies"}
              </h2>

              <p>
                {search.trim()
                  ? `Results for "${search}"`
                  : selectedGenre
                  ? `Explore the best ${selectedGenreName} movies`
                  : "Trending movies people are watching"}
              </p>
            </div>

            {!loading &&
              movies.length > 0 && (
                <span className="result-count">
                  Page {page} of {totalPages}
                </span>
              )}

          </div>

          {/* Loading */}
          {loading && (
            <div className="loading-container">

              <div
                className="spinner-border text-primary"
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>

              <p>
                Finding movies...
              </p>

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="error-container">

              <div className="alert alert-danger">
                {error}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRetry}
              >
                Try Again
              </button>

            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            movies.length === 0 && (
              <div className="empty-container">

                <div className="empty-icon">
                  🎬
                </div>

                <h3>
                  No movies found
                </h3>

                <p>
                  Try searching with a
                  different movie name.
                </p>

              </div>
            )}

          {/* Movie Cards */}
          {!loading &&
            !error &&
            movies.length > 0 && (
              <div className="row g-4">

                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}

              </div>
            )}

          {/* Pagination */}
          {!loading &&
            !error &&
            movies.length > 0 && (
              <div className="pagination-wrapper">

                <button
                  type="button"
                  className="pagination-btn"
                  disabled={page === 1}
                  onClick={handlePrevious}
                >
                  ← Previous
                </button>

                <div className="page-number">
                  {page}
                </div>

                <button
                  type="button"
                  className="pagination-btn"
                  disabled={page >= totalPages}
                  onClick={handleNext}
                >
                  Next →
                </button>

              </div>
            )}

        </div>
      </section>
    </main>
  );
}

export default Home;

