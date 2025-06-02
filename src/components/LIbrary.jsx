import bookmarkFillImg from '../assets/bookmark-fill.svg';
import { useSavedBooks } from '../context/SavedBooksContext';

export default function Library() {
  const { savedBooks, removeBook } = useSavedBooks();

  return (
    <main>
      {savedBooks?.length
        ? savedBooks.map((book) => {
            return (
              <div key={book.title}>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <button onClick={() => removeBook(book)}>
                  <img src={bookmarkFillImg} alt='' />
                </button>
              </div>
            );
          })
        : 'Saved books will appear here!'}
    </main>
  );
}
