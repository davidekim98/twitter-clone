import React, { useState, useEffect } from "react";
import {dbService} from "myFireBase";
import Twit from "components/Twit.js"
import TweetFactory from "components/TweetFactory.js"

function Home(props) {
  const [Tweets, setTweets] = useState([]);
	
  useEffect(() => {
	  dbService.collection("tweets").onSnapshot(snapshot => {
		  const tweetArray = snapshot.docs.map(doc => ({
			  id: doc.id,
			  ...doc.data(),
		  }))
		  setTweets(tweetArray);
	  })
  }, [])
	
  return (
    <div className="container">
	  <TweetFactory userObj={props.userObj} />
	  <div style={{marginTop: 30}}>
		{Tweets && Tweets.map(tweet => (
		  <Twit key={tweet.id}
			tweetObj={tweet}
			isOwner={tweet.creatorId === props.userObj.uid}
		  />  
		 ))}
	  </div>
    </div>
  );
};

export default Home;
