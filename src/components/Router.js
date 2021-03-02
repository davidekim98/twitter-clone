import React from "react";
import {HashRouter as Routers, Route, Switch, Redirect} from "react-router-dom";
import Auth from "routes/Auth.js";
import Home from "routes/Home.js";
import Profile from "routes/Profile.js";
import Navigation from "components/Navigation"

function Router(props) {
	
	return (
		<Routers>
			{props.IsLoggedIn && <Navigation userObj={props.userObj}/>}
			<Switch>
				{props.IsLoggedIn ? 
					<div
						style={{
						  maxWidth: 890,
						  width: "100%",
						  margin: "0 auto",
						  marginTop: 80,
						  display: "flex",
						  justifyContent: "center",
						}}
					  >
						<Route exact path="/">
							<Home userObj={props.userObj}/>
						</Route>
						<Route exact path="/profile">
							<Profile 
								userObj={props.userObj} 
								refreshUser={props.refreshUser}
							/>
						</Route>
						<Redirect from ="*" to ="/" />
					</div>
				:
					<>
						<Route exact path="/">
							<Auth />
						</Route>
						<Redirect from ="*" to ="/" />
					</>
				}
			</Switch>
		</Routers>
	)
}

export default Router