// Speech recognition functionality
const startRecognitionButton = document.getElementById('startRecognition');
const paymentForm = document.getElementById('paymentForm');
const userInfoForm = document.getElementById('userInfoForm');
let username = '';
let recipientName = '';

// Event listener for submitting user info form
userInfoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    username = userInfoForm.elements['username'].value;
});

// Event listener for updating recipient name
userInfoForm.addEventListener('input', function(event) {
    recipientName = userInfoForm.elements['recipient'].value;
});

// Function to process voice command
function processVoiceCommand(command) {
    const amountRegex = /\b\d+(\.\d+)?\b/g;
    const nameRegex = /(?:send to )(.+)/gi;

    const matchAmount = command.match(amountRegex);
    const matchName = command.match(nameRegex);

    if (matchAmount && recipientName) {
        const amount = matchAmount[0];
        
        paymentForm.querySelector('input[type="number"]').value = amount;
        alert(`Money sent successfully to ${recipientName} (${username}): ₹${amount}`);

    } else {
        alert('Invalid command. Please specify the recipient\'s name and amount.');
    }
}

// Initializing speech recognition
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        startRecognitionButton.textContent = 'Listening...';
    };

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        processVoiceCommand(result);
    };

    recognition.onend = function() {
        startRecognitionButton.textContent = 'Start Recognition';
    };

    startRecognitionButton.addEventListener('click', function() {
        recognition.start();
    });
} else {
    startRecognitionButton.textContent = 'Speech Recognition Not Supported';
}
// Get login form and voice-based section
const loginForm = document.getElementById('loginForm');
const voiceSection = document.getElementById('voiceSection');
const loginSection = document.getElementById('loginSection');

// Add event listener to login form
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = loginForm.elements['email'].value;
    const password = loginForm.elements['password'].value;
    
    // Check if email and password match
    if (email === '2872@gprec' && password === 'arif') {
        // Show voice-based section and hide login section
        voiceSection.classList.remove('hidden');
        loginSection.classList.add('hidden');
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

