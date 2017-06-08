import React, { Component } from 'react';
import Home from './components/Home';
import SelectDate from './components/SelectDate';
import SelectTime from './components/SelectTime';
import ContactInfo from './components/ContactInfo';
import InfoBar from './components/InfoBar';
import ThankYou from './components/ThankYou';
import BackBtn from './components/BackBtn'
import logo from './img/bvl-logo.svg';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callType:1,
      callDate:null,
      callTime:null,
      callTimeZone:null,
      userName:'',
      phoneNumber:'',
      userNote:'',
      imoverStatus:'Install Pending',
      clientName:'Budget Van Lines',
      view:'Home',
      error:'',
      token:null,
      sessionID:null
    }
   
    this.onSelectionClick = this.onSelectionClick.bind(this);
    this.changeView = this.changeView.bind(this);
    this.viewSwitch = this.viewSwitch.bind(this);
    this.chooseDate = this.chooseDate.bind(this);
    this.chooseTime = this.chooseTime.bind(this);
    this.setTimeZone = this.setTimeZone.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  onSelectionClick(e){
    this.setState({callType:(e.target.id==='video') ? 1:2});
  }
  chooseDate(e){
    this.errorDiv.style.display = 'none';
    this.setState({callDate:e.currentTarget.children[1].innerHTML});
    this.changeView('SelectTime')
  }
  chooseTime(e){
    this.errorDiv.style.display = 'none';
    this.setState({callTime:e.currentTarget.getAttribute('data-time')})
  }
  setTimeZone(tz){
    this.errorDiv.style.display = 'none';
    if(tz ==='null')
      tz = null;
    this.setState({callTimeZone:tz})
  }
  updateForm(e){
    var name = e.target.getAttribute('name');
    if(name==='userName')
      this.setState({userName:e.target.value});
    else if(name==='phoneNumber')
      this.setState({phoneNumber:e.target.value});
    else if(name==='userNote')
      this.setState({userNote:e.target.value});
  }
  handleSubmit(e){
  }
  goBack(){
    var history=['Home','SelectDate','SelectTime','ContactInfo'];
    this.setState({view:history[history.indexOf(this.state.view)-1]})
  }
  changeView(view){
    if(view ==='SelectTime'){
      this.setState({view:view});
    }else if(view==='ContactInfo') {
      if(this.state.callTime && this.state.callTimeZone)
        this.setState({view:view});
      else{
        this.setState({error:'Please select a time and a timezone.'});
        this.errorDiv.style.display='block';
      }
    }else if(view==='SelectDate'){
      //update_database
      this.setState({view:view});
    }
     fetch('/api',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'POST',
      body:JSON.stringify(this.state)
    }).then(function(res){
        console.log(res)
    });
  }
  render() {
    return(
      <div className="App">
        <div className="client-header">
          <div className="client-logo"><img src={logo} alt="logo" /></div>
          <span>{this.state.clientName}</span>
        </div>
        <InfoBar view={this.state.view} callType={this.state.callType} callDate={this.state.callDate} callTime={this.state.callTime} />
        <div id="error-message">{this.state.error}</div>
       {this.viewSwitch()}
       <BackBtn view={this.state.view} goBack={this.goBack} />
      </div>
    )
  }
  componentDidMount() {
    this.errorDiv = document.getElementById('error-message');

    //incoming URL has user Token. Check Disha's API for user info and schedule status
    //fake api to test.
    var that = this;
      fetch('/getuser').then(function(res){
        return res.json();

      }).then(function(d){
        if(d.scheduled){
         // var data = d;
          //grab user's appt info from /api with Fetch
          that.setState({
            userName:d.fullname,
            phoneNumber:d.phone,
            sessionID:d.sessionID,
            token:d.token,
            view: 'ThankYou'
          });
        }else{
          that.setState({
            userName:d.fullname,
            phoneNumber:d.phone,
            sessionID:d.sessionID,
            token:d.token
          });
        }
      })
    
  }
  viewSwitch(){
    switch(this.state.view) {
      case 'SelectDate':
        return (<SelectDate callType={this.state.callType} callDate={this.state.callDate} callTime={this.state.callTime} chooseDate={this.chooseDate} changeView={this.changeView}/>)
      case 'SelectTime':
        return(<SelectTime setTimeZone={this.setTimeZone} callTime={this.state.callTime} callTimeZone={this.state.callTimeZone} chooseTime={this.chooseTime} changeView={this.changeView} />);
      case 'ContactInfo':
        return(<ContactInfo updateForm={this.updateForm} userName={this.state.userName} phoneNumber={this.state.phoneNumber} changeView={this.changeView} />)
      case 'ThankYou':
        return(<ThankYou userInfo={this.state} />)
      default:
        return (<Home callType={this.state.callType} client={this.state.clientName} name={this.state.userName} onSelectionClick={this.onSelectionClick} changeView={this.changeView} />)
    }
  }
}

export default App;
