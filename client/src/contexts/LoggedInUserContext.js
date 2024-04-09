import React, { useEffect, useState } from "react";

export const LoggedInUserContext = React.createContext();

const LoggedInUserProvider = ({ children }) => {
  //   const [allFaces, setAllFaces] = useState(null);

  useEffect(() => {
    const getFaces = async () => {
      try {
        // const res = await fetch("/faces");
        // const { allFaces } = await res.json();
        // setAllFaces(allFaces);
      } catch (err) {
        console.error(err);
      }
    };
    getFaces();
  }, []);
  return <LoggedInUserContext.Provider>{children}</LoggedInUserContext.Provider>;
};

export default LoggedInUserProvider;
