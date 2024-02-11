import React, { useState } from 'react';
import './css/login_reg_style.css'; // Assuming you have a separate CSS file for LoginForm styles

function RegisterForm({ onRegister, onBack }) { // Include onBack in the props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to register');
            onRegister(data); // Notifies the parent component about the registration
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-actions">
                <button type="submit">Register</button>
                <button type="button" onClick={onBack}>Back</button> {/* Adds the Back button */}
            </div>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default RegisterForm;
