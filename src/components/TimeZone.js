import React, { Component } from 'react';
import dropdownIcon from '../img/dropdown-icon.svg';
class TimeZone extends Component {

	constructor(props) {
		super(props);
		var browserTZ = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
		if(browserTZ.indexOf('D')!== -1){ //timezone is daylight savings time.
			this.timezones = [
				{id:0,text:'Eastern Daylight Time'},
				{id:1,text:'Central Daylight Time'},
				{id:2,text:'Pacific Daylight Time'}
			];
		}else{
			this.timezones = [
				{id:0,text:'Eastern Standard Time'},
				{id:1,text:'Central Standard Time'},
				{id:2,text:'Pacific Standard Time'}
			];
		}
		this.toggle=false;
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.chooseTimeZone = this.chooseTimeZone.bind(this);
	}
	render() {
		var tz = [];
		for (let i=0;i<this.timezones.length;i++){
			tz.push(<div key={i} data-value={this.timezones[i].id} onClick={this.chooseTimeZone}>{this.timezones[i].text}</div>);
		}
	    return (
	    	<div className="time-zone-container">
	    		<div id="time-zone" onClick={this.toggleDropdown}>
	    			<span>{this.timezones[this.props.timezone].text} </span>
	    			<span className="icon" style={{background:'url('+dropdownIcon+') no-repeat'}}></span>
	    			<div className="dropdown">
	    				<div className="overflow" style={{top:'-110px'}}>
		    				{tz}
			    		</div>
	    			</div>
	    		</div>
	    			
	    	</div>
	    );
	}
	chooseTimeZone(e){
		e.stopPropagation();
		this.toggleDropdown();
		this.props.setTimeZone(e.target.getAttribute("data-value"));
	}
	toggleDropdown(e) {
		if(!this.toggle){
			this.toggle=true;
			document.getElementById('time-zone').children[2].style.height = '110px';
			document.getElementById('time-zone').children[2].children[0].style.top ='1px';
		}else{
			this.toggle=false;
			setTimeout(()=>{document.getElementById('time-zone').children[2].style.height = '0px';},500);
			document.getElementById('time-zone').children[2].children[0].style.top ='-110px';
		}
	}
}
export default TimeZone;