import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {authService, firebaseInstance} from 'myFireBase';
import AuthForm from "components/AuthForm.js";

function Auth() {
  
  const onSocialClick = async (e) => {
	  const {
		  target:{name},
	  } = e;
	  let provider;
	  if(name === "google") {
		  provider = new firebaseInstance.auth.GoogleAuthProvider()
	  }
	  
	  await authService.signInWithPopup(provider);
  }
	
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />	
	    </button>
      </div>
    </div>
  );
}

export default Auth;
