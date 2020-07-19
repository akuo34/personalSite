import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Checkout = (props) => {

  const updateCart = (e) => {
    e.preventDefault();

    const quantity = e.target.quantity.value;
    const id = e.target.dataset.id;

    let copyCart = [...props.cart];
    for (let i = 0; i < copyCart.length; i++) {
      let item = copyCart[i];
      if (item.itemId === id) {
        if (quantity > props.stock[item.itemId]) {
          item.quantity = props.stock[item.itemId];
        } else if (parseInt(quantity) === 0) {
          copyCart.splice(i, 1);
          i--;
        } else {
          item.quantity = quantity;
        }
      }
    }

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
                  <label style={{ "width": "120px", "margin": "0 auto 5px auto" }}>{item.title} {item.width && item.height ? item.width + 'X' + item.height : null}</label>
                  <label style={{ "width": "120px", "margin": "0 auto", "textAlign": "right", "verticalAlign": "middle" }}>${item.price.toFixed(2)}</label>
                  <form style={{ "width": "120px", "margin": "0 auto" }} data-id={item.itemId} onSubmit={updateCart}>
                    <div style={{ "width": "120px", "margin": "0 auto", "display": "flex", "justifyContent": "flexStart", "alignItems": "center" }}>
                      <label style={{ "width": "30px", "margin": "0 10px 0 0" }}>Qty: </label>
                      <input
                        data-id={item.itemId}
                        type="number"
                        name="quantity"
                        defaultValue={item.quantity}
                        min="0"
                        max={props.stock[item.itemId]}
                        style={{ "width": "40px", "margin": "0", "fontSize": "16px" }}></input>
                      <div style={{ "margin": "auto 0 auto 10px", "width": "20px" }}>
                        <input
                          type="image"
                          style={{ "width": "20px" }}
                          src="https://calendar-trips.s3-us-west-1.amazonaws.com/update_icon.svg"
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
        <div className="container-image-about">
          <div style={{ "width": "min(90vw, 812px)", "display": "flex", "justifyContent": "flexEnd", "margin":"0 auto" }}>
            <label style={{"margin":"0 0 0 auto"}}>$100.00</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;