import React, { Component } from 'react';
class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.formatPhone = this.formatPhone.bind(this);
		this.formattedPhone = this.formatPhone();
	}
	onClickHandler(){
		this.props.changeView('ThankYou');
	}
	formatPhone(){
		var number = this.props.phoneNumber
		number = number.replace(/(\d{3})(\d{3})(\d{4})/g,'$1-$2-$3');
		return number;
	}
	render() {
		
		return(
			<div className="contact-form">
				<form>
					<input type="text" name="userName" placeholder="User Name" value={this.props.userName} onChange={this.props.updateForm}/>
					<input type="tel" name="phoneNumber" placeholder="Phone Number" value={this.formattedPhone} onChange={this.props.updateForm} maxLength='12'/>
					<textarea name="userNote" placeholder="Add a note to your appointment..." value={this.props.textArea} onChange={this.props.updateForm}></textarea>
				</form>
				<div className="next-button" id="ThankYou" onClick={this.onClickHandler}>></div>
			</div>
		)
	}
}
export default ContactForm;