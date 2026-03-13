import Home from './Home';
import Nav from './Nav';
import { Switch, Route, Redirect } from 'react-router-dom';
import Today from './Today';
import Completed from './Completed';

export default function Dashboard({ authenticate }) {
  return (
    <div className="flex flex-col md:flex-row bg-gradient1 bg-cover min-h-screen">
      <Nav authenticate={authenticate} />
      <div className="flex-1 pt-16 pb-20 md:pt-0 md:pb-0">
        <Switch>
        <Route
          exact
          path="/dashboard/home"
          component={Home}
        />
        <Route 
          exact
          path="/dashboard/today"
          component={Today}
        />
        <Route 
          exact
          path="/dashboard/completed"
          component={Completed}
        />
        <Redirect from="/dashboard" to="/dashboard/home" />
        </Switch>
      </div>
    </div>
  );
}