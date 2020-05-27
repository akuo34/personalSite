import React from 'react';
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
        <div className="container-nav">
          <nav>
            <ul className="list-main-header">
              <li>
                <Link className="link" to="/admin/">Gallery</Link>
              </li>
              <li>
                <Link className="link" to="/admin/about">About</Link>
              </li>
              <li>
                <Link className="link" to="/admin/events">Events</Link>
              </li>
              <li>
                <Link className="link" to="/admin/murals">Murals</Link>
              </li>
              <li>
                <Link className="link" to="/admin/store">Store</Link>
              </li>
              <li>
                <Link className="link" to="/admin/contact">Contact</Link>
              </li>
              <button onClick={props.clearCookie}>Log Out</button>
            </ul>
          </nav>
        </div>
        <div className="container-scroll">
          <div className="container-main-header">
            <div>
              <h1>The Wild Ones</h1>
              <h2>Admin Console</h2>
            </div>
          </div>

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