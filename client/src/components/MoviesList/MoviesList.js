import { useContext } from "react";
import { FetchedMoviesContext } from "../../contexts/FetchedMoviesContext";
import { SearchedMovieContext } from "../../contexts/SearchedMoviesContext";

import MovieCard from "./MovieCard";

const MoviesList = () => {
  const { moviesList } = useContext(FetchedMoviesContext);
  const { searchedMoviesList, moviesHaveBeenSearched } =
    useContext(SearchedMovieContext);
  return (
    <div className="movies">
      {!moviesHaveBeenSearched
        ? moviesList &&
          moviesList.slice(0, 20).map((movie) => {
            return (
              <div key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </div>
            );
          })
        : searchedMoviesList.slice(0, 20).map((movie) => {
            return (
              <div key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </div>
            );
          })}
    </div>
  );
};
export default MoviesList;
