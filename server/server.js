/**
 * Created by pery on 19/07/14.
 */
var server = require('http').createServer()
    ,WebSocketServer = require('websocket').server
    ,WebSocketClient = require('websocket').client
    ,WebSocketFrame  = require('websocket').frame
    ,WebSocketRouter = require('websocket').router

    ;
/*socket section*/

var ws = new WebSocketServer({
                httpServer:server
                ,autoAcceptConnections: true
            });

var clients =  [];
ws.on('connect', function (conn) {
    // set the initial nickname to the client IP
    conn.nickname = conn.remoteAddress;

    conn.on('message',messageHandler);
    conn.on('close',closeHandler);

    // add connection the client list
    clients.push(conn);

    // send message to all clients
    broadcast(conn.nickname + " entered the chat");
});

function broadcast(data){
    clients.forEach(function(clients){
        clients.sendUTF(data);
    })
}

function closeHandler(){
    var index = clients.indexOf(this);
    if(index >-1){
        clients.splice(index,1);
    }
    broadcast(this.nickname + ' left the chat');
}

function messageHandler( message ){
    var data = message.utf8Data;
    broadcast(this.nickname + " says:" + data );
}

server.on('connection',function(socket){
    console.log('connection from: ', socket.address().address );
});
server.listen(2134);

/*

    express section
*/
var express = require('express')
    ,app = express()
    ;

//global config
var port = 3000
    ;
app.use( express.static('./client') );

/**
 * Main application entry file.
 */
app.get('/index', function (req, res) {
    res.sendfile('./client/index.html');
});

app.listen(port);
console.log('Express app started on port ' + port);