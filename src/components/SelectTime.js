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
		for(var i =8;i <12;i++){
			var a = i+'AM';
			var b = i+':30AM';
			var one = a+' - '+i+':30AM';
			var two = b+' - '+(i+1)+'AM';
			amTimes.push(
				<div key={i} className="row"><div data-time={a} onClick={this.props.chooseTime} className={'time-slot'+((this.props.timeslot===a) ? ' selected':'')}>{one}</div><div data-time={b} onClick={this.props.chooseTime} className={'time-slot'+((this.props.timeslot===b) ? ' selected':'')}>{two}</div></div>
			)
		}
		var pmTimes = [];
		for(var z =12;z < 16;z++){
			var x;
			if(z > 12)
				x = z-12;
			else
				x=z;
			a = x+'PM';
			b = x+':30PM';
			one = a+' - '+x+':30PM';
			two = b+' - '+(x+1)+'PM';
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