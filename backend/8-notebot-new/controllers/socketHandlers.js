// socketHandlers.js, code manages client connections, tracks connected clients and their usernames, handles disconnections, facilitates real-time messaging between clients
let connectedClients = new Map(); // store information about connected clients. In this case, it associates each client's unique socket ID with their username.

const handleConnection = (socket, io) => {
  console.log('New client connected: ' + socket.id);
  connectedClients.set(socket.id, '');

  // Emit socket ID to the client
  socket.emit('socketID', socket.id);

  // Emit connected clients to all clients
  emitConnectedClients(io);

  // Handle disconnect event, when user disconnects from server
  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    console.log(`Client with id ${socket.id} disconnected!`);
    emitConnectedClients(io);
  });

  // Handle socket ID event
  socket.on('socketID', (socketID) => {
    console.log('My socket ID is: ' + socketID);
  });

  // Handle setUsername event, triggered when a client sets their username
  socket.on('setUsername', (username) => {
    connectedClients.set(socket.id, username);
    emitConnectedClients(io);
    console.log(`Client: ${socket.id} has set their username to: ${username}`);
  });

  // Handle message event, client sends message
  socket.on('message', (messageData) => {
    handleMessage(socket, messageData, io);
  });
};

//array of connected clients
const emitConnectedClients = (io) => {
  let clients = [];
  connectedClients.forEach((value, key) => {
    clients.push([key, value]);
  });
  io.emit('connected clients', clients);
};

const handleMessage = (socket, messageData, io) => {
  // Process the message and send a response
    console.log(`Client: ${socket.id} sent message: ${messageData.content}`);
    
  // Emit the message to all clients
  io.emit('message', {
    content: messageData.content,
    sender: 'client',
    socket: socket.id,
    username: connectedClients.get(socket.id),
  });
};

//exports function
module.exports = {
  handleConnection,
};
