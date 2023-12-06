const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8083 });

server.on("connection", async (socket) => {
  console.log("Client connected");

  // Send a welcome message to the client
  socket.send("Welcome to the WebSocket server!");

  // Input number asynchronously
  const n = await askQuestion("Choose a number for the game:");

  console.log(`You chose => ${n}!`);
 // Listen for messages from the client
  socket.on("message", (message) => {
    console.log(`He sent you: ${message}`);

    if (parseInt(message) === parseInt(n)) {
      socket.send("You win!");
      console.log("He got it");
    } else {
      socket.send("Try again!");
      console.log("Incorrect guess");
    }
  });


  
 

  // Handle socket closure
  socket.on("close", () => {
    console.log("Client disconnected");
  });
});5

async function askQuestion(question) {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(question, (answer) => {
      resolve(answer);
      readline.close();
    });
  });
}

