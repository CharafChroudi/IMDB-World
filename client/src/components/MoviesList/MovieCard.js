import { useContext } from "react";
import { SelectedMovieContext } from "../../contexts/SelectedMovieContext";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { setSelectedMovie } = useContext(SelectedMovieContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
    setSelectedMovie(movie);
  };
  return (
    <>
      {movie.poster_path && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="moviePoster"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          />
          <h3 style={{ cursor: "pointer" }} onClick={handleClick}>
            {movie.title}
          </h3>
        </>
      )}
    </>
  );
};

export default MovieCard;
