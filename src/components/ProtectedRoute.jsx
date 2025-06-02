import { Link, Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  if (
    !localStorage.getItem('token') ||
    Math.floor(Date.now() / 1000) > localStorage.getItem('token_exp')
  ) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <>
      <header>
        <h1>Books</h1>
        <Link to={'/'}>Home</Link>
        <Link to={'/library'}>Library</Link>
      </header>
      <Outlet />
    </>
  );
}
