import React, { Component } from 'react';
class InfoBar extends Component {
	render(){
		if(this.props.view !=='Home'){
			return (
				<div id="info-bar">
					{this.props.callType +' Call'}
					{(this.props.callDate) ? ' / '+this.props.callDate:''}
					{(this.props.callTime) ? ' / '+this.props.callTime:''}
				</div>
			)
		}else
		return(
			null
		);
	}
}
export default InfoBar;