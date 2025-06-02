import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        setFailureMessage('Invalid credentials entered');
      } else {
        setFailureMessage('');

        const json = await response.json();

        const payload = json.data.token.split('.')[1];
        const parsed = JSON.parse(atob(payload));

        localStorage.setItem('token', json.data.token);
        localStorage.setItem('token_exp', parsed.exp);

        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setFailureMessage('Failed to log in');
    }
  };

  return (
    <main>
      {failureMessage && <p>{failureMessage}</p>}
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <input type='submit' value={'Log in'} />
      </form>
    </main>
  );
}
