import React, { useEffect, useState } from "react";

export const LoggedInUserContext = React.createContext();

const LoggedInUserProvider = ({ children }) => {
  const [LoggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
    ratings: [],
    loggedIn: false,
  });
  useEffect(() => {
    fetch("/activeUser")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const activeUser = data.data;
          setLoggedInUser({
            name: activeUser.name,
            email: activeUser.email,
            ratings: activeUser.userRatings,
            loggedIn: true,
          });
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  }, []);
  return (
    <LoggedInUserContext.Provider value={{ LoggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
