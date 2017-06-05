import React, { Component } from 'react';

import DaySelector from './DaySelector.js';
class SelectDate extends Component {
	render() {
	    return (
	    	<div id="selectdateView">
	    		<h2>Select the day that works for you.</h2>
	    		<div>
		    		<DaySelector chooseDate={this.props.chooseDate} callDate={this.props.callDate}/>
		    		<div className="next-button" id="SelectTime" onClick={this.props.changeView}>></div>
		    	</div>
	    	</div>
	    );
	}	
}
export default SelectDate;