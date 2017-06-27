import React, { Component } from 'react';
class DaySelector extends Component {
	constructor(props) {
		super(props);
		this.daysArray = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
		this.monthsArray = ['Jan','Feb','Mar','April','May','June','July','August','Sept','Oct','Nov','Dec'];
		this.state = {
			buttonMsg:(this.props.sliderPos ==='left') ? 'SHOW NEXT 7 DAYS':'SHOW PREVIOUS 7 DAYS'
		}
		this.onClickHandler = this.onClickHandler.bind(this);
	}
	onClickHandler(){
		this.props.cycleDates();
		if(this.props.sliderPos==='right')
			this.setState({buttonMsg:'SHOW NEXT 7 DAYS'});
		else
			this.setState({buttonMsg:'SHOW PREVIOUS 7 DAYS'});
	}
	render(){
		var datesArray = [];
  		for(let i = 0; i < 14; i ++) {
  			var x = new Date();
  			x = x.setDate(x.getDate() + i);
  			datesArray.push(new Date(x));
  		}
		return (
			<div className='date-selector clear'>
				<div className={"overflow clear "+this.props.sliderPos}>
					<div className="slide">
						{datesArray.map((x,y)=>{
				  			var date = x;
				  			var dateArray = [this.monthsArray[date.getMonth()], date.getDate(), date.getFullYear()];
				  			if(y <7){
					  			return(
						  			<div className={"date-box "+((this.props.schedule_date===dateArray[0]+' '+dateArray[1]) ? 'active':'')} key={y} onClick={this.props.chooseDate}>
										<div className="day-name">{this.daysArray[date.getDay()]}</div>
										<div className="date">{dateArray[0]+' '+dateArray[1]}</div>
										{(y===0) && <span className="today">TODAY</span>}
									</div>
								);
					  		}else{
					  			return null;
					  		}
				  		})}
				  	</div>
				  	<div className="slide">
						{datesArray.map((x,y)=>{
				  			var date = x;
				  			var dateArray = [this.monthsArray[date.getMonth()], date.getDate(), date.getFullYear()];
				  			if(y >6){
					  			return(
						  			<div className={"date-box "+((this.props.schedule_date===dateArray[0]+' '+dateArray[1]) ? 'active':'')} key={y} onClick={this.props.chooseDate}>
										<div className="day-name">{this.daysArray[date.getDay()]}</div>
										<div className="date">{dateArray[0]+' '+dateArray[1]}</div>
										{(y===0) && <span className="today">TODAY</span>}
									</div>
								);
					  		}else{
					  			return null;
					  		}
				  		})}
				  	</div>
		  		</div>
		  		<div id="cycleDates" className={this.props.sliderPos} onClick={this.onClickHandler}>{this.state.buttonMsg}</div>
			</div>
	    );
  	}
}
export default DaySelector;