import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const baseUrl = 'https://api-bootcamp.do.dibimbing.id';
  const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';
  const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5b0BnbWFpbC5jb20iLCJ1c2VySWQiOiI4ZDE1MGIwOC02ZDg0LTRlMjAtODUyYy03NTc2Mzk4OWE3NGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODMxOTEyMzB9.N6x9qaAMCCBjWrrgfABkCgL_IrCL2W-DijdZ5GqPUSw';
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    role: 'user', // Default role is 'user'
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage('Password dan konfirmasi password harus sama.');
      return;
    }

    axios.post(`${baseUrl}/api/v1/register`, formValues, {
      headers: {
        Authorization: `Bearer ${Token}`,
        apiKey : apiKey
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('Gagal melakukan registrasi. Silakan coba lagi.');
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Nama</label>
          <input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formValues.email} onChange={handleInputChange} required />
        </div>
        <label htmlFor="role">Role</label>
          <select id="role" name="role" value={formValues.role} onChange={handleInputChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formValues.password} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Konfirmasi Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formValues.confirmPassword} onChange={handleInputChange} required />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

