import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from '../admin-components/Main';
import Gallery from './Gallery';
import Murals from './Murals';
import About from './About';
import Events from './Events';

const Client = () => {

  const [showClientToolBar, setShowClientToolBar] = useState(false);
  const [showAdminToolBar, setShowAdminToolBar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios
      .get('/read-cookie')
      .then(response => setUser(response.data.screen))
      .catch(err => console.error(err));
  }, [user]);

  const toolBarHandler = () => {
    if (window.location.href.indexOf('admin') !== -1 && user === 'admin') {
      showAdminToolBar ? setShowAdminToolBar(false) : setShowAdminToolBar(true)
    } else {
      showClientToolBar ? setShowClientToolBar(false) : setShowClientToolBar(true)
    }
  }

  return (
    <Router>
      <div className="container-client-header">
        <img className="button-hamburger" src="https://calendar-trips.s3-us-west-1.amazonaws.com/hamburger_button.png" onClick={toolBarHandler}></img>
        {
          <div id={showClientToolBar ? "nav-client" : "nav-client-hidden"}>
            <ul>
              <li>
                <Link className="link" onClick={toolBarHandler} to="/">gallery</Link>
              </li>
              <li>
                <Link className="link" onClick={toolBarHandler} to="/about">about</Link>
              </li>
              <li>
                <Link className="link" onClick={toolBarHandler} to="/events">events</Link>
              </li>
              <li>
                <Link className="link" onClick={toolBarHandler} to="/murals">murals</Link>
              </li>
              <li>
                <Link className="link" onClick={toolBarHandler} to="/store">store</Link>
              </li>
              <li>
                <Link className="link" onClick={toolBarHandler} to="/contact">contact</Link>
              </li>
            </ul>
          </div>
        }
        <div className="container-main-header">
          <h1>the wild ones</h1>
        </div>
      </div>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
        <Route path="/murals">
          <Murals />
        </Route>
        <Route path="/store">
          <Store />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/admin">
          <Main showAdminToolBar={showAdminToolBar} toolBarHandler={toolBarHandler}/>
        </Route>
        <Route path="/">
          <Gallery />
        </Route>
      </Switch>
    </Router>
  )
}

const Store = () => {
  return (
    <div>test</div>
  )
}

const Contact = () => {
  return (
    <div>test</div>
  )
}

export default Client;