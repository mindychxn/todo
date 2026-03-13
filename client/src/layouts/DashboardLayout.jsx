import Home from '../pages/Home';
import Nav from '../components/common/Nav';
import { Switch, Route, Redirect } from 'react-router-dom';
import Today from '../pages/Today';
import Completed from '../pages/Completed';
import Account from '../pages/Account';

export default function DashboardLayout({ authenticate }) {
  return (
    <div className="flex flex-col md:flex-row bg-gradient1 bg-cover min-h-screen">
      <Nav />
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
        <Route 
          exact
          path="/dashboard/account"
          render={(props) => <Account {...props} authenticate={authenticate} />}
        />
        <Redirect from="/dashboard" to="/dashboard/home" />
        </Switch>
      </div>
    </div>
  );
}
