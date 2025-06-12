import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  const isFavorite = user.favoriteMovies.includes(movie._id);

  const handleAddFavorites = () => {
    fetch(`https://movie-app-il-c396ba198e0e.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        alert(`${movie.Title} has been added to your favorites!`);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch(() => alert("Could not add movie to favorites"));
  };

  const handleRemoveFavorite = () => {
    fetch(`https://movie-app-il-c396ba198e0e.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          const updatedFavorites = user.favoriteMovies.filter(
            (id) => id !== movie._id
          );
          setUser({ ...user, favoriteMovies: updatedFavorites });

          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, favoriteMovies: updatedFavorites })
          );
          alert(`${movie.Title} has been removied from your favorites.`);
        }
      })
      .catch((error) => {
        console.error("Error removing favorite:", error);
        alert("Something went wrong.");
      });
  };


  return (
    <Card className="movie-view border-secondary">
      <Card.Img
        variant="top"
        className="img-fluid"
        src={movie.ImagePath?.trim().replace("http://", "https://") || "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.Title}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {movie.Description}
        </Card.Text>
        <Card.Text>
          <strong>Genre:</strong> {movie.Genre?.Name}
        </Card.Text>
        <Card.Text>
          <strong>Genre Description:</strong> {movie.Genre?.Description}
        </Card.Text>
        <Card.Text>
          <strong>Director:</strong> {movie.Director?.Name}
        </Card.Text>
        <Card.Text>
          <strong>Director Bio:</strong> {movie.Director?.Bio}
        </Card.Text>
        <Card.Text>
          <strong>Birth Date:</strong> {new Date(movie.Director?.Birth).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Featured:</strong> {movie.Featured ? "Yes" : "No"}
        </Card.Text>
        {isFavorite ? (
          <Button
            variant="warning"
            onClick={handleRemoveFavorite}
            className="me-2">
            Remove from Favorites
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleAddFavorites}
            className="custom-colored-button me-2">
            Add to Favorites
          </Button>
        )}
        <Link to="/" className="mt-3">
          <Button variant="primary" className="custom-colored-button">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
};