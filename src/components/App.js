import React, {useState, useEffect} from 'react';
import Router from "components/Router";
import {authService} from "myFireBase";

function App() {
  const [Init, setInit] = useState(false);
  const [UserObj, setUserObj] = useState(null);
	
  useEffect(() => {
	  authService.onAuthStateChanged((user)=> {
		  if(user) {
			  console.log(user)
			  setUserObj({
				  displayName: user.displayName,
				  uid: user.uid,
				  updateProfile: (args) => user.updateProfile(args)
			  })
		  } else {
			  setUserObj(null);
		  }
		  setInit(true)
	  })
  }, [])
	
  const refreshUser = () => {
	  const user = authService.currentUser
	  setUserObj({
				  displayName: user.displayName,
				  uid: user.uid,
				  updateProfile: (args) => user.updateProfile(args)
			  })
  }

  return (
	<>
	  {Init ? <Router
				  refreshUser={refreshUser}
				  IsLoggedIn={Boolean(UserObj)}
				  userObj={UserObj}
			  /> 
	   : 
	   "Initializing"}
	    <footer>
	        &copy; TwitterClone {new Date().getFullYear()}
	    </footer>
	</>
  )
}

export default App;
