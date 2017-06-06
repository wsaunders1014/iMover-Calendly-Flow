import React, { Component } from 'react';
import arrow from '../img/back-arrow.svg';
class BackBtn extends Component {
	render(){
		return(
			<div className="back-btn" onClick={this.props.goBack} style={{background:'url('+arrow+') 50% no-repeat',display:(this.props.view==='Home'|| this.props.view==='ThankYou') ? 'none':'block'}}></div>
		)
	}
}
export default BackBtn;