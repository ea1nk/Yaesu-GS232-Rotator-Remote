NodeJS server
------------------------------------------------------

Will comunicate with the web interface via websockets
and handle serial port communication with ERC board.

It needs ws library (https://github.com/websockets/ws)
    
    npm install --save ws
   
It needs serialport library (https://github.com/node-serialport/node-serialport)
    
     npm install --save serialport
    
 Listening port can be configured and the server must be launched

     node server.js <ERC port>


To discover to what serial port the ERC board is attached you can do a dmesg
on a terminal and search for the USB device.
