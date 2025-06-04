import bookmarkFillImg from '../assets/bookmark-fill.svg';
import { useSavedBooks } from '../context/SavedBooksContext';

export default function Library() {
  const { savedBooks, removeBook } = useSavedBooks();

  return (
    <main>
      {savedBooks?.length ? (
        savedBooks.map((book) => {
          return (
            <div key={book.title} className='book'>
              <div className='book-details'>
                <p className='book-title'>{book.title}</p>
                <p>{book.author}</p>
              </div>
              <button className='btn ps-2' onClick={() => removeBook(book)}>
                <img src={bookmarkFillImg} alt='' />
              </button>
            </div>
          );
        })
      ) : (
        <p className='text-center info-msg'>Saved books will appear here!</p>
      )}
    </main>
  );
}
