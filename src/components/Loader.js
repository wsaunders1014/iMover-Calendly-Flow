import React, { Component } from 'react';
import loader from '../img/loading.gif'
class Loader extends Component {
	render(){
		return(
			<div id="loader"><img src={loader} alt="Loading spinner"/><br/>Loading...</div>
		)
	}
}
export default Loader;