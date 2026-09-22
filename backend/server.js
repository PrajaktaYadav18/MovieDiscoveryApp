const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const movieRoutes = require("./routes/movieRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Movie Discovery Backend is running"
    });
});

// Movie Routes
app.use("/api/movies", movieRoutes);

// Wishlist Routes
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});