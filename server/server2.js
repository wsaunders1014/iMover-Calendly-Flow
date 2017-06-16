var Client = require('ssh2').Client;
var mysql = require('mysql');
var net = require('net');
var sshConnected = false;
var conn = new Client();

conn.on('ready', function() {
  sshConnected = true;
  var connection = mysql.createConnection({user:'will',database:'imovercrm',host:'localhost',password:'will-123'})
  
      connection.query('INSERT INTO bvlcalendly (type) VALUE (2)', function(err,rows) {
        if(err) 
          throw err;
        console.log(rows);
      });
    

  
}).on('close', function() {
  sshConnected = false;
}).connect({
  host: '54.146.130.149',
  username:'ubuntu',
  privateKey: require('fs').readFileSync('DishaAWS.pem')
});

net.createServer(function(sock) {
  sock.on('error', function() {});
  if (!sshConnected) return sock.end();
  conn.forwardOut(
    '127.0.0.1',
    sock.remotePort,
    '127.0.0.1',
    3306,
    function (err, stream) {
      if (err) return sock.end();
      stream.pipe(sock).pipe(stream);
    });
}).listen(3306);