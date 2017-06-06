import React, { Component } from 'react';
class ThankYou extends Component {
	render() {
		return(
			<div className="thanksView">
				<h2>Your custom iMover app link has been sent to your phone.</h2>
				<div className="thanks-box clear">
					<div className="square">
						<div className="title">CALL TYPE</div>
						<div className='desc'>{this.props.userInfo.callType} Call</div>
					</div>
					<div className="square">
						<div className="title">CALL DATE</div>
						<div className='desc'>{this.props.userInfo.callDate}</div>
					</div>
					<div className="square">
						<div className="title">CALL TIME</div>
						<div className='desc'>{this.props.userInfo.callTime}</div>
					</div>
					<div className="square">
						<div className="title">NAME</div>
						<div className='desc'>{this.props.userInfo.userName}</div>
					</div>
					<div className="square">
						<div className="title">PHONE</div>
						<div className='desc'>{this.props.userInfo.phoneNumber}</div>
					</div>
					<div className="square">
						<div className="title">IMOVER STATUS</div>
						<div className='desc'>{this.props.userInfo.imoverStatus}</div>
					</div>
				</div>
				<h2 className="footer">Your Scheduled Call will take place on <span>{this.props.userInfo.callDate}</span> on the <span><a href="http://imover.com">iMover App.</a></span></h2>
			</div>
		)
	}
}
export default ThankYou;