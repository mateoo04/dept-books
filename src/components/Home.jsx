import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookmarkImg from '../assets/bookmark.svg';
import bookmarkFillImg from '../assets/bookmark-fill.svg';
import { useSavedBooks } from '../context/SavedBooksContext';

export default function Home() {
  const navigate = useNavigate();
  const { saveBook, removeBook, isBookSaved } = useSavedBooks();

  const [fetchedBooks, setFetchedBooks] = useState();
  const [limit, setLimit] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    if (isLoading) return;
    else setIsLoading(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/api/books?limit=' + limit,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setIsLoading(false);

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
      <form
        className='pb-3'
        onSubmit={(event) => {
          event.preventDefault();
          fetchBooks();
        }}
      >
        <div className='d-flex flex-column pb-2 align-items-center justify-content-center'>
          <label htmlFor='book-limit' className='form-label'>
            Book quantity: <span className='text-body-secondary'>{limit}</span>
          </label>
          <input
            type='range'
            className='form-range'
            min='1'
            max='3'
            id='book-limit'
            onChange={(event) => setLimit(event.target.value)}
          ></input>
        </div>
        <div className='d-flex justify-content-center pt-1'>
          <input
            type='submit'
            name='refresh-btn'
            id='refresh-btn'
            value='Load books'
            className='btn bg-primary text-white ps-5 pe-5 rounded-5'
          />
        </div>
      </form>
      {!isLoading && fetchedBooks?.length ? (
        fetchedBooks.map((book) => {
          return (
            <div key={book.title} className='book'>
              <div className='book-details'>
                <p className='book-title'>{book.title}</p>
                <p>{book.author}</p>
              </div>
              {isBookSaved(book) ? (
                <button className='btn' onClick={() => removeBook(book)}>
                  <img src={bookmarkFillImg} alt='' />
                </button>
              ) : (
                <button className='btn' onClick={() => saveBook(book)}>
                  <img src={bookmarkImg} alt='' />
                </button>
              )}
            </div>
          );
        })
      ) : (
        <div className='loader-container'>
          <span className='loader'></span>
        </div>
      )}
    </main>
  );
}
