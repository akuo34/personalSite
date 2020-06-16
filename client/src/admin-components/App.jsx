import React, { useState, useEffect } from 'react';
import GalleryManager from './GalleryManager';
import MuralManager from './MuralManager';
import AboutManager from './AboutManager';
import EventManager from './EventManager';
import StoreManager from './StoreManager';
import ContactManager from './ContactManager';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = (props) => {

  return (
    <Router>
      <div className="container-page">
        <div id={props.showAdminToolBar ? "nav-admin" : "nav-admin-hidden"}>
          <nav>
            <ul style={{"display":"flex", "flexDirection":"column"}}>
              <li>
                <Link className="link" onClick={props.toolBarHandler} to="/admin/">gallery</Link>
              </li>
              <li>
                <Link className="link" onClick={props.toolBarHandler} to="/admin/about">about</Link>
              </li>
              <li>
                <Link className="link" onClick={props.toolBarHandler} to="/admin/events">events</Link>
              </li>
              <li>
                <Link className="link" onClick={props.toolBarHandler} to="/admin/murals">murals</Link>
              </li>
              <li>
                <Link className="link" onClick={props.toolBarHandler} to="/admin/store">store</Link>
              </li>
              <li>
                <Link className="link" onClick={props.toolBarHandler} to="/admin/contact">contact</Link>
              </li>
              <button style={{"width":"70px", "fontSize":"15px", "alignSelf":"center", "marginTop":"10px"}} onClick={props.clearCookie}>log out</button>
            </ul>
          </nav>
        </div>
        <div className="container-scroll">
          <h2 className="subheader-client">admin console</h2>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/admin/about">
              <AboutManager />
            </Route>
            <Route path="/admin/events">
              <EventManager />
            </Route>
            <Route path="/admin/murals">
              <MuralManager />
            </Route>
            <Route path="/admin/store">
              <StoreManager />
            </Route>
            <Route path="/admin/contact">
              <ContactManager />
            </Route>
            <Route path="/admin/">
              <GalleryManager />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;