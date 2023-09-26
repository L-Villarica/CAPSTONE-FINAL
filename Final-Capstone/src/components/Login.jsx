import { useState } from 'react';

const BASE_URL = 'https://fakestoreapi.com/auth/login';

export default function Login({ token }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json));

      // const result = await response.json();
      // console.log(result)
    } catch (err) {
      console.error('Login error:', err);
    }
  }

  return (
    <div className='signUp-body'>
      <form className='login' onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Username'
          required
        />
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
          required
        />
      </form>
      <div className='login-button-wrapper'>
        <button type='submit'>Login</button>
      </div>

      <div className='Profile-Container'></div>
    </div>
  );
}
