/* ---------------------------------------------------
                Ameripino WebSocket Client
        2018 - Juan J. Lamas EA1NK - SCQ Devices
   ---------------------------------------------------
*/ 

var host = 'your_host';
var port = 'your_port';
var socket = new WebSocket('ws://' + host + ":" + port);

socket.onopen = function () {

    console.log("Connected!");
    $("#connection_status").text("Connected");
    switchClasses("badge-dark", "badge-success", "connection_status");
    
}

socket.onerror = function (error) {

    $("#connection_status").text("ERROR");
    switchClasses("badge-dark", "badge-danger", "connection_status");

}

socket.onmessage = function (msg) {

    console.log("Received: " + msg.data);
    processMessage(msg);
}

socket.onclose = function () {

    console.log("Disconnected!");
    $("#connection_status").text("Disconnected");
    switchClasses("badge-danger", "badge-dark", "connection_status");
    switchClasses("badge-success", "badge-dark", "connection_status");
}

function switchClasses(before, after, element) {

    $("#" + element).removeClass(before);
    $("#" + element).addClass(after);

}

function resetButtonClass() {

    $("#ant_ports").find('button').each(function () {

        $(this).removeClass();
        $(this).addClass('btn');

    });

}

function processMessage(msg){

    //AZ=000
    var azimuth = msg.split("=")[1];
    $("#azimuth").text(msg);

}

function doCmd(cmd){

const commands = ['','MLFT','MSTP','MRGT'];

    socket.send(commands[cmd] +"\n");

}

function goAzimuth(){

    var goto = $('#azimuth_value').val();
    if(!goto || isNaN(goto) || goto > 360 || goto < 0 ){
        alert("Invalid azimuth value!\nAzimuth mut be an integer between 0 and 360");
        return;
    } else {

        socket.send('M'+ goto +"\n");
    }

}