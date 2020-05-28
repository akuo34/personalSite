import React, { useState, useEffect } from 'react';
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

  const [showToolBar, setShowToolBar] = useState(false);

  const toolBarHandler = () => {
    showToolBar ? setShowToolBar(false) : setShowToolBar(true)
  }

  return (
    <Router>
      <img className="button-hamburger" src="https://calendar-trips.s3-us-west-1.amazonaws.com/hamburger_button.png" onClick={toolBarHandler}></img>
      {
        <div id={ showToolBar ? "nav-client" : "nav-client-hidden" }>
          <ul>
            <li>
              <Link className="link" to="/">gallery</Link>
            </li>
            <li>
              <Link className="link" to="/about">about</Link>
            </li>
            <li>
              <Link className="link" to="/events">events</Link>
            </li>
            <li>
              <Link className="link" to="/murals">murals</Link>
            </li>
            <li>
              <Link className="link" to="/store">store</Link>
            </li>
            <li>
              <Link className="link" to="/contact">contact</Link>
            </li>
          </ul>
        </div>
      }

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
          <Main />
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