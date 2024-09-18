import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import Home from "./Home";

const Login = () => {
  const { setLoggedInUser } = useContext(LoggedInUserContext);
  const location = useLocation();
  const fetchUserData = async () => {
    try {
      const code = new URLSearchParams(location.search).get("code");
      const response = await fetch(`/oauth?code=${code}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      const user = data.data;
      setLoggedInUser({
        name: user.name,
        email: user.email,
        ratings: user.userRatings,
        loggedIn: true,
      });
      fetch("/changeActiveUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .catch((err) => console.error(err));
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <Home />
    </>
  );
};

export default Login;
