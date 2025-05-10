document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check credentials
    if (username === 'admin' && password === 'admin2025') {
        // Store authentication state
        localStorage.setItem('adminAuthenticated', 'true');
        // Redirect to dashboard
        window.location.href = 'admin-dashboard.html';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}); 