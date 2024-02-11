import React, { useState } from 'react';

function LoginForm({ onLogin, onBack }) { // Added onBack prop
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include', // Necessary for sessions/cookies handling
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to login');
            onLogin(data);
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
                <button type="submit">Login</button>
                <button type="button" onClick={onBack}>Back</button> {/* Back button */}
            </div>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default LoginForm;
