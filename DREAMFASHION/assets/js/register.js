document.addEventListener('DOMContentLoaded', () => {
    // Redirect if already logged in
    if (SessionManager.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    const registerForm = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('password_confirmation').value;

        // Validation
        if (!name || !email || !password || !passwordConfirmation) {
            showError('All fields are required');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Invalid email format');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        if (password !== passwordConfirmation) {
            showError('Passwords do not match');
            return;
        }

        // Check if email already exists
        if (STORE_DATA.users.some(user => user.email === email)) {
            showError('Email already registered');
            return;
        }

        // Create new user
        const newUser = {
            id: STORE_DATA.users.length + 1,
            name,
            email,
            password, // In real app, should hash password
            role: 'customer'
        };

        // Add user to STORE_DATA
        STORE_DATA.users.push(newUser);

        // Auto login after registration
        const sessionUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
        
        SessionManager.setUser(sessionUser);
        window.location.href = 'index.html';
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});