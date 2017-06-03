import React, { Component } from 'react';
import logo from '../img/logo.svg';
class SelectDate extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}
	render() {
	    return (
	      <div className="App">
	        <div className="client-header">
	          <div className="client-logo"><img src={logo} alt="logo" /></div>
	          <span>{this.props.client}</span>
	        </div>
	      </div>
	    );
	  }	
}
export default SelectDate;