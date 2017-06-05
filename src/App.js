import React, { Component } from 'react';
import Home from './components/Home';
import SelectDate from './components/SelectDate';
import SelectTime from './components/SelectTime';
import InfoBar from './components/InfoBar.js';
import logo from './img/logo.svg';
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
    this.viewSwitch = this.viewSwitch.bind(this);
    this.chooseDate = this.chooseDate.bind(this);
  }
  onSelectionClick(e){
    this.setState({callType:e.target.id});
  }
  chooseDate(e){
    this.setState({callDate:e.currentTarget.children[1].innerHTML})
  }
  changeView(e){
    if(e.target.id ==='SelectTime'){
      if(this.state.callDate)
        this.setState({view:e.target.id});
    }else
      this.setState({view:e.target.id});
  }
  render() {
    return(
      <div className="App">
        <div className="client-header">
          <div className="client-logo"><img src={logo} alt="logo" /></div>
          <span>{this.state.clientName}</span>
        </div>
        <InfoBar view={this.state.view} callType={this.state.callType} callDate={this.state.callDate} callTime={this.state.callTime} />
       {this.viewSwitch()}
      </div>
    )
    
  }
  viewSwitch(){
    switch(this.state.view) {
      case 'SelectDate':
        return (<SelectDate callType={this.state.callType} callDate={this.state.callDate} callTime={this.state.callTime} chooseDate={this.chooseDate} changeView={this.changeView}/>)
      case 'SelectTime':
        return(<SelectTime />);
      default:
        return (<Home callType={this.state.callType} client={this.state.clientName} name={this.state.userName} onSelectionClick={this.onSelectionClick} changeView={this.changeView} />)
    }
  }
}

export default App;
