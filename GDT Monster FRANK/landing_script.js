const passwordInput = document.getElementById('password-input');
const submitButton = document.getElementById('submit-password');
const errorMessage = document.getElementById('error-message');

const correctPassword = "TORO"; // The password

submitButton.addEventListener('click', checkPassword);

// Allow Enter key to submit
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkPassword();
    }
});

function checkPassword() {
    const enteredPassword = passwordInput.value;
    errorMessage.textContent = ''; // Clear previous errors

    if (enteredPassword.toUpperCase() === correctPassword) {
        // Correct password, redirect to the main quiz page
        console.log("Password correct! Redirecting...");
        window.location.href = 'index.html'; // Redirect
    } else {
        // Incorrect password
        console.log("Password incorrect.");
        errorMessage.textContent = 'Palabra clave incorrecta. Intenta de nuevo.';
        passwordInput.focus(); // Set focus back to input
        passwordInput.select(); // Select the text for easy replacement
    }
}

// Set focus to password field on load
passwordInput.focus(); 