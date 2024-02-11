import React from 'react';

function Navbar({ navigate }) {
    return (
        <nav>
            <ul>
                <li onClick={() => navigate('landing')}>Home</li>
                <li onClick={() => navigate('resources')}>Resources</li>
                <li onClick={() => navigate('advice')}>Advice</li>
                <li onClick={() => navigate('community')}>Community</li>
                <li onClick={() => navigate('about')}>About Us</li>
            </ul>
        </nav>
    );
}

export default Navbar;
