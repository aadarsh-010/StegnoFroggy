import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/search.css'; // Create this file for styling

export default function SearchBar({ onSelectUser }) {
    
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        try {
          const response = await axios.get('http://localhost:5000/search', {
            params: { nickname: query },
          });
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
          if (error.response) {
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('Request was made but no response received:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
        }
      } else {
        setResults([]);
      }
    };
  
    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 300);
  
    return () => clearTimeout(timeoutId);
  }, [query]);
  

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name"
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((user) => (
            <li key={user._id}  onClick={() => onSelectUser(user._id)}>
              {user.name}  {user.username}
            </li>
          ))}
        </ul>
      )}
      {/* {selectedUserId && <p>Selected User ID: {selectedUserId}</p>} */}
    </div>
  );
}
