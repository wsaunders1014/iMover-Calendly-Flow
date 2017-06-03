import React, { Component } from 'react';
import logo from '../img/logo.svg';
class Home extends Component {
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
	        <p className="client-intro"> 
	          Hey <span>{this.props.name.split(' ')[0]}</span>, let's schedule your appointment.
	        </p>
	        <div id="call-selection-box">
	          <div id="video" className={"selection "+((this.props.callType==='video') ? 'active':'')} onClick={this.props.onSelectionClick}>VIDEO CALL</div>
	          <div id="phone" className={"selection "+((this.props.callType==='phone') ? 'active':'')} onClick={this.props.onSelectionClick}>PHONE CALL</div>
	          <div className="desc">When you schedule a Phone Call with our moving specialist he/she will go over 
	               the items you’ll be moving to provide you with an accurate quote.
	          </div>
	           <div className="next-button" id="SelectDate" onClick={this.props.changeView}>></div>
	        </div>

	      </div>
	    );
	  }	
}
export default Home;