import React, { Component } from 'react';
class ContactForm extends Component {
	render() {
		return(
			<div className="contact-form">
				<form>
					<input type="text" name="userName" placeholder="User Name" value={this.props.userName} onChange={this.props.updateForm}/>
					<input type="tel" name="phoneNumber" placeholder="Phone Number" value={this.props.phoneNumber} onChange={this.props.updateForm} maxLength='12'/>
					<textarea name="userNote" placeholder="Add a note to your appointment..." value={this.props.textArea} onChange={this.props.updateForm}></textarea>
				</form>
				<div className="next-button" id="ThankYou" onClick={this.props.changeView}>></div>
			</div>
		)
	}
}
export default ContactForm;