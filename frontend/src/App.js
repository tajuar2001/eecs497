import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/loginForm.jsx';
import Logout from './components/logoutForm.jsx'; // Assuming the file is renamed to LogoutButton.jsx
import Register from './components/registerForm.jsx';
import Welcome from './components/welcomePage.jsx';

function App() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);
    const [error, setError] = useState(''); // New state for managing errors globally

    useEffect(() => {
        fetch('/api/hello')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => setError('Failed to fetch welcome message.'));
        
        // Optionally, implement a check for user session here
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            setUser({ name: data.name });
            setShowLogin(true); // Optionally toggle view back to welcome screen
            setError(''); // Clear any previous errors
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout');
            if (!response.ok) throw new Error('Logout failed');
            setUser(null);
            setError(''); // Clear any errors
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegister = async (username, password) => {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            setUser({ name: username }); // Assume registration logs the user in
            setShowLogin(true); // Switch to welcome screen after registration
            setError(''); // Clear any previous errors
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleView = () => {
        setShowLogin(!showLogin);
        setError(''); // Clear errors when toggling views
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
                {error && <p className="error-message">{error}</p>}
                {user ? (
                    <Welcome user={user} onLogout={handleLogout} />
                ) : showLogin ? (
                    <>
                        <Login onLogin={handleLogin} />
                        <button onClick={toggleView}>Register</button>
                    </>
                ) : (
                    <>
                        <Register onRegister={handleRegister} />
                        <button onClick={toggleView}>Login</button>
                    </>
                )}
            </header>
        </div>
    );
}

export default App;
