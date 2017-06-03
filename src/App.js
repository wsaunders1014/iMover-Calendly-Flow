import React, { Component } from 'react';
import Home from './components/Home';
import SelectDate from './components/SelectDate';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callType:'video',
      callDate:null,
      callTime:null,
      userName:'Alex Bliotta',
      phoneNumber:'310-266-8686',
      imoverStatus:'Install Pending',
      clientName:'Budget Van Lines',
      view:'Home'
    }
    this.onSelectionClick = this.onSelectionClick.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  onSelectionClick(e){
    this.setState({callType:e.target.id});
  }
  changeView(e){
    this.setState({view:e.target.id});
  }
  render() {
    switch(this.state.view) {
      case 'SelectDate':
        return(
          <SelectDate/>
        )
      default:
        return(
          <Home callType={this.state.callType} client={this.state.clientName} name={this.state.userName} onSelectionClick={this.onSelectionClick} changeView={this.changeView} />
        );
    }
  }
}

export default App;
