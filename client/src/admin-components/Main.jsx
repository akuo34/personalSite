import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Axios from 'axios';
// import PasswordReset from './PasswordReset';

const Login = React.lazy(() => import('./Login'));
const App = React.lazy(() => import('./App'));

const Main = () => {

  const [user, setUser] = useState(null);
  const [showAdminToolBar, setShowAdminToolBar] = useState(false);
  const [banner, setBanner] = useState(null);

  const toolBarHandler = () => {
    if (user === 'admin') {
      showAdminToolBar ? setShowAdminToolBar(false) : setShowAdminToolBar(true)
    }
  }

  useEffect(() => {
    Axios
      .get('/read-cookie')
      .then(response => setUser(response.data.screen))
      .catch(err => console.error(err));

    Axios
      .get('/admin/api/about')
      .then(response => setBanner(response.data[0].bannerFireBaseUrl))
      .catch(err => console.error(err));
  }, [user]);

  const clearCookie = () => {
    Axios
      .get('/clear-cookie')
      .then(response => {
        setUser(response.data.screen);
        location.reload();
      })
      .catch(err => console.error(err));
  }

  const auth = (username, password) => {
    Axios
      .get('/authenticate', { auth: { username, password } })
      .then(response => setUser(response.data.screen))
      .catch(err => {
        alert('incorrect login');
        console.error(err)
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();

    const email = e.target.userEmail.value;
    const password = e.target.userPassword.value;

    auth(email, password);

    document.getElementById('form-login').reset();
    location.reload();
  };

  const returnHome = () => {
    window.location = "http://192.168.0.11:3434";
  }

  return (
    <div>
      <div className="container-admin-header">
        <img className="banner" src={banner}></img>
        <div className="container-logo-home">
          <div className="logo-home" onClick={returnHome}></div>
        </div>
        <div className="container-logo">
          <img className="logo" src="https://calendar-trips.s3-us-west-1.amazonaws.com/white_logo.jpg"></img>
        </div>
        <div className="container-h1">
          <h1>the wild ones</h1>
        </div>
        <div className={user === "admin" ? "container-icons" : "container-icons hidden"}>
          <img className="button-hamburger" src="https://calendar-trips.s3-us-west-1.amazonaws.com/hamburger_light_grey.svg" onClick={toolBarHandler}></img>
        </div>
      </div>
      {
        user === 'admin' ?
          <App showAdminToolBar={showAdminToolBar} toolBarHandler={toolBarHandler} clearCookie={clearCookie}></App>
          :
          <Router>
            <div className="buffer"></div>
            <div className="container-landing">
              <h2 className="subheader-client">admin console</h2>
              <Switch>
                <Route path="/admin/passwordReset">
                  <PasswordReset />
                </Route>
                <Route path="/admin" render={() => <Login signInHandler={e => signInHandler(e)} />} />
              </Switch>
            </div>
          </Router>
      }
    </div>
  )
}

const PasswordReset = () => {

}

export default Main;