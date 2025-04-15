import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card.jsx";

import { MovieView } from "../movie-view/movie-view.jsx";

import { LoginView } from "../login-view/login-view.jsx";

import { SignupView } from "../signup-view/signup-view.jsx";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-app-il-c396ba198e0e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        // console.log(movies);
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
        setMovies(movies);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView
          onSignedUp={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      </>
    );
  }


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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};

