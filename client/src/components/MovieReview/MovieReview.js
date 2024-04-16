import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { SelectedMovieContext } from "../../contexts/SelectedMovieContext";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { UserRatingContext } from "../../contexts/UserRatingContext";
import { NotificationContext } from "../../contexts/NotificationContext";

import Rating from "../Rating/Rating";
import MoviesList from "../MoviesList/MoviesList";

const MovieReview = () => {
  const { id } = useParams();
  const { selectedMovie, setMovieId } = useContext(SelectedMovieContext);
  const { LoggedInUser } = useContext(LoggedInUserContext);
  const { setUserRatings } = useContext(UserRatingContext);
  const { notification, setNotification } = useContext(NotificationContext);

  const handleRemoveRating = () => {
    const removedRatingArr = LoggedInUser.ratings.filter(
      (rating) => rating.movie !== selectedMovie.title
    );
    LoggedInUser.ratings = removedRatingArr;
    fetch("/removeRating", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: LoggedInUser }),
    })
      .then((response) => {
        response.json();
        setUserRatings(LoggedInUser.ratings);
        setNotification("Rating removed successfully.");
        setTimeout(() => {
          setNotification("");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setNotification("Failed to remove rating.");
        setTimeout(() => {
          setNotification("");
        }, 3000);
      });
  };
  useEffect(() => {
    setMovieId(id);
  }, [selectedMovie]);

  return (
    <>
      {selectedMovie ? (
        <StyledContainer>
          {notification && <Notification>{notification}</Notification>}
          <StyledSections>
            <StyledMovieInfo>
              <StyledTitle>{selectedMovie.title}</StyledTitle>
              <StyledPoster
                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                alt="moviePoster"
              />
              <span>Released on : {selectedMovie.release_date}</span>
              <span>
                IMDB Rating : {Math.round(selectedMovie.vote_average)}/10 ⭐
              </span>
              {LoggedInUser.loggedIn ? (
                <>
                  <Rating />
                  <StyledMsg onClick={handleRemoveRating}>
                    Remove Rating
                  </StyledMsg>
                  {notification && <Notification>{notification}</Notification>}
                </>
              ) : (
                <StyledMsg>Log in To rate it yourself !</StyledMsg>
              )}
            </StyledMovieInfo>
            <StyledDescription>
              <h4>Description: </h4>
              <StyledOverview>{selectedMovie.overview}</StyledOverview>
            </StyledDescription>
          </StyledSections>
        </StyledContainer>
      ) : (
        <MoviesList />
      )}
    </>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const StyledPoster = styled.img``;
const StyledSections = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10vw;
`;
const StyledMovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10vh;
  gap: 30px;
`;

const StyledTitle = styled.h2`
  margin: 0;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 4rem;
  width: 40%;
`;

const StyledOverview = styled.span`
  width: 30vw;
  line-height: 2;
`;
const StyledMsg = styled.span`
  color: black;
  font-weight: bold;
  padding: 20px;
  background-color: gold;

  &:hover {
    cursor: pointer;
  }
`;

const Notification = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: darkgray;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  animation: fadeOut 2s ease forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
`;

export default MovieReview;
