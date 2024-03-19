import React, { useState, useEffect } from 'react';
import './css/communityPage.css';
import CommunityDetails from './CommunityDetails';

function CommunityPage({ user }) {
  const [communities, setCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDescription, setNewCommunityDescription] = useState('');

  useEffect(() => {
    fetchCommunities();
    fetchUserCommunities();
  }, []);

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
      {selectedCommunity ? (
        <CommunityDetails user = {user} community={selectedCommunity} onBack={() => setSelectedCommunity(null)} />
      ) : (
        <>
          <div className="community-sidebar">
            <h2>Communities</h2>
            <ul>
              {communities.map((community) => (
                <li key={community.id} onClick={() => handleCommunityClick(community)}>
                {community.creator_id === user.id && (
                <button onClick={(event) => handleDeleteCommunity(event,community.id)}>Delete Community</button>
                )}
                  {community.name}
                  {userCommunities.some((c) => c.id === community.id) ? (
                    <button onClick={(event) => handleLeaveCommunity(event, community.id)}>Leave</button>                  ) : (
                    <button onClick={() => handleJoinCommunity(community.id)}>Join</button>
                  )}
                </li>
              ))}
            </ul>
            <div className="create-community">
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
            </div>
          </div>
          <div className="community-content">
            <div className="user-communities">
              <h3>My Communities</h3>
              <ul>
                {userCommunities.map((community) => (
                  <li key={community.id} onClick={() => handleCommunityClick(community)}>
                    {community.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CommunityPage;

