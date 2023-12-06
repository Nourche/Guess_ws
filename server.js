const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8081 });

server.on('connection', (socket) => {
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
