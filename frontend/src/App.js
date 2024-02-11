import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/loginForm';
import LogoutButton from './components/logoutForm';
import RegisterForm from './components/registerForm';
import WelcomePage from './components/welcomePage';

function App() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/hello')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => setError('Failed to fetch welcome message.'));
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setShowLogin(false); // Ensure the login view is disabled when logged in
        setError('');
    };

    const handleLogout = () => {
        setUser(null);
        setShowLogin(true); // Show the login form after logging out
        setError('');
    };

    const handleRegister = async (userData) => {
        // Assuming the registration process does not automatically log the user in
        setShowLogin(true); // Show the login page to allow the user to log in after registering
        setError('');
    };

    const toggleView = () => {
        setShowLogin(!showLogin);
        setError('');
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
                {error && <p className="error-message">{error}</p>}
                {user ? (
                    <WelcomePage user={user} onLogout={handleLogout} />
                ) : showLogin ? (
                    <>
                        <LoginForm onLogin={handleLogin} />
                        <button onClick={toggleView}>Register</button>
                    </>
                ) : (
                    <>
                        <RegisterForm onRegister={handleRegister} />
                        <button onClick={toggleView}>Login</button>
                    </>
                )}
            </header>
        </div>
    );
}

export default App;
