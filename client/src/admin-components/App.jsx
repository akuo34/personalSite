import React from 'react';
const GalleryManager = React.lazy(() => import('./GalleryManager'));
const AboutManager = React.lazy(() => import('./AboutManager'));
const EventManager = React.lazy(() => import('./EventManager'));
const MuralManager = React.lazy(() => import('./MuralManager'));
const StoreManager = React.lazy(() => import('./StoreManager'));
const ContactManager = React.lazy(() => import('./ContactManager'));

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = (props) => {

  return (
    <Router>
      <div>
        <div className="buffer"></div>
        <div className="container-page">
          <div className={props.showAdminToolBar ? "wrapper-nav-client" : "wrapper-nav-client-hidden"} onClick={props.toolBarHandler}>
            <div id={props.showAdminToolBar ? "nav-admin" : "nav-admin-hidden"}>
              <nav>
                <ul style={{ "display": "flex", "flexDirection": "column" }}>
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
                  <button style={{ "width": "70px", "fontSize": "15px", "alignSelf": "center", "marginTop": "10px" }} onClick={props.clearCookie}>log out</button>
                </ul>
              </nav>
            </div>
          </div>
          <div className="container-scroll">
            <h2 className="subheader-client">admin console</h2>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/admin/about" render={() => <AboutManager />} />
              <Route path="/admin/events" render={() => <EventManager />} />
              <Route path="/admin/murals" render={() => <MuralManager />} />
              <Route path="/admin/store" render={() => <StoreManager />} />
              <Route path="/admin/contact" render={() => <ContactManager />} />
              <Route path="/admin/" render={() => <GalleryManager />} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;