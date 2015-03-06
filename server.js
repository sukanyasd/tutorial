var http = require('http');
var url = require('url');
var fs=require('fs');
var io=require('socket.io');

    var server = http.createServer(function(request, response){
    console.log('Connection');
	var path = url.parse(request.url).pathname;
	//console.log(path);
		
	switch(path){
		case '/':
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write('hello world');
			response.end();
			break;
		case '/socket.html':
			fs.readFile(__dirname + path, function(error , data){
			if (error)
			{
				response.writeHead(404);
				response.write('oops does not exist - 404');
			}
			else
			{
				response.writeHead(200, {"Content-Type": "text/html"});
				response.write(data, "utf8");
			}
			response.end();
			});
			break;
		default:
			response.writeHead(404);
			response.write('default oops does not exist - 404');
			response.end();
			break;
	}
    //response.end();
    });

    server.listen(8001);
	//io.set('log level', 1);
	var websockets_listener = io.listen(server);
	websockets_listener.sockets.on('connection' , function(socket){
	//socket.emit('message' , {'message' : 'hello world'});
	
	//send data to client
	setInterval(function(){
	var now = new Date();
	socket.emit('date', {'date' : new Date()});
	//},1000);
	});
	
	//recieve client data
   socket.on('client_data', function(data){
    process.stdout.write(data.letter);
  });
	});
    
	
	