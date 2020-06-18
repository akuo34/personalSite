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
  const [banner, setBanner] = useState(null);

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

  useEffect(() => {
    Axios
      .get('/admin/api/about')
      .then(response => setBanner(response.data[0].bannerFireBaseUrl))
      .catch(err => console.error(err));
  }, [banner])

  return (
    <Router>
      <div className="container-client-header">
        <div className={showClientToolBar ? "wrapper-nav-client" : "wrapper-nav-client-hidden"} onClick={toolBarHandler}>
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
        </div>
        <div className="container-main-header">
          <img className="banner" src={banner}></img>
          <a href="http://192.168.0.11:3434">
            <div className="logo-home"></div>
          </a>
          <div className="container-logo">
            <img className="logo" src="https://calendar-trips.s3-us-west-1.amazonaws.com/white_logo.jpg"></img>
          </div>
          <div className='container-h1'>
            <h1>the wild ones</h1>
          </div>
          <div className="container-icons">
            <img className="button-cart" src="https://calendar-trips.s3-us-west-1.amazonaws.com/shopping_cart_colored.svg"></img>
            <img className="button-hamburger" src="https://calendar-trips.s3-us-west-1.amazonaws.com/hamburger_button.png" onClick={toolBarHandler}></img>
          </div>
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
          <Main showAdminToolBar={showAdminToolBar} toolBarHandler={toolBarHandler} />
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