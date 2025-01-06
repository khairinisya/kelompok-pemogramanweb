// assets/js/session.js
const SessionManager = {
    setUser(user) {
        sessionStorage.setItem('user', JSON.stringify(user));
    },

    getUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    logout() {
        sessionStorage.removeItem('user');
        window.location.href = 'login.html';
    },

    isLoggedIn() {
        return !!this.getUser();
    }
};