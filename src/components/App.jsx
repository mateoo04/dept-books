import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './LogIn';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
