var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
users = [];
connections = [];

server.listen(process.env.PORT || 3000,function(){
	console.log('Server Running...');
});
	
app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));

app.use(express.static(path.resolve(__dirname)));

app.get('/',function(req,res){
	res.render('index.ejs');
});

io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log('Connected: %s socket Connected', connections.length);
	//Disconnect
	socket.on('disconnect',function(data){
	
		users.splice(users.indexOf(socket.username),1);
		updateUsernames();
		connections.splice(connections.indexOf(socket),1);
		console.log('DisConnected: %s socket Connected', connections.length);
	});
	//Send Message
	socket.on('send message',function(data){
		
		io.sockets.emit('new message',{msg: data, user: socket.username});
	});
	//New User
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});

	function updateUsernames(){
		io.sockets.emit('get users', users);
	}
});

