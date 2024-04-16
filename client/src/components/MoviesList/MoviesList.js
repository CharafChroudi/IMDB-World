import { useEffect, useState, useContext } from "react";
import { FetchedMoviesContext } from "../../contexts/FetchedMoviesContext";

import MovieCard from "./MovieCard";

const MoviesList = () => {
  const { moviesList } = useContext(FetchedMoviesContext);
  return (
    <div className="movies">
      {moviesList &&
        // moviesList.slice(0, 20).map((movie) => {
        moviesList.map((movie) => {
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
