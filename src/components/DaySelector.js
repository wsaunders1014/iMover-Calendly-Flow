import React, { Component } from 'react';
class DaySelector extends Component {
	constructor(props) {
		super(props);
		this.daysArray = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
		this.monthsArray = ['Jan','Feb','Mar','April','May','June','July','August','Sept','Oct','Nov','Dec'];
		this.cycleDates = this.cycleDates.bind(this);
	}
	render(){
		var datesArray = [];
  		for(let i = 0; i < 14; i ++) {
  			var x = new Date();
  			x = x.setDate(x.getDate() + i);
  			datesArray.push(new Date(x));
  		}
		return (
			<div className='date-selector'>
				<div className="overflow left" ref={(overflow)=> {this.overflow = overflow}}>
				{datesArray.map((x,y)=>{
		  			 var date = x;
		  			 var dateArray = [this.monthsArray[date.getMonth()], date.getDate(), date.getFullYear()];
		  			return(

			  			<div className={"date-box "+((this.props.schedule_date===dateArray[0]+' '+dateArray[1]) ? 'active':'')} key={date.getDate()} onClick={this.props.chooseDate}>
							<div className="day-name">{this.daysArray[date.getDay()]}</div>
							<div className="date">{dateArray[0]+' '+dateArray[1]}</div>
							{(y===0) && <span className="today">TODAY</span>}
						</div>
					);
		  		})}
		  		</div>
		  		<div id="cycleDates" className="left" onClick={this.cycleDates}>SHOW NEXT 7 DAYS</div>
			</div>
	    );
  	}
  	cycleDates(e){
  		if(e.currentTarget.className === 'left'){
  			e.currentTarget.className = 'right';
  			this.overflow.className = 'overflow right';
  			e.currentTarget.innerHTML = "SHOW PREVIOUS 7 DAYS";
  		}else{
  			e.currentTarget.className = 'left';
  			this.overflow.className = 'overflow left';
  			e.currentTarget.innerHTML = "SHOW NEXT 7 DAYS";
  		}
  	}
}
export default DaySelector;