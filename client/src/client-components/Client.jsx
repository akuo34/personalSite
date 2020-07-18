import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Home = React.lazy(() => import('./Gallery'));
const About = React.lazy(() => import('./About'));
const Events = React.lazy(() => import('./Events'));
const Murals = React.lazy(() => import('./Murals'));
const Store = React.lazy(() => import('./Store'));
const Admin = React.lazy(() => import('../admin-components/Main'));
const Checkout = React.lazy(() => import('./Checkout'));

const Client = () => {

  const [showClientToolBar, setShowClientToolBar] = useState(false);
  const [banner, setBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [animation, setAnimation] = useState('hidden');
  const [cart, setCart] = useState([]);

  const toolBarHandler = () => {
    showClientToolBar ? setShowClientToolBar(false) : setShowClientToolBar(true)
  }

  useEffect(() => {
    getCart();
    Axios
      .get('/admin/api/about')
      .then(response => setBanner(response.data[0].bannerFireBaseUrl))
      .catch(err => console.error(err));
  }, [])

  const returnHome = () => {
    window.location = "http://192.168.0.11:3434";
  }

  const getCart = () => {
    Axios
      .get('/admin/api/orders')
      .then(response => {
        setCart(response.data.items);
      })
      .catch(err => console.error(err));
  }

  const modalHandler = (e) => {
    const url = e.target.dataset.url;
    setCurrentUrl(url);

    if (showModal) {
      setShowModal(false);
      setAnimation('fadeout');
      setAnimation('hidden');
      setCurrentUrl(null);
      document.body.style.overflow = "auto";
    } else {
      setShowModal(true);
      setAnimation('active');
      document.body.style.overflow = "hidden";
    }
  }

  const totalCart = () => {
    let sum = 0;
    cart.forEach(item => {
      sum += item.quantity;
    });
    return sum;
  }

  const toCheckout = () => {
    window.location = "http://192.168.0.11:3434/checkout";
  }

  const updateCart = () => {

  }

  return (
    <React.Suspense fallback={<span></span>}>
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
            <div className="container-logo-home">
              <div className="logo-home" onClick={returnHome}></div>
            </div>
            <div className="container-logo">
              <img className="logo" src="https://calendar-trips.s3-us-west-1.amazonaws.com/white_logo.jpg"></img>
            </div>
            <div className='container-h1'>
              <h1>the wild ones</h1>
            </div>
            <div className="container-icons">
              <div style={{"display":"flex"}}>
                {
                  cart && totalCart() > 0 ?
                  <span style={{"alignSelf":"flexStart", "marginRight":"5px", "color":"rgb(204,0,0)", "fontSize":"calc(12px + 0.2vw)", "fontFamily":"typewriter"}}>{totalCart()}</span> : null
                }
                <img 
                  className="button-cart"
                  onClick={toCheckout}
                  src={cart && cart.length ? "https://calendar-trips.s3-us-west-1.amazonaws.com/shopping_cart_red.svg" : "https://calendar-trips.s3-us-west-1.amazonaws.com/shopping_cart_light_grey.svg"}></img>
              </div>
              <img className="button-hamburger" src="https://calendar-trips.s3-us-west-1.amazonaws.com/hamburger_light_grey.svg" onClick={toolBarHandler}></img>
            </div>
          </div>
          <div className={animation === "active" ? "modal-image-zoom zoom-active" : `modal-image-zoom ${animation}`} onClick={modalHandler}>
          </div>
          <div
            className={`container-modal-image ${animation}`}
            onClick={modalHandler}>
            {currentUrl !== null ?
              <img
                className={`modal-image ${animation}`}
                src={currentUrl}
              /> : null
            }
          </div>
        </div>
        <Switch>
          <Route path="/about" render={() => <About />} />
          <Route path="/events" render={() => <Events modalHandler={modalHandler} />} />
          <Route path="/murals" render={() => <Murals modalHandler={modalHandler} />} />
          <Route path="/store" render={() => <Store cart={cart} getCart={getCart}/>} />
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/admin" render={() => <Admin />} />
          <Route path="/checkout" render={() => <Checkout cart={cart} getCart={getCart}/>} />
          <Route exact path="/" render={() => <Home modalHandler={modalHandler} />} />
        </Switch>
      </Router>
    </React.Suspense>
  )
}

const Contact = () => {
  return (
    <div>test</div>
  )
}

export default Client;