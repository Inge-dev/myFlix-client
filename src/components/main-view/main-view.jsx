import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card.jsx";

import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Blind Side",
      description:
        "The story of Michael Oher, a homeless and traumatized boy who becomes an All-American football player with the help of a caring woman and her family.",
      image: "https://cdn.displate.com/artwork/460x640/2024-11-01/e95fa4c4-e05b-4523-a775-2d3bb6e83927.jpg",
      genre: "Drama",
      director: "John Lee Hancock",
    },
    {
      id: 2,
      title: "The Proposal",
      description:
        "A high-powered book editor forces her assistant to marry her to avoid deportation to Canada.",
      image: "https://cdn.cinematerial.com/p/297x/siyjtact/the-proposal-movie-poster-md.jpg?v=1456019705",
      genre: "Romantic Comedy",
      director: "Anne Fletcher",
    },
    {
      id: 3,
      title: "How to Lose a Guy in 10 Days",
      description:
        "A journalist and an advertising executive enter a relationship for different hidden agendas, but love complicates their plans.",
      image: "https://www.themoviedb.org/t/p/original/cwtfrrUyZ2nRj2jPBFPZaurgGDt.jpg",
      genre: "Romantic Comedy",
      director: "Donald Petrie",
    },
    {
      id: 5,
      title: "The Sound of Music",
      description:
        "A woman leaves an Austrian convent to become a governess to a widowed naval officer's seven children.",
      image: "https://cdn.shopify.com/s/files/1/1057/4964/products/The-Sound-of-Music-Vintage-Movie-Poster-Original_023f5c9c_186x.jpg?v=1741707643",
      genre: "Musical",
      director: "Robert Wise",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

