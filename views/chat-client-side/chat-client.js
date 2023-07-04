const socket = io();
const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');
const cardID = 'my-room'; // Change this to the ID of the chat room

// Define a default sender
const sender = { name: 'Anonymous' };

// Call joinRoom with cardID
socket.emit('joinRoom', cardID);

// Listen for 'message' event from server
socket.on('message', (message) => {
  displayMessage(message);
});

// Listen for 'chatMessage' event from user
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msgInput = document.getElementById('msg');
  const msg = msgInput.value;
  // Send the chat message to server with cardID and sender info
  socket.emit('chatMessage', { msg, cardID, sender });
  // Clear input field
  msgInput.value = '';
});

function displayMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.sender.name} <span>${message.time}</span></p>
                    <p class="text">
                      ${message.message}
                    </p>`;
  chatMessages.appendChild(div);
  // Scroll down to show new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}