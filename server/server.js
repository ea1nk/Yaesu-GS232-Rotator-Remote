/* 
	---------------------------------------------------
        		Ameripino WebSocket Server
            2018 - Juan J. Lamas EA1NK - SCQ Devices
            
                node server.js /dev/ttyXX
	---------------------------------------------------
*/

// Variable definitions

var rotator_port = process.argv[2];

//Serial port configuration

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var rotator = new SerialPort(rotator_port, {

    parser: serialport.parsers.readline('\r'),

    baudrate: 9600

});

//Websocket Server
var WebSocketServer = require("ws").Server
var wss = new WebSocketServer({
    port: 64000
});
var wsocket;

if (!rotator_port) {
    console.log("\nError:\n Usage: nodejs server.js <Rotator port>\n");
    process.exit();
}



// Init banner to make it friendly

console.log('\nRotator Remote v0.1 - 2014 Juan J. Lamas EA1NK\n\n     ++++ Server  Up & Running ++++\n');
console.log("       Listening on port: 64000\n");
console.log("       Rotator on:" + rotator_port + "\n");
console.log("     ++++++++++++++++++++++++++++++\n");

//Websocket Callbacks
wss.on('connection', function (ws) {
    wsocket = ws;
    console.log('Client connected');

    //On Incoming rotor
    rotator.on('data', function (data) {

        if (ws.readyState == 1) {
            ws.send(data);
        };

    });

    //On 
    wsocket.on('message', function (message) {

        proccess_command(message);

    });

});

setInterval(function () {

    rotor.write('C\r'); //Poll rotator every second.


}, 1000);

function proccess_command(command) {

    var action = command.substr(0, 3);
    if (action == 'rot') {
        doRotator(command);
    }

}

function doRotator(cmd) {

    var comando = cmd.substr(3, 4);
    
    //Comando can be an MXXX (azimuth) or button state
    
    if (comando == 'MLFT') { //Move LEFT
        comando = 'L';
    }
    if (comando == 'MSTP') { //STOP
        comando = 'A';
    }
    if (comando == 'MRGT') { //MOVE RIGHT
        comando = 'R';
    }
    console.log("Rotator: " + comando);
    
    //Set medium speed
    rotor.write('X2\r');
    
    //Send command to ERC
    rotor.write(comando + '\r');

}