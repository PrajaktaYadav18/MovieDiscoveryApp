# 🎬 Movie Discovery App

A full-stack Movie Discovery Application built using React.js, Node.js, Express.js, MongoDB, and TMDB API.

The application allows users to discover movies, search movies, filter movies by genre, sort results, view detailed movie information, and save movies to a persistent wishlist.

---

## 🚀 Features

### 🎬 Movie Discovery
- Browse popular movies
- Movie posters and ratings
- Release year information
- Responsive movie card layout

### 🔍 Movie Search
- Search movies by title
- 500ms debounce for search input
- Prevents unnecessary API requests
- Handles empty search results gracefully

### 🎭 Genre Filtering
- Fetch movie genres from TMDB
- Filter movies by genre
- Dynamic genre selection

### ↕️ Sorting
Supported sorting options:
- Popularity — High to Low
- Rating — High to Low
- Release Date — Newest First
- Release Date — Oldest First

### 📄 Pagination
- Supports multiple movie pages
- Previous/Next navigation
- Handles large movie result sets

### 🎥 Movie Details
Users can view:
- Movie poster
- Backdrop image
- Title
- Tagline
- Overview
- Rating
- Release year
- Runtime
- Genres
- Language
- Status
- Vote count
- Popularity
- Official movie website

### ❤️ Persistent Wishlist
- Add movies to wishlist
- Remove movies from wishlist
- Wishlist persists using MongoDB
- Duplicate movies are prevented
- Wishlist count displayed in navbar

### ⚡ Performance
- 500ms search debounce
- Backend in-memory caching
- Cache duration: 5 minutes
- Maximum cache items: 100
- Retry mechanism for temporary TMDB failures
- Request timeout handling
- Race-condition protection for search/results

### 🛡️ Error Handling
The application handles:
- API failures
- Empty search results
- Missing movie posters
- Missing movie information
- Invalid movie IDs
- Invalid genre IDs
- Invalid sorting options
- Wishlist duplicate entries
- Temporary external API failures

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- CSS
- Vite

### Backend
- Node.js
- Express.js
- Axios / external API integration
- CORS
- dotenv
- Nodemon

### Database
- MongoDB
- Mongoose

### External API
- TMDB API

---

## 📁 Project Structure

```text
MovieDiscoveryApp/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── MovieCard.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── context/
│   │   │   └── WishlistContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   ├── services/
│   │   │   └── movieApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── wishlistController.js
│   │
│   ├── models/
│   │   └── Wishlist.js
│   │
│   ├── routes/
│   │   ├── movieRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── services/
│   │   └── tmdbService.js
│   │
│   ├── middleware/
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md