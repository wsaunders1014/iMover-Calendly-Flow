import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callType:null,
      callDate:null,
      callTime:null,
      name:'Alex Bliotta',
      phoneNumber:'310-266-8686',
      imoverStatus:'Install Pending',
      client:'Budget Van Lines'
    }
  }
  render() {
    return (
      <div className="App">
        <div className="client-header">
          <div className="client-logo"><img src={logo} alt="logo" /></div>
          <span>{this.state.client}</span>
        </div>
        <p className="client-intro">
          Hey <span>{this.state.name.split(' ')[0]}</span>, let's schedule your appointment.
        </p>
        <div className="call-selection-box">
          <div className="selection active">VIDEO CALL</div>
          <div className="selection">PHONE CALL</div>
          <div className="desc">When you schedule a Phone Call with our moving specialist he/she will go over 
               the items you’ll be moving to provide you with an accurate quote.
          </div>
           <div className="next-button" id="select-call">></div>
        </div>

      </div>
    );
  }
}

export default App;
