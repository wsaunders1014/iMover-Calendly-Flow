import React, { Component } from 'react';
import checkmark from '../img/check_mark.svg';
class InfoBar extends Component {
	render(){
		if(this.props.view ==='Home'){
			return(null);
		}else if(this.props.view ==='ThankYou'){
			return (
				<div className="thanks-msg"><span className="checkmark"><img src={checkmark} alt="checkmark"/></span> THANK YOU, YOU'RE ALL SET!</div>
			)
		}else{
			return (
				<div id="info-bar">
					{(this.props.callType===1) ? 'Video Call':'Phone Call'}
					{(this.props.callDate) ? ' / '+this.props.callDate:''}
					{(this.props.callTime) ? ' / '+this.props.callTime:''}
				</div>
			)
		}
	}
}
export default InfoBar;