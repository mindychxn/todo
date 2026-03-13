import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Landing from './pages/Landing';
import { API_URL } from './api/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPrevAuthed = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          method: 'POST',
          headers: { token: localStorage.token },
        });
        const parseRes = await res.json();
        parseRes ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    isPrevAuthed().then(() => console.log(isAuthenticated));
  }, []);

  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? <Landing {...props} /> : <Redirect to="/dashboard/" />
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} authenticate={setAuth} />
                ) : (
                  <Redirect to="/dashboard/" />
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
                  <Redirect to="/dashboard/" />
                )
              }
            />
            <Route
              exact
              path="/dashboard/*"
              render={(props) =>
                isAuthenticated ? (
                  <DashboardLayout {...props} authenticate={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Router>
      )}
    </>
  );
}
