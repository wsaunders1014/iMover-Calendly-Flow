import React, { Component } from 'react';
class Home extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick(){
		this.props.changeView('SelectDate');
	}
	render() {
	    return (
	    	<div id="homeView">
		        <h2 className="client-intro"> 
		          Hey <span>{(this.props.name) ? this.props.name.split(' ')[0]:''}</span>, let's schedule your appointment.
		        </h2>
		        <div id="call-selection-box">
		        	<div>
		          		<div id="video" className={"selection "+((this.props.callType===1) ? 'active':'')} onClick={this.props.onSelectionClick}>VIDEO CALL</div>
		          		<div id="phone" className={"selection "+((this.props.callType===2) ? 'active':'')} onClick={this.props.onSelectionClick}>PHONE CALL</div>
		          		<div className="desc">When you schedule a Phone Call with our moving specialist he/she will go over 
		               		the items you’ll be moving to provide you with an accurate quote.
		          		</div>
		          	</div>
		            <div className="next-button" id="SelectDate" onClick={this.onClick}>></div>	
		        </div>
	       	</div>
	    );
	  }	
}
export default Home;