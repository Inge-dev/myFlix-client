import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
export const MovieCard = ({ movie, onMovieClick }) => {

  // console.log("Image URL:", movie.ImagePath);
  return (
    <Card className="movie-card h-100 d-flex flex-column border-secondary">
      <Card.Img
        variant="top"
        src={movie.ImagePath || "https://via.placeholder.com/300x450?text=No+Image"}
        className="movie-card-img"
        style={{ height: '450px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="flex-grow-1">
          {movie.Description.length > 100 ? movie.Description.slice(0, 100) + '...' : movie.Description}
        </Card.Text>
        <Button onClick={() =>
          onMovieClick(movie)}
          variant="primary"
          className="mt-auto"
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string // or PropTypes.instanceOf(Date) if you parse it
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
