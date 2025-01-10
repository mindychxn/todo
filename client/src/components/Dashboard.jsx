import Home from './Home';
import Nav from './Nav';
import { Switch, Route, Redirect } from 'react-router-dom';
import Today from './Today';
import Completed from './Completed';

export default function Dashboard({  authenticate }) {
  return (
    <div className="flex">
      <Nav authenticate={authenticate} />
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
          path="/dashboard/today"
          component={Completed}
        />
        <Redirect from="/dashboard" to="/dashboard/home" />
      </Switch>
    </div>
  );
}