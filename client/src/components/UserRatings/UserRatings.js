import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { UserRatingContext } from "../../contexts/UserRatingContext";
import { SelectedMovieContext } from "../../contexts/SelectedMovieContext";
import { FetchedMoviesContext } from "../../contexts/FetchedMoviesContext";
import { SearchedMovieContext } from "../../contexts/SearchedMoviesContext";
import MoviesList from "../MoviesList/MoviesList";

const UserRatings = () => {
  const { userRatings, setSelectedMovieRating } = useContext(UserRatingContext);
  const { selectedMovie, setSelectedMovie } = useContext(SelectedMovieContext);
  const { moviesList } = useContext(FetchedMoviesContext);
  const { searchedMovie, moviesHaveBeenSearched, setMoviesHaveBeenSearched } =
    useContext(SearchedMovieContext);
  const navigate = useNavigate();

  const handleClick = (rating) => {
    moviesList.map((movieItem) => {
      if (movieItem.title === rating.movie) {
        setSelectedMovie(movieItem);
        setSelectedMovieRating(rating.rating);
        navigate(`/movie/${movieItem.id}`);
      }
    });
  };
  useEffect(() => {
    if (moviesHaveBeenSearched) {
      setMoviesHaveBeenSearched(!moviesHaveBeenSearched);
    }
  }, []);
  return (
    <>
      {moviesHaveBeenSearched ? (
        <MoviesList />
      ) : userRatings.length ? (
        <StyledRatingsList>
          <h2>Your ratings: </h2>
          {userRatings.map((rating, index) => {
            return (
              <StyledRating key={index}>
                <StyledPoster
                  src={`https://image.tmdb.org/t/p/w500${rating.image}`}
                  alt={`${rating.movie} poster`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClick(rating);
                  }}
                />
                <StyledHeader
                  onClick={() => {
                    handleClick(rating);
                  }}
                >
                  {rating.movie}
                </StyledHeader>
                <div className="rating" style={{ flex: "1" }}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      style={{ fontSize: "4rem" }}
                      className={
                        value <= rating.rating ? "star selected" : "star"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </StyledRating>
            );
          })}
        </StyledRatingsList>
      ) : (
        <h2>
          You Still have not rated any movies! Sign In first to save your
          progress.
        </h2>
      )}
    </>
  );
};

const StyledRatingsList = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 3vh 5vw; */
`;

const StyledRating = styled.div`
  width: 80vw;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
`;

const StyledPoster = styled.img`
  flex: 1;
  height: 50vh;
  border-radius: 10px;
`;

const StyledHeader = styled.h2`
  flex: 2;
  cursor: pointer;
  &:hover {
    color: gold;
  }
`;
export default UserRatings;
