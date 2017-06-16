import React, { Component } from 'react';
class ThankYou extends Component {
	constructor(props) {
		super(props);
		this.formatPhone = this.formatPhone.bind(this);
	}
	render() {
		return(
			<div id="thanksView" className="view">
				<h2>Your custom iMover app link has been sent to your phone.</h2>
				<div className="thanks-box clear">
					<div className="square">
						<div className="title">CALL TYPE</div>
						<div className='desc'>{this.formatCallType()}</div>
					</div>
					<div className="square">
						<div className="title">CALL DATE</div>
						<div className='desc'>{this.formatDate()}</div>
					</div>
					<div className="square">
						<div className="title">CALL TIME</div>
						<div className='desc'>{this.props.userInfo.timeslot+' '+this.formatTimeZone()}</div>
					</div>
					<div className="square">
						<div className="title">NAME</div>
						<div className='desc'>{this.props.userInfo.fullname}</div>
					</div>
					<div className="square">
						<div className="title">PHONE</div>
						<div className='desc'>{this.formatPhone()}</div>
					</div>
					<div className="square">
						<div className="title">IMOVER STATUS</div>
						<div className='desc'>Install Pending</div>
					</div>
				</div>
				<h2 className="footer">Your Scheduled Call will take place on <span>{this.formatDate()}</span> on the <span><a href="http://imover.com">iMover App.</a></span></h2>
				{(this.props.prevView ==='Home') ? <h3 className="subfooter">Are you busy on <span>{this.formatDate()}?</span>
				<br/><span className="links" onClick={()=>{this.props.changeView('SelectDate')}}>Reschedule</span> or <span className="links" onClick={()=>{this.props.cancelAppt()}}>Cancel your appointment</span> now.</h3>:''}
			</div>
		)
	}
	 //formatting functions
	formatPhone(){
		return String(this.props.userInfo.phone).replace(/(\d{3})(\d{3})(\d{4})/g,'$1-$2-$3');
	}
	formatDate(){
		if(this.props.userInfo.scheduled_date !== null){
			var date = new Date(this.props.userInfo.schedule_date.split('T')[0]);
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			var day=date.getDate();
			
			return months[date.getMonth()]+' '+day;
		}else
			return null;
	}
	getOrdinal(n) {
	    var s=["TH","ST","ND","RD"],
	    v=n%100;
	    return (s[(v-20)%10]||s[v]||s[0]);
 	}
	formatCallType(){
		return (this.props.userInfo.type===1) ? 'Video Call':'Phone Call'; 
	}
	formatTimeZone(){
		switch(this.props.userInfo.timezone) {
		  case 1:
		    return 'EST';
		  case 2:
		    return 'CST';
		  case 3:
		    return 'PST';
		  default:
		    break;
		}
	}
}
export default ThankYou;