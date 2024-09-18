import React, { useEffect, useState } from "react";

export const FetchedMoviesContext = React.createContext();

const FetchedMoviesProvider = ({ children }) => {
  const [moviesList, setMoviesList] = useState([]);

  const addMovies = (movies) => {
    fetch("/AddMovies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movies),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };
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
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_cast=%2C",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        addMovies(response.results);
        setMoviesList([...moviesList, ...response.results]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <FetchedMoviesContext.Provider
      value={{ moviesList, setMoviesList, addMovies, getMovies }}
    >
      {children}
    </FetchedMoviesContext.Provider>
  );
};

export default FetchedMoviesProvider;
