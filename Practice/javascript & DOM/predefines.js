//fs Module
const fs = require('fs');

fs.writeFileSync("test.txt", "Hello Node.js");

console.log("File created");
//os module
const os = require('os');

console.log(os.platform());
console.log(os.arch());

//Path module
const path = require('path');

console.log(path.basename(__filename));


// http
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello Node.js');
});

server.listen(4000);

console.log('Server running on port 4000');


// Event
const EventEmitter = require('events');

// Create an EventEmitter object
const event = new EventEmitter();

// Create an event listener
event.on('greet', () => {
    console.log('Hello! Welcome to Node.js');
});

// Trigger the event
event.emit('greet');
