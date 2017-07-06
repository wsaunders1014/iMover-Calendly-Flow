import React, { Component } from 'react';
import TimeZone from './TimeZone';
import morning from '../img/morning.svg';
import afternoon from '../img/afternoon.svg';
class SelectTime extends Component {
	constructor(props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
	}
	onClickHandler(){
		this.props.changeView('ContactInfo')
	}
	render() {
		var amTimes = [];
		console.log(this.props.timezone)
		for(var i = 7+this.props.timezone;i < 12+this.props.timezone; i++){
			let amPM = (i >= 12) ? 'PM':'AM';
			let x = i;
			if(i >= 12)
				x = i-12;
			if(x===0)
				x=12;
			var a = x+amPM;
			var b = x+':30'+amPM;
			var one = a+' - '+x+':30'+amPM;
			let nextHour = (i+1 >= 12) ? 'PM':'AM'; 

			var two = b+' - '+(x+1)+nextHour;
			amTimes.push(
				<div key={x} className="row"><div data-time={a} onClick={this.props.chooseTime} className={'time-slot'+((this.props.timeslot===a) ? ' selected':'')}>{one}</div><div data-time={b} onClick={this.props.chooseTime} className={'time-slot'+((this.props.timeslot===b) ? ' selected':'')}>{two}</div></div>
			)
		}
		var pmTimes = [];
		for(var z =12+this.props.timezone;z < 17+this.props.timezone;z++){
			let x = z;
			if(z > 12)
				x = z-12;
			a = x+'PM';
			b = x+':30PM';
			one = a+' - '+x+':30PM';
			two = b+' - '+((z-12)+1)+'PM';
			pmTimes.push(
				<div key={x} className="row"><div data-time={a} onClick={this.props.chooseTime} className={'time-slot'+((this.props.timeslot===a) ? ' selected':'')}>{one}</div><div data-time={b} onClick={this.props.chooseTime} className={'time-slot'+((this.props.timeslot===b) ? ' selected':'')}>{two}</div></div>
			)
		}
	    return (
	    	<div id="selecttimeView" className="view">
	    		<h2>What time works for you?</h2>
	    		<TimeZone setTimeZone={this.props.setTimeZone} timezone={this.props.timezone} />
	    		<div className="times-holder">
		    		<div id="am" className="times">
		    			<div className="time-logo"><img src={morning} alt="AM" /></div>
		    			{amTimes}
		    		</div>
		    		<div id="pm" className="times">
		    			<div className="time-logo"><img src={afternoon} alt="PM" /></div>
		    			{pmTimes}
		    		</div>
		    	</div>
	    	</div>
	    );
	}	
}
export default SelectTime;