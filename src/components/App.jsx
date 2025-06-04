import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './LogIn';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import { SavedBooksProvider } from '../context/SavedBooksContext';
import Library from './LIbrary';
import NotFound from './NotFound';

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
      { path: 'library', element: <Library /> },
      { path: '*', element: <NotFound /> },
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
