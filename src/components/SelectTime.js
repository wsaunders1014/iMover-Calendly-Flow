import React, { Component } from 'react';
import TimeZone from './TimeZone';
import morning from '../img/morning.svg';
import afternoon from '../img/afternoon.svg';
class SelectTime extends Component {
	render() {
		var amTimes = [];
		for(var i =8;i <12;i++){
			amTimes.push(
				<div key={i} className="row"><div className='time-slot'>{i}AM - {i}:30AM</div><div className='time-slot'>{i}:30AM - {i+1}AM</div></div>
			)
		}
		var pmTimes = [];
		for(var z =12;z < 16;z++){
			var x;
			if(z > 12)
				x = z-12;
			else
				x=z;
			pmTimes.push(
				<div key={x} className="row"><div className='time-slot'>{x}PM - {x}:30PM</div><div className='time-slot'>{x}:30PM - {x+1}PM</div></div>
			)
		}
	    return (
	    	<div id="selecttimeView">
	    		<h2>What time works for you?</h2>
	    		<TimeZone />
	    		<div className="times-holder">
		    		<div id="am" className="times">
		    			<div className="time-logo"><img src={morning} alt="AM" /></div>
		    			{amTimes}
		    		</div>
		    		<div id="pm" className="times">
		    			<div className="time-logo"><img src={afternoon} alt="PM" /></div>
		    			{pmTimes}
		    		</div>
		    		<div className="next-button" id="ContactInfo" onClick={this.props.changeView}>></div>
		    	</div>
	    	</div>
	    );
	}	
}
export default SelectTime;