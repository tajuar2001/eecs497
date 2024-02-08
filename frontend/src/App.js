import React, {useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Login from './components/loginForm.jsx';
import Logout from './components/logoutForm.jsx';
import Register from './components/registerForm.jsx';
import Welcome from './components/welcomePage.jsx';


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

    const handleLogin = async (username, password) => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser({ name: data.name });
            // Additional login logic here
        } else {
            // Handle login error
            console.error('Login failed:', data.message);
        }
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
                        <Welcome user={user} onLogout={handleLogout} />
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
