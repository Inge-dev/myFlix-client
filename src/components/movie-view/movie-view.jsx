import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {

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
        <Button variant="primary" onClick={onBackClick} className="mt-3">
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};
