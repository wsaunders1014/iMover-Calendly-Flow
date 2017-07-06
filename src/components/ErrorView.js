import React, { Component } from 'react';
class ErrorView extends Component {
	render(){
		return(
			<div id="errorView">
				<h2>Something has gone wrong. </h2>
				Please contact Budget Vanlines at <a href="tel:8006116001">(800) 611-6001</a>
			</div>
		)
	}
}
export default ErrorView;