import React, {/*useEffect,*/ useState} from 'react';
import {authService /*,dbService*/} from "myFireBase";
import {useHistory} from "react-router-dom";

function Profile(props) {
  
  const [NewDisplayName, setNewDisplayName] = useState(props.userObj.displayName)
	
	// useEffect(() => {
	// getMyTweets();
	// })
	
  const history = useHistory();
  const onLogOutClick = () => {
	  authService.signOut();
  	  history.push("/");
  }
  
  // const getMyTweets = async () => {
  // const tweets = await dbService
  // .collection("tweets")
  // .where("creatorId", "==", props.userObj.uid)
  // .orderBy("createdAt", "desc")
  // .get();
  // }
	
  const onChange = (e) => {
	  const {
		  target: {value},
	  } = e;
	  setNewDisplayName(value);
  }
  
  const onSubmit = async (e) => {
	  e.preventDefault();
	  if(props.userObj.displayName !== NewDisplayName) {
		  await props.userObj.updateProfile({
			  displayName: NewDisplayName,
		  })
		props.refreshUser();
	  }
  }
  
  return (
    <div className="container">
	  <form onSubmit={onSubmit} className="profileForm">
	  	<input 
	  	    onChange={onChange}
	  	    type="text"
	  	    autofocus
	  	    placeholder="Display Name"
	  	    value={NewDisplayName}
	  	    className="formInput"
	  	/>
	  	<input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
	  </form>
	  <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
}

export default Profile;
