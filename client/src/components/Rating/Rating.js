import React, { useState, useContext, useEffect } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { SelectedMovieContext } from "../../contexts/SelectedMovieContext";
import { NotificationContext } from "../../contexts/NotificationContext";

const Rating = () => {
  const { LoggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const { selectedMovie } = useContext(SelectedMovieContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    const newRating = {
      id: selectedMovie.id,
      movie: selectedMovie.title,
      image: selectedMovie.poster_path,
      rating: value,
    };
    const existingRatingIndex = LoggedInUser.ratings.findIndex(
      (rating) => rating.movie === newRating.movie
    );

    if (existingRatingIndex === -1) {
      setLoggedInUser((user) => ({
        ...user,
        ratings: [...user.ratings, newRating],
      }));
      setNotification("Rating has been added.");
    } else {
      setLoggedInUser((user) => {
        const updatedRatings = [...user.ratings];
        updatedRatings[existingRatingIndex] = {
          ...updatedRatings[existingRatingIndex],
          rating: value,
        };
        return {
          ...user,
          ratings: updatedRatings,
        };
      });
      setNotification("Rating has been updated.");
    }
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };
  useEffect(() => {
    fetch("/rating", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: LoggedInUser }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    if (LoggedInUser.ratings) {
      const selectedMovieRating = LoggedInUser.ratings.find(
        (obj) => obj.movie === selectedMovie.title
      );
      if (selectedMovieRating) {
        setRating(selectedMovieRating.rating);
      }
    }
  }, [LoggedInUser.ratings, selectedMovie]);

  useEffect(() => {
    if (notification === "Rating removed successfully.") {
      setRating(0);
    }
  }, [notification]);
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={value <= rating ? "star selected" : "star"}
          onClick={() => handleClick(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
