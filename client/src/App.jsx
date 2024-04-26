import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';
import Landing from './components/Landing';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPrevAuthed = async () => {
      try {
        const res = await fetch('http://localhost:3000/auth/verify', {
          method: 'POST',
          headers: { token: localStorage.token },
        });
        const parseRes = await res.json();
        console.log('is Auth' + parseRes);
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
                !isAuthenticated ? <Landing {...props} /> : <Redirect to="/dashboard" />
              }
            />
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
      )}
    </>
  );
}
