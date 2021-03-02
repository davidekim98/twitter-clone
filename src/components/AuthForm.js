import React, {useState} from 'react';
import {authService} from 'myFireBase';

function AuthForm() {
	
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [DisplayName, setDisplayName] = useState("")
  const [NewAccount, setNewAccount] = useState(false)
  const [Error, setError] = useState("")
  
  const onChange = (e) => {
	  const {
		  target: {name, value},
	  } = e;
	  if(name === "email") {
		  setEmail(value);
	  } else if (name === "password") {
		  setPassword(value);
	  } else if (name === "displayName") {
		  setDisplayName(value);
	  }
  }
  
  const onSubmit = async (e) => {
	  e.preventDefault();
	  try{
		if(NewAccount) {
			await authService.createUserWithEmailAndPassword(
				Email, Password
			)
			await authService.currentUser.updateProfile({displayName: DisplayName});
		} else {
			await authService.signInWithEmailAndPassword(
				Email, Password
			)
		}
	  } catch(err) {
		setError(err.message)
	  }
	  
  }
  
  const toggleAccount = () => setNewAccount((prev) => !prev);
  
	
  return (
    <div>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={Email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={Password}
          onChange={onChange}
          className="authInput"
        />
		{NewAccount && 
			<>
				<input
				  name="displayName"
				  type="text"
				  placeholder="Display Name"
				  required
				  value={DisplayName}
				  onChange={onChange}
				  className="authInput"
				/>
			</>
		}
        <input type="submit" className="authInput authSubmit" value={NewAccount ? "Create Account" : "Login"} />
		{Error && <span className="authError">{Error}</span>}
      </form>
	  <span onClick={toggleAccount} className="authSwitch">{NewAccount ? "Login" : "Create Account"}</span>
    </div>
  );
}

export default AuthForm;
