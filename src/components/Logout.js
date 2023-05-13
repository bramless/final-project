import React, { useState } from 'react';
import axios from 'axios';

function Logout() {
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios({
        method: 'post',
        url: 'https://api-bootcamp.do.dibimbing.id/api/v1/logout',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setMessage(response.data.message);
        localStorage.removeItem('token');
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
      <p>{message}</p>
    </div>
  );
}

export default Logout;
