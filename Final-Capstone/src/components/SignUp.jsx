import React, { useState } from 'react';

const BASE_URL = 'https://fakestoreapi.com/users';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  // const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState('');
  // const [lat, setLat] = useState("");
  // const [long, setLong] = useState("");
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'John@gmail.com',
          username: 'johnd',
          password: 'm38rmF$',
          name: {
            firstname: 'John',
            lastname: 'Doe',
          },
          address: {
            city: 'kilcoole',
            street: '7835 new road',
            number: 3,
            zipcode: '12926-3874',
            geolocation: {
              lat: '-37.3159',
              long: '81.1496',
            },
          },
          phone: '1-570-236-7033',
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
      if (response.ok) {
        setSuccessMessage('Registration successful!');
      } else {
        setErrorMessage(response.error.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  }

  return (
    <>
      <div className='signUp-body'>
        <h2>Sign Up Here</h2>
        <form className='signUp' onSubmit={handleSubmit}>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
          {successMessage && (
            <div className='success-message'>{successMessage}</div>
          )}
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
            minLength='1'
            maxLength='15'
            required
          />
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            required
          />
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            minLength='1'
            maxLength='15'
            required
          />
          <label>Confirm Password:</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            minLength='1'
            maxLength='15'
            required
          />
          <label>First Name:</label>
          <input
            type='text'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder='Enter First Name'
          />
          <label>Last Name:</label>
          <input
            type='text'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder='Enter Last Name'
          />
          <label>City:</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter City'
          />
          <label>Street:</label>
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder='Enter Street'
          />
          {/* <label>Number:</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter Number"
        /> */}
          <label>Zipcode:</label>
          <input
            type='text'
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder='Enter Zipcode'
          />
          {/* <label>Latitude:</label>
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Enter Latitude"
        />
        <label>Longitude:</label>
        <input
          type="text"
          value={long}
          onChange={(e) => setLong(e.target.value)}
          placeholder="Enter Longitude"
        /> */}
          <label>Phone:</label>
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Enter Phone'
          />
        </form>
        <div className='signUp-button-wrapper'>
          <button type='submit'>Create</button>
        </div>
      </div>
    </>
  );
}
