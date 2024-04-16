import React, { useEffect, useState } from "react";

export const SelectedMovieContext = React.createContext();

const SelectedMovieProvider = ({ children }) => {
  const [movieId, setMovieId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (movieId) {
      fetch(`/getMovie/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedMovie(data.data);
        })
        .catch((error) => {
          console.error("No movie found!:", error);
        });
    }
  }, [movieId]);
  return (
    <SelectedMovieContext.Provider
      value={{
        movieId,
        selectedMovie,
        setMovieId,
        setSelectedMovie,
      }}
    >
      {children}
    </SelectedMovieContext.Provider>
  );
};

export default SelectedMovieProvider;
