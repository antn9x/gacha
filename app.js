    var gameport        = process.env.PORT || 3000;

    var express         = require('express');
    // var verbose         = false;
    var app             = express();
	var	http 			= require('http');
	var	server 			= http.Server(app);
    var io              = require('socket.io')(server);

    var GachaServer     = require('./server/GachaServer').GachaServer;
    ///This handler will listen for requests on /*, any file from the root of our server.
    app.use(express.static(__dirname + '/public'));
        //Tell the server to listen for incoming connections
    server.listen(gameport,function(){
        console.log('Server started!');
    });

 //By default, we forward the / path to index.html automatically.
    app.all( '/', function(req, res){
        res.sendFile( __dirname + '/public/index.html');
    });

    //Enter the game server code. The game server handles
    //client connections looking for a game, creating games,
    //leaving games, joining games and ending games when they leave.
    io.on("connection", GachaServer.onSocketConnection);

    process.on('uncaughtException', function (err) {
        console.log("Connection was not established.")
        console.log(err);
    }); 
