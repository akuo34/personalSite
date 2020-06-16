import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from './App';
import LogIn from './LogIn';
import Axios from 'axios';
// import PasswordReset from './PasswordReset';

const Main = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios
      .get('/read-cookie')
      .then(response => setUser(response.data.screen))
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

  return (
    user === 'admin' ?
      <App showAdminToolBar={props.showAdminToolBar} toolBarHandler={props.toolBarHandler} clearCookie={clearCookie}></App>
      :
      <Router>
        <div className="container-landing">
          <h2 className="subheader-client">admin console</h2>
        <Switch>
          <Route path="/admin/passwordReset">
            <PasswordReset />
          </Route>
          <Route path="/admin">
            <LogIn signInHandler={e => signInHandler(e)} />
          </Route>
        </Switch>
        </div>
      </Router>
  )
}

const PasswordReset = () => {

}

export default Main;