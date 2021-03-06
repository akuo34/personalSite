import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const LogIn = (props) => {

  return (
    <div className="form-gallery">
      <h4 className="text-gallery-form-header">Sign in</h4>
      <form id="form-login" onSubmit={props.signInHandler}>
        {/* <div> */}
          <input
            className="input-landing"
            // type="email" 
            name="userEmail"
            placeholder="E.g: johnDorian123@gmail.com"
            id="userEmail"
          />
        {/* </div> */}
        {/* <div> */}
          <input
            className="input-landing"
            type="password"
            name="userPassword"
            placeholder="Your password"
            id="userPassword"
          />
        {/* </div> */}
        <div className="container-landing-button">
          <Link className="link-landing" to="/admin/passwordReset">Forgot your password?</Link>
          <button className="button-gallery-post" type="submit">Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn;