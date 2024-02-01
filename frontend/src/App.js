import React, {useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
      fetch('/api/hello')
          .then(response => response.json())
          .then(data => setMessage(data.message));
  }, []);

  return (
      <div className="App">
          <header className="App-header">
              <p>{message}</p>
          </header>
      </div>
  );
}

export default App;
