import React from 'react';

function HelpPage({ onClose }) {
    return (
        <div className="help-page">
            <div className="help-content">
                <h2>Help Section</h2>
                {/* Add helpful help section and FAQ content here */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default HelpPage;
