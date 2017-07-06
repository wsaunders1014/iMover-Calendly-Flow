import React, { Component } from 'react';
import checkmark from '../img/check_mark.svg';
class InfoBar extends Component {
	render(){
		if(this.props.view ==='SelectTime' || this.props.view === 'SelectDate' || this.props.view==='ContactInfo'){
			return (
				<div id="info-bar">
					{(this.props.type===1) ? 'Video Call':'Phone Call'}
					{(this.props.schedule_date) ? ' / '+this.props.schedule_date:''}
					{(this.props.timeslot) ? ' / '+this.props.timeslot:''}
				</div>
			)
		}else if(this.props.view ==='ThankYou'){
			return (
				<div className="thanks-msg"><span className="checkmark"><img src={checkmark} alt="checkmark"/></span> THANK YOU, YOU'RE ALL SET!</div>
			)
		}else{
			return(null);
		}
	}
}
export default InfoBar;