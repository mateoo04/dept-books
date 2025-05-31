import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  if (
    !localStorage.getItem('token') ||
    Date.now() > localStorage.getItem('token_exp')
  ) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
