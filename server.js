const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

// Create an HTTP server to serve the HTML page
const server = http.createServer((req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Create a WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// Event listener for when a client connects to the WebSocket server
wss.on('connection', (socket) => {
    console.log('Client connected');

    // Send a welcome message to the client
    socket.send('Welcome to the WebSocket server!');

    // Listen for messages from the client
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    // Handle socket closure
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server on port 8081
server.listen(8081, () => {
    console.log('Server listening on http://localhost:8081');
});
