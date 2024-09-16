// Admin credentials
const adminCredentials = { username: 'admin', password: 'admin001' };

// Storage for user accounts (from localStorage)
const userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || {};

// Storage for messages (from localStorage)
const messages = JSON.parse(localStorage.getItem('messages')) || [];

// Handle user registration
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    // Check if the username is 'admin' (not allowed for regular users)
    if (username.toLowerCase() === 'admin') {
        document.getElementById('registerError').textContent = 'Username "admin" is reserved for the admin!';
        document.getElementById('registerError').style.display = 'block';
        return;
    }

    // Check if the username already exists
    if (username in userAccounts) {
        document.getElementById('registerError').textContent = 'Username already exists!';
        document.getElementById('registerError').style.display = 'block';
        return;
    }

    // Register user by adding to localStorage
    userAccounts[username] = password;
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts));

    // Registration successful, switch to login form
    document.getElementById('registerError').style.display = 'none'; // Hide error
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    alert('Registration successful! Please log in.');
});

// Handle user login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Check if logging in as admin
    if (username === adminCredentials.username && password === adminCredentials.password) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('adminApp').style.display = 'block';
        displayMessages(); // Admin sees all messages
        return;
    }

    // Check if username and password match for regular users
    if (username in userAccounts && userAccounts[username] === password) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('memberApp').style.display = 'block';
    } else {
        // Invalid credentials
        document.getElementById('loginError').textContent = 'Invalid username or password!';
        document.getElementById('loginError').style.display = 'block';
    }
});

// Handle message submission (Member view)
document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const message = document.getElementById('userMessage').value.trim();
    const sender = document.getElementById('loginUsername').value.trim();

    if (message) {
        // Create a new message object with the sender's username
        const newMessage = {
            sender: sender,
            text: message
        };

        // Save the message to localStorage
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));

        // Clear the form and notify the user
        document.getElementById('userMessage').value = '';
        alert('Your message has been sent!');
    }
});

// Function to display all messages for the admin
function displayMessages() {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = ''; // Clear previous messages

    messages.forEach((message) => {
        const li = document.createElement('li');
        li.textContent = `Sender: ${message.sender} - Message: ${message.text}`;
        messageList.appendChild(li);
    });
}

// Toggle between login and register forms
document.getElementById('showRegister').addEventListener('click', function () {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function () {
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});
