const express = require('express');
const fs = require('fs');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var pool = mysql.createPool({
  connectionLimit:100,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'imovercrm'
});
app.set('port', 3001);
function updateDB(req,res){
  pool.getConnection(function(err,connection){
    if(err){
      connection.release();
       res.json({"code" : 100, "status" : "Error in connection database"});
           return;
    }
    console.log('Connected as id ' + connection.threadId);

    //Check if user exists
    connection.query("SELECT * FROM bvlcalendly WHERE session_id='"+req.body.sessionID+"'", function(err, rows){
      if(err)
        console.log(err);
      else{
        if(rows.length===0){ //USER DOESN'T EXIST
          // var now = new Date();
          // var month = addZero(now.getMonth(),true)
          // var date = addZero(now.getDate(),false);
          // var time = addZero(now.getHour(),false)+':'+addZero(now.getMinutes(),false)+':'+addZero(now.getSeconds(),false);

         // var timestamp = now.GetFullYear()+'-'+month+'-'+date+' '+time;
          connection.query("INSERT INTO bvlcalendly (type, fullname, phone, session_id, token, created_date) VALUES ('"
            +req.body.callType+"', '"+req.body.userName+"',"+req.body.phoneNumber+",'"+req.body.sessionID+"','"+req.body.token+"',DATE_FORMAT(NOW(),'%Y-%m-%d %H:%i:%s'))",function(err,rows){
              if(err)
                console.log(err)
            connection.release();
            res.json({"code":200,"status":"Success"})     
         });
        }else{
          connection.query("UPDATE bvlcalendly SET type='"+req.body.callType+"',timezone='"+req.body.callTimeZone+"',timeslot='"+req.body.callTime+"',comment='"+req.body.userNote+"',fullname='"+req.body.userName+"',phone='"+req.body.phoneNumber+"',session_id='"+req.body.sessionID+"', token='"+req.body.token+"',status='"+req.body.status+"',schedule_id=null, schedule_date='"+req.body.callDate+"' WHERE session_id='"+req.body.sessionID+"'",function(err,rows){
              if(err)
                console.log(err)
            connection.release();
             res.json({"code":200,"status":"Success"})        
         });
        }
      }
    })
    

   connection.on('error', function(err) {      
     res.json({"code" : 100, "status" : "Error in connection database"});
      return;     
     });
  });
}
function addZero(num,month){
  if(num < 10 && !month)
    return '0'+num;
  else if(num<10 && month)
    return '0'+(num+1);
}
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/api', (req,res)=>{
  console.log(req.body)
  updateDB(req,res)
});
//FAKE USER API
app.get('/getuser', (req,res)=>{
  res.json({fullname:'Will Saunders',phone:'4079258049',token:'will-dev',sessionID:'test-123',scheduled:false})
})
app.listen(3001, function(){
  console.log(`App listening on port 3001!`);
});
