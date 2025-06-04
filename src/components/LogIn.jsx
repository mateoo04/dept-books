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
      setFailureMessage('Incorrect email or password');
    }
  };

  return (
    <main>
      <h1 className='login-h1 text-center'>books</h1>
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
          className='btn bg-primary text-white rounded-5 ps-4 pe-4'
        />
      </form>
    </main>
  );
}
