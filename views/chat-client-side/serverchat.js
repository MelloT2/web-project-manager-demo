const socketio = require('socket.io');
const server = require('../../app');
const io = socketio(server);
const botName = 'ChatBot'

io.on('connection', socket =>{
    console.log('A user has connected');

    socket.on('joinRoom',({username, room}) =>{
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome...!'));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined`)) 
    });
  
    // Listen for chat messages
    socket.on('chatMessage', ({ msg, room, sender }) => {
        const time = new Date().toLocaleTimeString(); // Get current time
        const message = { username: sender, time, text: msg };
        io.to(room).emit('message', message); // Send message to all clients in the room
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userleave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName,`${user.username} left now`))
        }
        console.log('A user has disconnected');
    });
});

console.log('Socket server started');