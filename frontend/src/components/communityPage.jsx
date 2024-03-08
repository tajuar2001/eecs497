import React, { useState } from 'react';
import './css/communityPage.css'; // Assuming you have a separate CSS file for CommunityPage styles

function CommunityPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="community-page">
      <div className="navbar">
        <div className="menu">
          <button className="menu-button" onClick={toggleMenu}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png" alt="Menu" style={{ width: '20px', height: '20px' }} />
          </button>
          {menuOpen && (
            <div className="menu-content">
              {/* Add your menu items here */}
              <p>Menu Item 1</p>
              <p>Menu Item 2</p>
              <p>Menu Item 3</p>
            </div>
          )}
        </div>
        <div className="buttons">
          <div className="button unread" onClick={() => console.log('Unread')}>
            Unread
          </div>
          <div className="button hot" onClick={() => console.log('Hot')}>
            Hot
          </div>
          <div className="button new" onClick={() => console.log('New')}>
            New
          </div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </div>
      <div className="content">
        <h2>Community Page</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        <p>Fusce ac nunc tincidunt, viverra felis sit amet, commodo libero. Nullam vitae elit eu ex pharetra efficitur nec vel urna. Ut et arcu fermentum, efficitur ex et, tincidunt arcu.</p>
        <img src="https://www.the-rampage.org/wp-content/uploads/2019/05/263480.jpg" alt="Community" style={{ maxHeight: '400px', width: 'auto' }} />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod felis eget sapien scelerisque, id scelerisque justo vestibulum.</p>
        {/* Add more Lorem Ipsum content here */}
      </div>
      <button className="create-post">Create Post</button>
    </div>
  );
}

export default CommunityPage;
