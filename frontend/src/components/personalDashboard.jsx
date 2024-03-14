import React, { useState, useEffect } from 'react';
import HelpPage from './helpPage';
import axios from 'axios';

import './css/userProfile.css'; // Make sure to create a corresponding CSS file for styling
import './css/dashBoard.css';

function PersonalDashboardPage({ user }) {
    const [kids, setKids] = useState([]);
    const [newKidName, setNewKidName] = useState('');
    const [newKidBirthday, setNewKidBirthday] = useState('');
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const toggleHelpMode = () => setHelpModalOpen(!helpModalOpen);

    useEffect(() => {
        // Fetch kids when the component mounts
        axios.get('/api/kids')
            .then(response => {
                setKids(response.data);
            })
            .catch(error => console.error('Error fetching kids:', error));
    }, []);

    // Format today's date
    const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const handleAddKid = (e) => {
        e.preventDefault();
        axios.post('/api/kids', {
            name: newKidName,
            birthday: newKidBirthday
        }).then(response => {
            setKids(prev => [...prev, { name: newKidName, birthday: newKidBirthday }]);
        }).catch(error => {
            console.error('Error adding kid:', error);
        });
    };

    return (
        <div className="dashboard-container">
            <div className="user-info">
                <img src="user-profile-picture-url" alt="User" className="user-picture" /> {/* Replace src with actual image path */}
                <div className="user-details">
                    <h2 className="profile-name">Personal Dashboard</h2>
                    <p>Hello, {user.name}</p>
                    <p className="date">{today}</p>
                </div>
            </div>
            <div className="kids-section">
                <h3>My Kids</h3>
                <ul>
                    {kids.map((kid, index) => (
                        <li key={index}>{kid.name} - {kid.birthday}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleAddKid} className="add-kid-form">
                <input
                    type="text"
                    value={newKidName}
                    onChange={e => setNewKidName(e.target.value)}
                    placeholder="Kid's name"
                    required
                />
                <input
                    type="date"
                    value={newKidBirthday}
                    onChange={e => setNewKidBirthday(e.target.value)}
                    required
                />
                <button type="submit">Add Kid</button>
            </form>
            <button className="help-button" onClick={toggleHelpMode}>?</button>
            {helpModalOpen && <HelpPage onClose={toggleHelpMode} />}
        </div>
    );
}

export default PersonalDashboardPage;