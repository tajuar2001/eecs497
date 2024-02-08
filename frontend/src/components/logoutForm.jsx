import React from 'react';

function LogoutButton({ onLogout }) {
    const handleLogoutClick = async () => {
        try {
            const response = await fetch('/logout', { method: 'GET', credentials: 'include' });
            if (!response.ok) throw new Error('Logout failed');
            onLogout();
        } catch (error) {
            console.error(error.message);
        }
    };

    return <button onClick={handleLogoutClick}>Logout</button>;
}

export default LogoutButton;
