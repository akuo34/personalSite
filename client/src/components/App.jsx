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
      <div>
        <div className="container-main-header">
          <div>
            <h1>The Wild Ones</h1>
            <h2>Admin Console</h2>
          </div>
          <nav>
            <ul className="list-main-header">
              <li>
                <Link to="/">Gallery</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/store">Store</Link>
              </li>
              <li>
                <Link to="/murals">Murals</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/store">
            <Store />
          </Route>
          <Route path="/murals">
            <Murals />
          </Route>
          <Route path="/">
            <GalleryManager />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function About() {
  return <h2>About</h2>;
}

function Store() {
  return <h2>Store</h2>;
}

function Murals() {
  return <h2>Murals</h2>;
}

export default App;