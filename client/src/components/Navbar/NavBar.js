import React, { useEffect, useContext, useState } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { FetchedMoviesContext } from "../../contexts/FetchedMoviesContext";
import { SearchedMovieContext } from "../../contexts/SearchedMoviesContext";

import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import GoogleSignIn from "../SignIn/GoogleSignIn";

const NavBar = () => {
  const navigate = useNavigate();
  const { LoggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const { moviesHaveBeenSearched , setMoviesHaveBeenSearched } =
    useContext(SearchedMovieContext);
  const { setMoviesList, addMovies, getMovies } =
    useContext(FetchedMoviesContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (to) => {
    navigate(to);
    getMovies();
  };
  const handleSearchOff = () => {
    if (moviesHaveBeenSearched) {
      setMoviesHaveBeenSearched(!moviesHaveBeenSearched);
    }
  };
  const handleLogout = () => {
    const userToLogOut = LoggedInUser;
    fetch("/signOutUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogOut),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
    setLoggedInUser({
      name: "",
      email: "",
      loggedIn: false,
    });
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <StyledNavBar>
      <NavigationGroup>
        <NavigationLink
          to="/"
          onClick={() => {
            handleClick("/");
          }}
        >
          Home
        </NavigationLink>
        <NavigationLink
          to="/myRatings"
          onClick={() => {
            handleSearchOff();
          }}
        >
          {" "}
          My Ratings{" "}
        </NavigationLink>{" "}
      </NavigationGroup>
      <StyledTitle
        onClick={() => {
          handleClick("/");
        }}
      >
        {" "}
        IMDB World 🐬
      </StyledTitle>
      <SearchBar />
      <ProfileSection onClick={handleProfileClick}>
        <GoogleSignIn />
        {LoggedInUser.loggedIn && (
          <>
            <NavigationLink className="login">
              Hi {LoggedInUser.name}
            </NavigationLink>
            {isDropdownOpen && (
              <DropdownMenu>
                <StyledLogout to="/" onClick={handleLogout}>
                  Logout
                </StyledLogout>
              </DropdownMenu>
            )}
          </>
        )}
      </ProfileSection>
    </StyledNavBar>
  );
};

const StyledNavBar = styled.nav`
  background: navy;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: gold;
  margin-left: 50px;
  &:hover {
    cursor: pointer;
  }
`;
const NavigationGroup = styled.div`
  display: flex;
  align-items: center;
`;

const NavigationLink = styled(Link)`
  color: white;
  margin: 0 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3rem;

  &:hover {
    color: #ffff00;
  }
`;

const ProfileSection = styled.div`
  font-weight: bold;
  color: white;
  margin: 0 20px;
  cursor: pointer;

  &:hover {
    color: #ffff00;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 10vw;
  top: 15vh;
  right: 1vw;
  background-color: gold;
  padding: 10px;
`;

const StyledLogout = styled(Link)`
  margin: 0 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3rem;
  &:hover {
    color: white;
  }
`;

export default NavBar;
