import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card.jsx";

import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-app-il-c396ba198e0e.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        // const moviesFromApi = data.map((movie) => {
        //   return {
        //     id: movie._id,
        //     title: movie.Title,
        //     description: movie.Description,
        //     genre: movie.Genre?.Name,
        //     director: movie.Director?.Name,
        //     image: movie.ImagePath,
        //     featured: movie.Featured,
        //   };
        // });
        setMovies(data);
      });
  }, []);

  console.log("movies:", movies);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <h2>Movie List</h2>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

