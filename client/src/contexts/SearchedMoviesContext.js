import React, { useEffect, useState } from "react";

export const SearchedMovieContext = React.createContext();

const SearchedMovieProvider = ({ children }) => {
  const [searchedMovie, setSearchedMovie] = useState("");
  const [moviesHaveBeenSearched, setMoviesHaveBeenSearched] = useState(false);

  useEffect(() => {}, [searchedMovie]);
  return (
    <SearchedMovieContext.Provider
      value={{ searchedMovie,moviesHaveBeenSearched, setSearchedMovie, setMoviesHaveBeenSearched }}
    >
      {children}
    </SearchedMovieContext.Provider>
  );
};

export default SearchedMovieProvider;
