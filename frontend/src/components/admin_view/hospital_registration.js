import React, { useState } from 'react';

const HospitalRegistration = () => {
  const [hospitalData, setHospitalData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    type: '',
  });

  const handleInputChange = (e) => {
    setHospitalData({
      ...hospitalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/admin-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hospitalData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response as needed
        // Optionally, you can navigate to a different page or show a success message
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Hospital Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={hospitalData.name} onChange={handleInputChange} required />

        <label>Address:</label>
        <input type="text" name="address" value={hospitalData.address} onChange={handleInputChange} required />

        <label>Phone Number:</label>
        <input type="text" name="phone" value={hospitalData.phone} onChange={handleInputChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={hospitalData.email} onChange={handleInputChange} required />
        
        <label>Username:</label>
        <input type="text" name="username" value={hospitalData.username} onChange={handleInputChange} required />

        <label>Password:</label>
        <input type="text" name="password" value={hospitalData.password} onChange={handleInputChange} required />

        <label>Hospital Type:</label>
        <select name="type" value={hospitalData.type} onChange={handleInputChange} required>
          <option value="">Select Hospital Type</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default HospitalRegistration;