// AppRouter.js
import { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import BlogsList from "./components/blog/blogsList";
import Login from "./components/auth/login";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Route
          path="/login"
          exact
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/home" />
            ) : (
              <Login {...props} setAuthenticated={setAuthenticated} />
            )
          }
        />
        <PrivateRoute
          path="/home"
          exact
          component={Home}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/blogs"
          exact
          component={BlogsList}
          isAuthenticated={isAuthenticated}
        />
        {!isAuthenticated && <Redirect from="/" to="/login" />}
      </div>
    </Router>
  );
};

export default AppRouter;
