/**
 * Created by pery on 19/07/14.
 */
function setupChat(){
    var ws = new WebSocket('ws://10.0.0.141:2134');
    setupInput(ws);
    write('Welcome to very simple chat');

    ws.addEventListener('open', function () {
        write('Opend connection');
    },false);

    ws.addEventListener('message', function (e) {
        write(e.data);
    },false);

    ws.addEventListener('close', function () {
        write('Connection closed');
    },false );

}

function write(str){
    var response = document.getElementById('response')
        ,time = (new Date()).toLocaleTimeString()
        ;
    response.value +=time + " - " + str + "\r\n";
}

function setupInput( ws ){
    var input = document.getElementById('input');

    input.addEventListener('keydown', function(e){
        if(e.keyCode == 13 ){
            ws.send(this.value);
            this.value = "";
        }
    });
}

window.addEventListener('load',setupChat,false);