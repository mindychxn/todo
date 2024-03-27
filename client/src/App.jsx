import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} authenticate={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Registration {...props} authenticate={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} authenticate={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </>
  );
}
