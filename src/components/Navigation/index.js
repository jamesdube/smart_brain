import React from 'react';
import { PropTypes as T } from 'prop-types';
import {withRouter} from "react-router-dom";

const Navigation = withRouter((props) =>{
	if(props.fakeAuth.isAuthenticated){
		return(
			<nav style={{display: 'flex', justifyContent:'flex-end'}}>
				<p className="f3 link dim black underline pa3 pointer" onClick={() => {
					props.fakeAuth.signout(() => props.history.push("/"));
					}}>
					Sign Out
				</p>
			</nav>
		)
	}else{
		return(
			<nav style={{display: 'flex', justifyContent:'flex-end'}}>
				<p className="f3 link dim black underline pa3 pointer" onClick={() => props.history.push("/")}>
					Sign In
				</p>

				<p className="f3 link dim black underline pa3 pointer" onClick={() => props.history.push("/Register")}>
					Register
				</p>
			</nav>
		)
	}
})

Navigation.propTypes = {
	fakeAuth: T.shape({
		isAuthenticated: T.bool,
		signout: T.func
	}).isRequired,
	history: T.object
}
Navigation.defaultProps = {
	histrory: {}
}

export default Navigation