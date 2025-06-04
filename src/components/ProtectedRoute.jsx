import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import logOutImg from '../assets/log-out.svg';
import logOutLightImg from '../assets/log-out-light.svg';
import moonImg from '../assets/moon-fill.svg';
import sunImg from '../assets/sun-fill.svg';
import { useTheme } from '../context/ThemeContext';

export default function ProtectedRoute() {
  const { theme, toggleTheme } = useTheme();

  const location = useLocation().pathname;
  const navigate = useNavigate();

  if (
    !localStorage.getItem('token') ||
    !localStorage.getItem('token_exp') ||
    Math.floor(Date.now() / 1000) > localStorage.getItem('token_exp')
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('token_exp');
    localStorage.removeItem('savedBooks');
    return <Navigate to={'/login'} replace />;
  }

  return (
    <>
      <header className='d-flex justify-content-between align-items-center mt-2 p-1'>
        <Link to={'/'} className='text-decoration-none'>
          <h1>Bookly</h1>
        </Link>
        <nav className='d-flex gap-3'>
          <Link
            className={`link ${
              location === '/'
                ? 'text-decoration-underline'
                : 'text-decoration-none'
            }`}
            to={'/'}
          >
            Home
          </Link>
          <Link
            className={`na link ${
              location === '/library'
                ? 'text-decoration-underline'
                : 'text-decoration-none'
            }`}
            to={'/library'}
          >
            Library
          </Link>
          <button
            className='log-out-btn btn p-0'
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to log out? Your saved books will be cleared.'
                )
              ) {
                localStorage.removeItem('token');
                localStorage.removeItem('token_exp');
                localStorage.removeItem('savedBooks');
                navigate('/login');
              }
            }}
          >
            <img src={theme === 'dark' ? logOutLightImg : logOutImg} alt='' />
          </button>
          <button className='btn p-0' onClick={toggleTheme}>
            {theme === 'light' ? (
              <img src={sunImg} alt='' />
            ) : (
              <img src={moonImg} alt='' />
            )}
          </button>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
