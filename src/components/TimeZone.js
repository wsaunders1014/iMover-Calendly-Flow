import React, { Component } from 'react';
import dropdownIcon from '../img/dropdown-icon.svg';
class TimeZone extends Component {

	constructor(props) {
		super(props);
		this.timezones = {
			'null':'- Select Time Zone -',
			'EST':'Eastern Standard Time',
			'CST':'Central Standard Time',
			'MST':'Mountain Standard Time',
			'PST':'Pacific Standard Time'
		}
		this.toggle=false;
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.chooseTimeZone = this.chooseTimeZone.bind(this);
	}
	render() {
		var tz = [];
		for (let t in this.timezones){
			tz.push(<div key={t} value={t} onClick={this.chooseTimeZone}>{this.timezones[t]}</div>);
		}
	    return (
	    	<div className="time-zone-container">
	    		<div id="time-zone" onClick={this.toggleDropdown}>
	    			<span>- Select Time Zone - </span>
	    			<span className="icon" style={{background:'url('+dropdownIcon+') no-repeat'}}></span>
	    			<div className="dropdown">
	    				<div className="overflow" style={{top:'-180px'}}>
		    				{tz}
			    		</div>
	    			</div>
	    		</div>
	    			
	    	</div>
	    );
	}
	chooseTimeZone(e){
		e.stopPropagation();
		document.getElementById('time-zone').children[0].innerHTML = this.timezones[e.target.getAttribute("value")];
		this.toggleDropdown();
		this.props.setTimeZone(e.target.getAttribute("value"));
	}
	toggleDropdown(e) {

		if(!this.toggle){
			this.toggle=true;
			document.getElementById('time-zone').children[2].style.height = '180px';
			document.getElementById('time-zone').children[2].children[0].style.top ='0px';
		}else{
			this.toggle=false;
			document.getElementById('time-zone').children[2].style.height = '0px';
			document.getElementById('time-zone').children[2].children[0].style.top ='-180px';
		}
	}
}
export default TimeZone;