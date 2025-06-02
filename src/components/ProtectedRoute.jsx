import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const location = useLocation().pathname;

  if (
    !localStorage.getItem('token') ||
    Math.floor(Date.now() / 1000) > localStorage.getItem('token_exp')
  ) {
    return <Navigate to={'/login'} replace />;
  }
  console.log(location);
  return (
    <>
      <header className='d-flex justify-content-between align-items-center p-1'>
        <h1>Books</h1>
        <div className='d-flex gap-3'>
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
            className={`link ${
              location === '/library'
                ? 'text-decoration-underline'
                : 'text-decoration-none'
            }`}
            to={'/library'}
          >
            Library
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}
