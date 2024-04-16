import React, { useEffect, useState } from "react";

export const SearchedMovieContext = React.createContext();

const SearchedMovieProvider = ({ children }) => {
  const [searchedMovie, setSearchedMovie] = useState("");
  const [searchedMoviesList, setSearchedMovieList] = useState([]);
  const [moviesHaveBeenSearched, setMoviesHaveBeenSearched] = useState(false);

  useEffect(() => {}, [searchedMovie]);
  return (
    <SearchedMovieContext.Provider
      value={{
        searchedMovie,
        searchedMoviesList,
        moviesHaveBeenSearched,
        setSearchedMovie,
        setSearchedMovieList,
        setMoviesHaveBeenSearched,
      }}
    >
      {children}
    </SearchedMovieContext.Provider>
  );
};

export default SearchedMovieProvider;
