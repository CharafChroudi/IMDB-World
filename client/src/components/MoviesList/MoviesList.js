import { useEffect, useState } from "react";

const MoviesList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const getMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2M3MjBmNzdlZTk4M2U4MWY0ODFhYjM0ZGMyNjAwMiIsInN1YiI6IjY2MGYwYjIyMTQ5NTY1MDE0YWJhMmQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IynYzP0G3FoSjgK2XbF-oSIkykdDssA0NumF4D4ky9s",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=b3c720f77ee983e81f481ab34dc26002",
      options
    )
      .then((response) => response.json())
      .then((response) => setMoviesList(response.results))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="movies">
      {moviesList &&
        moviesList.map((movie) => {
          return (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="moviePoster"
              />
            </div>
          );
        })}
    </div>
  );
};
export default MoviesList;
