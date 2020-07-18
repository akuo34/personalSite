import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Checkout = (props) => {

  const [items, setItems] = useState([]);
  const [stock, setStock] = useState({});

  useEffect(() => {
    Axios
      .get('/admin/api/store')
      .then(response => {
        setItems(response.data);
      })
      .catch(err => console.error(err));

  }, []);

  useEffect(() => {
    let copy = {};
    items.forEach(item => {
      copy[item._id] = item.quantity;
    })
    setStock(copy);
    console.log(stock);
  }, [items]);

  const updateCart = (e) => {
    e.preventDefault();

    const quantity = e.target.quantity.value;
    const id = e.target.dataset.id;

    let copyCart = [...props.cart];
    copyCart.forEach(item => {
      if (item._id === id) {
        if (quantity > stock[item._id]) {
          item.quantity = stock[item._id];
        } else {
          item.quantity = quantity;
        }
      }
    })

    Axios
      .put('/admin/api/orders', { items: copyCart })
      .then(() => {
        props.getCart();
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div className="buffer"></div>
      <div className="container-gallery-page">
        <h2 className="subheader-client">shopping cart</h2>
        {props.cart && props.cart.length ?
          props.cart.map(item => {
            return (
              <div className="container-image-about" style={{ "marginBottom": "40px" }}>
                <div className="container-image-grid-cart">
                  <img className="image-grid" src={item.fireBaseUrl}></img>
                </div>
                <div style={{ "width": "min(90vw, 572px)", "margin": "0", "display": "flex", "alignItems": "center", "justifyContent": "spaceEvenly", "flexWrap": "wrap" }}>
                  <label style={{ "width": "120px", "margin": "0 auto" }}>{item.title} {item.width && item.height ? item.width + 'X' + item.height : null}</label>
                  <label style={{ "width": "120px", "margin": "0 auto", "textAlign": "right", "verticalAlign": "middle" }}>${item.price.toFixed(2)}</label>
                  <form style={{ "width": "120px", "margin": "0 auto"}} data-id={item._id} onSubmit={updateCart}>
                    <div style={{ "width": "120px", "margin": "0 auto", "display": "flex", "justifyContent": "flexStart", "alignItems": "center" }}>
                      <label style={{ "width": "30px", "margin": "0 10px 0 0" }}>Qty: </label>
                      <input type="number" name="quantity" placeholder={item.quantity} style={{ "width": "40px", "margin": "0", "fontSize": "16px" }}></input>
                      <div style={{ "margin": "auto 0 auto 10px", "width": "20px" }}>
                        <input
                          type="image"
                          style={{ "width": "20px" }}
                          src="https://calendar-trips.s3-us-west-1.amazonaws.com/update_icon.svg"
                          alt="Submit"
                        ></input>
                      </div>
                    </div>
                  </form>
                  <label style={{ "width": "120px", "margin": "0 auto", "textAlign": "right" }}>${(item.price * item.quantity).toFixed(2)}</label>
                </div>
              </div>
            )
          }) : <h3>no items in cart</h3>
        }
      </div>
    </div>
  )
}

export default Checkout;