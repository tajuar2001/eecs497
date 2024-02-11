import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/loginForm';
import LogoutButton from './components/logoutForm';
import RegisterForm from './components/registerForm';
import LandingPage from './components/landingPage'; // Import the LandingPage component

function App() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('landing');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/hello')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => setError('Failed to fetch welcome message.'));
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentPage('landing');
        setError('');
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentPage('landing');
        setError('');
    };

    const handleRegister = (userData) => {
        setCurrentPage('login');
        setError('');
    };

    const navigate = (page) => {
        setCurrentPage(page);
        setError('');
    };

    return (
        <div className="App">
            <header className="App-header">
                {message && <p>{message}</p>}
                {error && <p className="error-message">{error}</p>}
                {currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
                {currentPage === 'login' && !user && (
                    <LoginForm onLogin={handleLogin} onBack={() => navigate('landing')} />
                )}
                {currentPage === 'register' && !user && (
                    <RegisterForm onRegister={handleRegister} onBack={() => navigate('landing')} />
                )}
            </header>
        </div>
    );
}

export default App;