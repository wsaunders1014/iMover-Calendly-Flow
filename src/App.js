import React, { Component } from 'react';
import Home from './components/Home';
import SelectDate from './components/SelectDate';
import SelectTime from './components/SelectTime';
import ContactInfo from './components/ContactInfo';
import InfoBar from './components/InfoBar';
import ThankYou from './components/ThankYou';
import BackBtn from './components/BackBtn'
import Loader from './components/Loader'
import logo from './img/bvl-logo.svg';
import './css/App.css';
//import { CSSTransitionGroup } from 'react-transition-group';
var path = (window.location.search !== '') ? window.location.search.split('?token=')[1]:null;
var token;
if(path.indexOf('&')!==-1){
   token = path.split('&')[0];
//   var scheduled = path.split('&')[1];
 }else{
    token = path;
 }
var browserTZ = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
var tz = 2;
if(browserTZ.indexOf('E') !== -1)
  tz = 0;
else if(browserTZ.indexOf('C') !== -1)
  tz=1;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type:null,
      schedule_date:null,
      timeslot:null,
      timezone:tz,
      fullname:'',
      phone:'',
      comment:'',
      status:0,
      clientName:'Budget Van Lines',
      error:'',
      token:token,
      sessionID:null,
      view:''
    }
   
    this.onSelectionClick = this.onSelectionClick.bind(this);
    this.changeView = this.changeView.bind(this);
    this.viewSwitch = this.viewSwitch.bind(this);
    this.chooseDate = this.chooseDate.bind(this);
    this.chooseTime = this.chooseTime.bind(this);
    this.setTimeZone = this.setTimeZone.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.goBack = this.goBack.bind(this);
    this.cancelAppt = this.cancelAppt.bind(this);
  }
  onSelectionClick(e){
    this.setState({type:(e.target.id==='video') ? 1:2});
    setTimeout(()=>{
      this.changeView('SelectDate');
    },400);
  }
  chooseDate(e){
    this.errorDiv.style.display = 'none';
    this.setState({schedule_date:e.currentTarget.children[1].innerHTML});
    setTimeout(()=>{
     this.changeView('SelectTime');
    },500)
  }
  chooseTime(e){
    this.errorDiv.style.display = 'none';
    this.setState({timeslot:e.currentTarget.getAttribute('data-time')});
    setTimeout(()=>{
      this.changeView('ContactInfo');
    },500)
  }
  setTimeZone(tz){
    this.errorDiv.style.display = 'none';
    this.setState({timezone:parseInt(tz,10)})
    
  }
  updateForm(e){
    var input = e.target;
    var value = input.value;
    var name = input.getAttribute('name');
    if(name==='fullname')
      this.setState({fullname:e.target.value});
    else if(name==='phone'){
      //format phone number
      var numbers = value.match(/[0-9]/g);
      if(numbers.length <3) {
        input.value = numbers[0]+((numbers[1]) ? numbers[1]:'')+((numbers[2]) ? numbers[2]:'');
      }else if(numbers.length < 4){
        input.value= numbers[0]+((numbers[1]) ? numbers[1]:'')+((numbers[2]) ? numbers[2]:'')+'-';
      }else if(numbers.length <6){
        input.value = numbers[0]+((numbers[1]) ? numbers[1]:'')+((numbers[2]) ? numbers[2]:'')+'-'+((numbers[3]) ? numbers[3]:'')+((numbers[4]) ? numbers[4]:'')+((numbers[5]) ? numbers[5]:'');
      }else {
        input.value = numbers[0]+((numbers[1]) ? numbers[1]:'')+((numbers[2]) ? numbers[2]:'')+'-'+((numbers[3]) ? numbers[3]:'')+((numbers[4]) ? numbers[4]:'')+((numbers[5]) ? numbers[5]:'')+'-'+((numbers[6]) ? numbers[6]:'')+((numbers[7]) ? numbers[7]:'')+((numbers[8]) ? numbers[8]:'')+((numbers[9]) ? numbers[9]:'');
      }
      this.setState({phone:input.value});

    }
    else if(name==='comment')
      this.setState({comment:e.target.value});
  }
  handleSubmit(e){
  }
  goBack(){
    var history=['Home','SelectDate','SelectTime','ContactInfo'];
    this.setState({view:history[history.indexOf(this.state.view)-1]})
  }
  changeView(view){
    if(view ==='SelectTime'){ // FROM DATE to TIME
        this.setState({view:view,prevView:this.state.view});
    }else if(view==='ContactInfo') { //FROM TIME to CONTACT
      if(this.state.timeslot && this.state.timezone)
        this.setState({view:view,prevView:this.state.view});
      else{
        this.setState({error:'Please select a time and a timezone.'});
        this.errorDiv.style.display='block';
      }
    }else if(view==='SelectDate'){//FROM CALL to DATE
     this.setState({view:view,prevView:this.state.view});
    }else if(view==='ThankYou'){//FROM CONTACT to THANKS
      //TO DO: Validate form before changing state.
      this.setState({view:view,status:(this.state.status>0) ? 2:1,prevView:this.state.view});
    }
  }
  render() {
    return(
      <div className="App">
        <div className="client-header">
          <div className="client-logo"><img src={logo} alt="logo" /></div>
          <span>{this.state.clientName}</span>
        </div>
        <InfoBar view={this.state.view} type={this.state.type} schedule_date={this.state.schedule_date} timeslot={this.state.timeslot} />
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
    fetch('https://cobrakai.co/matrix/fetch-lead-details-by-token',{
      method:'POST',
      headers: { 
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body:JSON.stringify({token:this.state.token})
    }).then(function(res){
      return res.json();
    }).then(function(d){
      if(d.message!==1){
        console.log('Token not found')
      }else{
        d = d.data;
        if(d.is_scheduled === 1 || d.is_scheduled === 2){
          //grab user's appt info from /api with Fetch
          fetch('/api/getUser',{headers: {'Accept': 'application/json','Content-Type': 'application/json'},method:'POST', body:JSON.stringify({token:that.state.token})}).then((res)=>{
            return res.json();
          }).then((res)=>{
            res = res[0];
            that.setState({
              fullname:res.fullname,
              phone:String(res.phone).replace(/(\d{3})(\d{3})(\d{4})/g,'$1-$2-$3'),
              schedule_date:formatDate(res.schedule_date),
              timeslot:res.timeslot,
              timezone:res.timezone,
              comment:res.comment,
              type:res.type,
              status:d.is_scheduled,
              view: 'ThankYou',
              prevView:'Home'
            });
          })
        }else{
          that.setState({
            fullname:d.name,
            phone:d.phone.replace(/(\d{3})(\d{3})(\d{4})/g,'$1-$2-$3'),
            status:d.is_scheduled,
            view:'Home'
          });
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.view === 'ThankYou' && prevState.view === 'ContactInfo'){
    //update imover DB and cobrakai
      fetch('/api/updateUser', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(this.state)
      });
      fetch('https://cobrakai.co/matrix/event-status',{
        method:'POST',
        headers: { 
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },  
        body:JSON.stringify({token:this.state.token,is_scheduled:this.state.status,first_name:this.state.fullname.split(' ')[0],last_name:this.state.fullname.split(' ')[1],phone:this.state.phone.split('-').join('')})
      });
    }
  }
  viewSwitch(){
    switch(this.state.view) {
      case 'SelectDate':
        return (
          
            <SelectDate type={this.state.type} schedule_date={this.state.schedule_date} timeslot={this.state.timeslot} chooseDate={this.chooseDate} changeView={this.changeView}/>
         
        )
      case 'SelectTime':
        return(<SelectTime setTimeZone={this.setTimeZone} timeslot={this.state.timeslot} timezone={this.state.timezone} chooseTime={this.chooseTime} changeView={this.changeView} />);
      case 'ContactInfo':
        return(<ContactInfo updateForm={this.updateForm} fullname={this.state.fullname} phone={this.state.phone} changeView={this.changeView} />)
      case 'ThankYou':
        return(<ThankYou prevView={this.state.prevView} userInfo={this.state} changeView={this.changeView} cancelAppt={this.cancelAppt}/>)
      case 'Home':
        return (
           
              <Home key={'Home'} type={this.state.type} clientName={this.state.clientName} fullname={this.state.fullname} status={this.state.status} onSelectionClick={this.onSelectionClick} changeView={this.changeView} />
           
          )
      default:
        return(<Loader />)
    }
  }
  cancelAppt(){
    var state = {token:this.state.token, phone:this.state.phone, schedule_date:null,timeslot:null,timezone:2,type:null,status:3,comment:'',view:'Home'}
    this.setState(state);
    fetch('/api/updateUser', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(state)
      });
    fetch('https://cobrakai.co/matrix/event-status',{
      method:'POST',
      headers: { 
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
       body:JSON.stringify({token:this.state.token,is_scheduled:3,first_name:this.state.fullname.split(' ')[0],last_name:this.state.fullname.split(' ')[1],phone:this.state.phone.split('-').join('')})
    });
  }

}
function formatDate(date){
  if(date !== null){
    var x = new Date(date);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day=x.getDate();
    
    return months[x.getMonth()]+' '+day;
  }else
    return null;
}
export default App;
