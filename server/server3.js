var mysql = require('mysql');
 var connection = mysql.createConnection({user:'will',database:'imovercrm',host:'54.146.130.149',password:'will-123'})
  
connection.query('INSERT INTO bvlcalendly (type) VALUE (2)', function(err,rows) {
if(err) 
  throw err;
console.log(rows);
});