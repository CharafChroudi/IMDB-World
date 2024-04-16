import React, { useEffect, useState, useContext } from "react";
import { LoggedInUserContext } from "./LoggedInUserContext";

export const UserRatingContext = React.createContext();

const UserRatingProvider = ({ children }) => {
  const [userRatings, setUserRatings] = useState([]);
  const [selectedMovieRating, setSelectedMovieRating] = useState(0);
  const { LoggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    setUserRatings(LoggedInUser.ratings);
  }, [LoggedInUser]);
  return (
    <UserRatingContext.Provider
      value={{
        userRatings,
        selectedMovieRating,
        setUserRatings,
        setSelectedMovieRating,
      }}
    >
      {children}
    </UserRatingContext.Provider>
  );
};

export default UserRatingProvider;
