document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

        // Debugging: Log the username and password
    console.log('Username:', username);
    console.log('Password:', password);
    
    // Send credentials to the server for validation
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // Authentication successful
            localStorage.setItem('adminAuthenticated', 'true');
            window.location.href = 'admin-dashboard.html';
        } else {
            // Show error message
            document.getElementById('errorMessage').style.display = 'block';
            console.log('Login failed: Invalid credentials'); // Log the failure
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').style.display = 'block';
    });
});
