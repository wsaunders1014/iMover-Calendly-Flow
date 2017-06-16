import React, { Component } from 'react';
import ContactForm from './ContactForm';
class ContactInfo extends Component {
	render() {
		return(
			<div id="contactView" className="view">
				<h2>Where can we reach you?</h2>
				<ContactForm {...this.props} />		
			</div>
		)
	}
}
export default ContactInfo;