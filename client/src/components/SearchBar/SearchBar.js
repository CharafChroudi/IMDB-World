import { useEffect, useContext } from "react";
import { FetchedMoviesContext } from "../../contexts/FetchedMoviesContext";
import { SelectedMovieContext } from "../../contexts/SelectedMovieContext";
import { SearchedMovieContext } from "../../contexts/SearchedMoviesContext";

const SearchBar = () => {
  const {
    searchedMovie,
    setSearchedMovie,
    setMoviesHaveBeenSearched,
    setSearchedMovieList,
  } = useContext(SearchedMovieContext);
  const { moviesList, setMoviesList, addMovies } =
    useContext(FetchedMoviesContext);
  const { setSelectedMovie } = useContext(SelectedMovieContext);

  function handleChange(event) {
    setSearchedMovie(event.target.value);
  }
  const handleSearch = (e) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2M3MjBmNzdlZTk4M2U4MWY0ODFhYjM0ZGMyNjAwMiIsInN1YiI6IjY2MGYwYjIyMTQ5NTY1MDE0YWJhMmQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IynYzP0G3FoSjgK2XbF-oSIkykdDssA0NumF4D4ky9s",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMoviesList([...moviesList, ...response.results]);
        setSearchedMovieList(response.results);
        addMovies(response.results);
        setSearchedMovie("");
        setSelectedMovie(null);
        setMoviesHaveBeenSearched(true);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter" || event.keyCode === 13) {
        handleSearch(event);
      }
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchedMovie]);
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search.."
        name="search"
        value={searchedMovie}
        onChange={handleChange}
      />
      <button
        id="searchButton"
        onClick={(e) => {
          handleSearch(e);
        }}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
