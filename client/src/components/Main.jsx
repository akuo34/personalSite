import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './App';
import LogIn from './LogIn';
import Axios from 'axios';
// import PasswordReset from './PasswordReset';

const Main = () => {

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
      .then(response => setUser(response.data.screen))
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
  };

  return (
    user === 'admin' ?
      <App clearCookie={clearCookie}></App>
      :
      <Router>
        <div className="container-landing">
          <div>
            <h1>The Wild Ones</h1>
            <h2>Admin Console</h2>
          </div>
          {/* <nav>
            <ul>
              <li>
                <Link className="link" to="/admin/">Log in</Link>
              </li>
              <li>
                <Link className="link" to="/admin/passwordReset">Reset Password</Link>
              </li>
            </ul>
          </nav> */}
        </div>

        <Switch>
          <Route path="/admin/passwordReset">
            <PasswordReset />
          </Route>
          <Route path="/admin/">
            <LogIn signInHandler={e => signInHandler(e)} />
          </Route>
        </Switch>
      </Router >
  )
}

const PasswordReset = () => {

}

export default Main;