import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getWishlist,
    addToWishlist as addWishlistApi,
    removeFromWishlist as removeWishlistApi
} from "../services/movieApi";


const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);


    // =========================
    // GET WISHLIST FROM MONGODB
    // =========================

    useEffect(() => {

        const loadWishlist = async () => {

            try {

                setLoading(true);

                const data = await getWishlist();


                // Convert MongoDB data
                // into TMDB movie format

                const movies = data.map((item) => ({
                    id: item.movieId,
                    title: item.title,
                    poster_path: item.posterPath,
                    release_date: item.releaseDate,
                    vote_average: item.voteAverage,
                    overview: item.overview
                }));


                setWishlist(movies);

            } catch (error) {

                console.error(
                    "Wishlist Load Error:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };


        loadWishlist();

    }, []);


    // =========================
    // ADD TO WISHLIST
    // =========================

    const addToWishlist = async (movie) => {

        try {

            const savedMovie =
                await addWishlistApi(movie);


            const formattedMovie = {

                id: savedMovie.movieId,

                title: savedMovie.title,

                poster_path:
                    savedMovie.posterPath,

                release_date:
                    savedMovie.releaseDate,

                vote_average:
                    savedMovie.voteAverage,

                overview:
                    savedMovie.overview

            };


            setWishlist((previousWishlist) => {

                const alreadyExists =
                    previousWishlist.some(
                        (item) =>
                            item.id === formattedMovie.id
                    );


                if (alreadyExists) {
                    return previousWishlist;
                }


                return [
                    ...previousWishlist,
                    formattedMovie
                ];

            });

        } catch (error) {

            console.error(
                "Add Wishlist Error:",
                error
            );

        }
    };


    // =========================
    // REMOVE FROM WISHLIST
    // =========================

    const removeFromWishlist = async (movieId) => {

        try {

            await removeWishlistApi(movieId);


            setWishlist((previousWishlist) =>
                previousWishlist.filter(
                    (movie) =>
                        movie.id !== movieId
                )
            );

        } catch (error) {

            console.error(
                "Remove Wishlist Error:",
                error
            );

        }
    };


    // =========================
    // CHECK WISHLIST
    // =========================

    const isInWishlist = (movieId) => {

        return wishlist.some(
            (movie) =>
                movie.id === movieId
        );

    };


    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                loading,
                addToWishlist,
                removeFromWishlist,
                isInWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );

};


export const useWishlist = () => {

    return useContext(WishlistContext);

};