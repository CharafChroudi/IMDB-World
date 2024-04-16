import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import LoggedInUserProvider from "./contexts/LoggedInUserContext";
import FetchedMoviesProvider from "./contexts/FetchedMoviesContext";
import SelectedMovieProvider from "./contexts/SelectedMovieContext";
import SearchedMovieProvider from "./contexts/SearchedMoviesContext";
import UserRatingProvider from "./contexts/UserRatingContext";
import NotificationProvider from "./contexts/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoggedInUserProvider>
    <UserRatingProvider>
      <FetchedMoviesProvider>
        <SelectedMovieProvider>
          <SearchedMovieProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </SearchedMovieProvider>
        </SelectedMovieProvider>
      </FetchedMoviesProvider>
    </UserRatingProvider>
  </LoggedInUserProvider>
);
