import React, {useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Login from '/home/tajuarb/Coding/eecs497/frontend/src/components/loginForm.jsx';
import Logout from '/home/tajuarb/Coding/eecs497/frontend/src/components/logoutForm.jsx';
import Register from '/home/tajuarb/Coding/eecs497/frontend/src/components/registerForm.jsx';


function App() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true); // State to toggle between Login and Register view

    useEffect(() => {
        // Fetch the welcome message
        fetch('/api/hello')
            .then(response => response.json())
            .then(data => setMessage(data.message));
        
        // Check if the user is already logged in (e.g., check local storage or cookie)
        // setUser(userData);
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        // Additional login logic (e.g., setting a token in local storage)
    };

    const handleLogout = async () => {
        // Call the backend to invalidate the user session or token
        const response = await fetch('/logout');
        if (response.ok) {
            setUser(null);
            // Additional logout logic (e.g., clearing the token from local storage)
        } else {
            // Handle errors
        }
    };

    const handleRegister = (userData) => {
        // Handle registration data, similar to login
        setUser(userData);
        // Additional registration logic
    };

    const toggleView = () => {
        setShowLogin(!showLogin); // Toggle between Login and Register view
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
                {user ? (
                    <>
                        <div>Welcome, {user.name}!</div>
                        <Logout onLogout={handleLogout} />
                    </>
                ) : (
                    <>
                        {showLogin ? (
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
                    </>
                )}
            </header>
        </div>
    );
}

export default App;
