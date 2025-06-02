import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './LogIn';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import { SavedBooksProvider } from '../context/SavedBooksContext';

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
  return (
    <SavedBooksProvider>
      <RouterProvider router={router} />
    </SavedBooksProvider>
  );
}

export default App;
