import { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    // Check if the token is expired when the app loads
    if (authCtx.isLoggedIn && !authCtx.token) {
      alert("Your session has expired. Please log in again.");
      authCtx.logout();
    }
  }, [authCtx]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
        <Route path='/auth'>
          <AuthPage />
        </Route>
        )}
        <Route path='/profile'>
        {authCtx.isLoggedIn &&  <UserProfile />}
        {!authCtx.isLoggedIn && <Redirect to='/auth' /> }
        </Route>
       
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
