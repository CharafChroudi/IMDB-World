import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import NavBar from "./Navbar/NavBar";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import MovieReview from "./MovieReview/MovieReview";
import UserRatings from "./UserRatings/UserRatings";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <NavBar />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/oauth" element={<Login />} />
        <Route path="/myRatings" element={<UserRatings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<MovieReview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </Router>
  );
};

export default App;
