import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllUsers() {
  const baseUrl = 'https://api-bootcamp.do.dibimbing.id';
  const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';
  const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5b0BnbWFpbC5jb20iLCJ1c2VySWQiOiI4ZDE1MGIwOC02ZDg0LTRlMjAtODUyYy03NTc2Mzk4OWE3NGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODMxOTEyMzB9.N6x9qaAMCCBjWrrgfABkCgL_IrCL2W-DijdZ5GqPUSw';

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/all-user`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        apiKey: apiKey,
      },
    })
      .then(response => {
        console.log(response.data);
        setUsers(response.data.data);
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('Failed to fetch user data.');
      });
  }, []);

  useEffect(() => {
    const filteredResults = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  }, [users, searchTerm]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="allUsersContainer">
      <h2>All Users</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="searchContainer">
        <label htmlFor="search">Search :</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="userTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(data => (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;


