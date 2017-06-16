import React, { Component } from 'react';
class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);	}
	onClickHandler(){
		this.props.changeView('ThankYou');
	}
	render() {
		return(
			<div className="contact-form">
				<form>
					<input type="text" name="fullname" placeholder="User Name" value={this.props.fullname} onChange={this.props.updateForm}/>
					<input type="tel" name="phone" placeholder="Phone Number" value={this.props.phone} onChange={this.props.updateForm} maxLength='12'/>
					<textarea name="comment" placeholder="Add a note to your appointment..." value={this.props.textArea} onChange={this.props.updateForm}></textarea>
				</form>
				<div className="submit-btn" onClick={this.onClickHandler}>Schedule Call</div>
			</div>
		)
	}
}
export default ContactForm;