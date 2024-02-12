import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import LandingPage from './components/landingPage'; // Import the LandingPage component
import UserProfile from './components/userProfile';
// contact -> landing -> landing succesful
function App() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('landing');
    const [error, setError] = useState('');

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
                {error && <p className="error-message">{error}</p>}
                {user && <UserProfile user={user} onLogout={handleLogout} />}
                {!user && currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
                {!user && currentPage === 'login' && (
                    <LoginForm onLogin={handleLogin} onBack={() => navigate('landing')} />
                )}
                {!user && currentPage === 'register' && (
                    <RegisterForm onRegister={handleRegister} onBack={() => navigate('landing')} />
                )}
            </header>
        </div>
    );
}

export default App;