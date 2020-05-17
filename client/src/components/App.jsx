import React from 'react';
import GalleryManager from './GalleryManager';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {

  return (
    <Router>
      <div className="container-page">
        <div className="container-nav">
          <nav>
            <ul className="list-main-header">
              <li>
                <Link className="link" to="/">Gallery</Link>
              </li>
              <li>
                <Link className="link" to="/about">About</Link>
              </li>
              <li>
                <Link className="link" to="/events">Events</Link>
              </li>
              <li>
                <Link className="link" to="/murals">Murals</Link>
              </li>
              <li>
                <Link className="link" to="/store">Store</Link>
              </li>
              <li>
                <Link className="link" to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container-scroll">
          <div className="container-main-header">
            <div>
              <h1>The Wild Ones</h1>
              <h2>Admin Console</h2>
            </div>
            {/* <div className="container-nav">
            <nav>
              <ul className="list-main-header">
                <li>
                  <Link className="link" to="/">Gallery</Link>
                </li>
                <li>
                  <Link className="link" to="/about">About</Link>
                </li>
                <li>
                  <Link className="link" to="/events">Events</Link>
                </li>
                <li>
                  <Link className="link" to="/murals">Murals</Link>
                </li>
                <li>
                  <Link className="link" to="/store">Store</Link>
                </li>
                <li>
                  <Link className="link" to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div> */}
          </div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <AboutManager />
            </Route>
            <Route path="/events">
              <EventsManager />
            </Route>
            <Route path="/murals">
              <MuralsManager />
            </Route>
            <Route path="/store">
              <StoreManager />
            </Route>
            <Route path="/contact">
              <ContactManager />
            </Route>
            <Route path="/">
              <GalleryManager />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

function AboutManager() {
  return <h3>About</h3>;
}

function StoreManager() {
  return <h3>Store</h3>;
}

function MuralsManager() {
  return <h3>Murals</h3>;
}

function EventsManager() {
  return <h3>Events</h3>
}

function ContactManager() {
  return <h3>Contact</h3>
}

export default App;