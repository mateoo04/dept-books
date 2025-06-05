import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moonImg from '../assets/moon-fill.svg';
import sunImg from '../assets/sun-fill.svg';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

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
        setFailureMessage('Invalid email or password.');
      } else {
        setFailureMessage('');

        const json = await response.json();

        const payload = json.data.token.split('.')[1];
        const parsed = JSON.parse(atob(payload));

        localStorage.setItem('token', json.data.token);
        localStorage.setItem('token_exp', parsed.exp);

        navigate('/');
      }
    } catch {
      setFailureMessage('Server error. Please try again later.');
    }
  };

  return (
    <main>
      <header className='d-flex justify-content-between align-items-center pt-2 p-1'>
        <h1>Bookly</h1>
        <button className='btn p-0' onClick={toggleTheme}>
          {theme === 'light' ? (
            <img src={sunImg} alt='' />
          ) : (
            <img src={moonImg} alt='' />
          )}
        </button>
      </header>
      <p className='pt-4 text-center'>
        Discover random books, save your favorites and build your personal
        library.
      </p>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className='login-form d-flex flex-column justify-content-center align-items-center gap-2'
      >
        {failureMessage && (
          <p className='login-error rounded-5'>{failureMessage}</p>
        )}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control rounded-5'
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
            className='form-control rounded-5'
            required
          />
        </label>
        <input
          type='submit'
          value={'Log in'}
          className='btn rounded-5 mt-2 ps-4 pe-4'
        />
      </form>
    </main>
  );
}
