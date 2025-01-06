// assets/js/login.js
document.addEventListener('DOMContentLoaded', () => {
    // Redirect if already logged in
    if (SessionManager.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validate inputs
        if (!email || !password) {
            showError('Email and password are required');
            return;
        }

        // Find user in STORE_DATA
        const user = STORE_DATA.users.find(u => u.email === email);

        if (user && user.password === password) { // In real app, use proper password hashing
            // Login successful
            const sessionUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            
            SessionManager.setUser(sessionUser);
            window.location.href = 'index.html';
        } else {
            showError('Invalid email or password');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});