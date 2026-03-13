import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Landing from './pages/Landing';
import Loading from './components/common/Loading';
import GlassCard from './components/common/GlassCard';
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
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient1 bg-cover">
          {/* Skeleton sidebar - desktop only */}
          <GlassCard className="hidden md:flex flex-col h-screen w-[70px] !min-w-0" />
          {/* Loading content area */}
          <div className="flex-1 flex items-center justify-center">
            <Loading size="lg" text="Loading..." />
          </div>
          {/* Skeleton mobile header */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-10">
            <GlassCard className="w-full h-14 rounded-none" />
          </div>
          {/* Skeleton mobile bottom nav */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
            <GlassCard className="w-full h-16 rounded-none" />
          </div>
        </div>
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
