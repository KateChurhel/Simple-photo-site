// libraries
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// constants
import ROUTES from '../constants/routes';
// views
import Header from './Header';
import Photos from './Photos';
import Contact from './Contact';
import Login from './Admin/Login';
import RegisterPage from './Admin/RegisterPage';
import AddPhoto from './Admin/AddPhoto';
import PhotosData from './Admin/PhotosData';

const App = () => (
  <div>
    <Switch>
      <Route
        component={Login}
        exact
        path={ROUTES.adminLogin}
      />
      <Route
        component={RegisterPage}
        exact
        path={ROUTES.adminRegister}
      />
      <Route
        component={AddPhoto}
        exact
        path={ROUTES.adminAddPhoto}
      />
      <Route
        component={PhotosData}
        exact
        path={ROUTES.adminPhotos}
      />
      <Route
        component={AddPhoto}
        exact
        path={ROUTES.adminEditPhoto}
      />
      <Route>
        <Header />
        <Switch>
          <Route
            component={Photos}
            exact
            path={ROUTES.photos}
          />
          <Route
            component={Contact}
            exact
            path={ROUTES.contact}
          />
          <Route
            path="*"
            render={() => (
              <Redirect to={ROUTES.photos} />
            )}
          />
        </Switch>
      </Route>
    </Switch>
    <ToastContainer newestOnTop />
  </div>
);

export default App;
