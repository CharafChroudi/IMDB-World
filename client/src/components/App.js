import MoviesList from "./MoviesList/MoviesList";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <div>
      <h1>IMDB World</h1>
      <GlobalStyles />
      <MoviesList />
    </div>
  );
};

export default App;
