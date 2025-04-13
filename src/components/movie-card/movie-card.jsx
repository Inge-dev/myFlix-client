import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {

  console.log("Image URL:", movie.ImagePath);
  return (
    <div
      onClick={() =>
        onMovieClick(movie)}
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      {movie.Title}
    </div>
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
