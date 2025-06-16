import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const genres = ["All", "Thriller", "Romance", "Romantic Comedy", "Drama", "Musical", "Biography"];

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-app-il-c396ba198e0e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  useEffect(() => {
    if (!user && storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">

        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />

        <Routes>
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    setUser={setUser}
                  />
                )}
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView onSignedUp={(user, token) => { setUser(user); setToken(token) }} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Col xs={12} className="mb-4">
                      <select
                        className="form-select"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                      >
                        {["All", "Thriller", "Romance", "Romantic Comedy", "Drama", "Musical", "Biography"].map(
                          (genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          )
                        )}
                      </select>
                    </Col>

                    {(() => {

                      movies.forEach((movie) => {
                        console.log("Genre Name:", movie.Genre?.Name);
                      });

                      return movies
                        .filter((movie) => {
                          if (selectedGenre === "All") return true;

                          return movie.Genre && movie.Genre.Name === selectedGenre;
                        })
                        .map((movie) => (
                          <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <MovieCard
                              movie={movie} />
                          </Col>
                        ));
                    })()}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter >
  );
};
