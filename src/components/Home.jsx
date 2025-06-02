import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookmarkImg from '../assets/bookmark.svg';
import bookmarkFillImg from '../assets/bookmark-fill.svg';

export default function Home() {
  const navigate = useNavigate();

  const [fetchedBooks, setFetchedBooks] = useState();

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/api/books',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        setFetchedBooks(json.data);
      } else if (response.status === 401) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main>
      {fetchedBooks?.length
        ? fetchedBooks.map((book) => {
            return (
              <div>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <button>
                  <img src={bookmarkImg} alt='' />
                </button>
              </div>
            );
          })
        : 'Loading...'}
    </main>
  );
}
