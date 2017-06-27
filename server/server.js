const express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var pool = mysql.createPool({
  connectionLimit:100,
  host: '54.146.130.149',
  user: 'will',
  port     :  3306,
  password: 'will-123',
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
    connection.query("SELECT * FROM `bvlcalendly` WHERE token='"+req.body.token+"'", function(err, rows){
      if(err){
        console.log(err);
        
      }else{
        if(rows.length===0){ //USER DOESN'T EXIST
          connection.query("INSERT INTO bvlcalendly (type, fullname, phone, session_id, token, created_date) VALUES ('"
            +req.body.type+"', '"+req.body.fullname+"',"+parseInt(req.body.phone.match(/[0-9]/g).join(''))+",'"+req.body.sessionID+"','"+req.body.token+"', CURRENT_TIMESTAMP)",function(err,rows){
              connection.release();
                if(err)
                  console.log(err)
                
                res.json({status:'OK',message:'User Created.'});
              }
          );
        }else{
          console.log(req.body)
          var today = new Date();
          var thisYear = today.getFullYear();
          var date = new Date(req.body.schedule_date+' '+thisYear).getTime()/1000;
          var query = "UPDATE `bvlcalendly` SET ";
          query += "token='"+req.body.token+"'";
          query += (req.body.type) ? ',type='+req.body.type:'';
          query += (req.body.timezone !=null) ? ', timezone='+req.body.timezone:'';
          query += (req.body.timeslot !=null) ? ", timeslot='"+req.body.timeslot+"'":'';
          query += (req.body.timeslot ===null) ? ", timeslot="+req.body.timeslot:'';
          query += (req.body.comment) ? ", comment='"+req.body.comment+"'":'';
          query += (req.body.fullname) ? ", fullname='"+req.body.fullname+"'":'';
          query += (req.body.phone) ? ", phone='"+parseInt(req.body.phone.match(/[0-9]/g).join(''))+"'":'';
          query += (req.body.sessionID) ? ', session_id='+req.body.sessionID:'';
          query += (req.body.status) ? ', status='+req.body.status:'';
          query += (req.body.schedule_id) ? ', schedule_id='+req.body.schedule_id:'';
          query += (req.body.schedule_date != null) ? ", schedule_date=FROM_UNIXTIME("+date+")":'';
          query += (req.body.schedule_date === null) ? ", schedule_date=NULL":'';
          query += ", modified_date=CURRENT_TIMESTAMP WHERE token='"+req.body.token+"'";
          console.log(query)
          
          // var query2 = "UPDATE `bvlcalendly` SET type='"+req.body.type+"',timezone='"+req.body.timezone+"',timeslot='"+req.body.timeslot+"',comment='"+req.body.comment+"',fullname='"+req.body.fullname+"',phone='"+parseInt(req.body.phone.match(/[0-9]/g).join(''))+"',session_id='"+req.body.sessionID+"', token='"+req.body.token+"',status='"+req.body.status+"',schedule_id=null, schedule_date=FROM_UNIXTIME("+date+"), modified_date= CURRENT_TIMESTAMP WHERE token='"+req.body.token+"'";
          connection.query(query, function(err,rows){
              if(err) console.log(err);
              console.log('changed rows: '+rows.changedRows)
              connection.release();
              res.json({status:'OK',message:'User updated.'});   
            }
          );
        }
      }
    })
  });
}
function getUser(req,res){

  pool.getConnection(function(err,connection){
    if(err){
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }
    console.log('Connected as id ' + connection.threadId);
    connection.query("SELECT * FROM bvlcalendly WHERE token='"+req.body.token+"'", 
      function(err, rows){
        if(err)
          console.log(err);
        res.json(rows)
      }
    );
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
app.post('/api/updateUser', (req,res)=>{
  updateDB(req,res)
});
app.post('/api/getUser', (req,res)=>{
  
  getUser(req,res);
})
//FAKE USER API
// app.get('/getuser', (req,res)=>{
//   //fetch from Disha's API with Token
//   //console.log(req.query.token)
//   if(req.query.token==='will-dev'){
//     req.query.scheduled = (req.query.scheduled && req.query.scheduled === 'true') ? true:false;
//     res.json({fullname:'Will Saunders',phone:'4079258049',token:'will-dev',sessionID:'test-123',scheduled:req.query.scheduled})
//   }else{
//     res.json({status:'Failed',code:'000'});
//   }
// })
app.listen(3001, function(){
  console.log(`App listening on port 3001!`);
});