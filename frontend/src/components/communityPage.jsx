import React, { useState, useEffect } from 'react';
import './css/communityPage.css';
import CommunityDetails from './CommunityDetails';

function CommunityPage({ user }) {
  const [communities, setCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDescription, setNewCommunityDescription] = useState('');
  const [showCreateCommunityPopup, setShowCreateCommunityPopup] = useState(false);
  const [recommendedCommunities, setRecommendedCommunities] = useState([]);

  useEffect(() => {
    fetchCommunities();
    fetchUserCommunities();
    fetchRecommendedCommunities();
    const storedCommunity = JSON.parse(localStorage.getItem('selectedCommunity'));
    if (storedCommunity) {
      setSelectedCommunity(storedCommunity);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCommunity', JSON.stringify(selectedCommunity));
  }, [selectedCommunity]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch('/api/communities');
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  const fetchUserCommunities = async () => {
    try {
      const response = await fetch('/api/user/communities');
      const data = await response.json();
      setUserCommunities(data);
    } catch (error) {
      console.error('Error fetching user communities:', error);
    }
  };

  const fetchRecommendedCommunities = async () => {
    try {
      const response = await fetch(`/api/recommendations/communities/${user.id}`);
      const data = await response.json();
      setRecommendedCommunities(data);
    } catch (error) {
      console.error('Error fetching recommended communities:', error);
    }
  };

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      await fetch(`/api/communities/${communityId}/join`, { method: 'POST' });
      fetchUserCommunities();
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  const handleLeaveCommunity = async (event, communityId) => {
    event.stopPropagation();
    try {
      await fetch(`/api/communities/${communityId}/leave`, { method: 'POST' });
      fetchUserCommunities();
    } catch (error) {
      console.error('Error leaving community:', error);
    }
  };

  const handleCreateCommunity = async () => {
    if (!newCommunityName.trim()) {
      console.error('Community name cannot be empty');
      return;
    }
    try {
      const response = await fetch('/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCommunityName, description: newCommunityDescription }),
      });
      const data = await response.json();
      setNewCommunityName('');
      setNewCommunityDescription('');
      fetchCommunities();
      setShowCreateCommunityPopup(false);
    } catch (error) {
      console.error('Error creating community:', error);
    }
  };

  const handleDeleteCommunity = async (event, communityId) => {
    event.stopPropagation();
    try {
      await fetch(`/api/communities/${communityId}`, {
        method: 'DELETE',
      });
      fetchCommunities();
      fetchUserCommunities();
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  };

  return (
    <div className="community-page">
      <div className="dropdown">
        <div className="dropdown-header">My Communities</div>
        <div className="dropdown-content">
          {userCommunities
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((community) => (
              <div key={community.id} className="dropdown-item" onClick={() => handleCommunityClick(community)}>
                {community.name}
              </div>
            ))}
        </div>
      </div>

      {selectedCommunity ? (
        <CommunityDetails user={user} community={selectedCommunity} onBack={() => setSelectedCommunity(null)} />
      ) : (
        <div className="center-container">
          <div className="community-sidebar">
            <h2>Communities</h2>
            <ul>
              {communities.map((community) => (
                <li key={community.id} onClick={() => handleCommunityClick(community)}>
                  {community.creator_id === user.id && (
                    <button onClick={(event) => handleDeleteCommunity(event, community.id)}>Delete Community</button>
                  )}
                  {community.name}
                  {userCommunities.some((c) => c.id === community.id) ? (
                    <button onClick={(event) => handleLeaveCommunity(event, community.id)}>Leave</button>
                  ) : (
                    <button onClick={() => handleJoinCommunity(community.id)}>Join</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="community-content">
            <div className="create-community-button">
              <button className="create-community-btn" onClick={() => setShowCreateCommunityPopup(true)}>+</button>
            </div>
          </div>
        </div>
      )}
       <div className="recommended-communities">
        <h3>Recommended for you</h3>
        <ul>
          {recommendedCommunities.map((community) => (
            <li key={community.id}>
              {community.name}
              {userCommunities.some((c) => c.id === community.id) ? (
                <button onClick={(event) => handleLeaveCommunity(event, community.id)}>Leave</button>
              ) : (
                <button onClick={() => handleJoinCommunity(community.id)}>Join</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {showCreateCommunityPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Create Community</h3>
            <input
              type="text"
              placeholder="Community Name"
              value={newCommunityName}
              onChange={(e) => setNewCommunityName(e.target.value)}
            />
            <textarea
              placeholder="Community Description"
              value={newCommunityDescription}
              onChange={(e) => setNewCommunityDescription(e.target.value)}
            ></textarea>
            <button onClick={handleCreateCommunity}>Create</button>
            <button onClick={() => setShowCreateCommunityPopup(false)}>Cancel</button>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default CommunityPage;