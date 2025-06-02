import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'savedBooks';
const SavedBooksContext = createContext();

export function SavedBooksProvider({ children }) {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setSavedBooks(stored);
  }, []);

  const saveBook = (book) => {
    if (!isBookSaved(book)) {
      const updated = [...savedBooks, book];
      setSavedBooks(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const removeBook = (book) => {
    const updated = savedBooks.filter(
      (b) => !(b.title === book.title && b.author === book.author)
    );
    setSavedBooks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isBookSaved = (book) => {
    return savedBooks.some(
      (b) => b.title === book.title && b.author === book.author
    );
  };

  return (
    <SavedBooksContext.Provider
      value={{ savedBooks, saveBook, removeBook, isBookSaved }}
    >
      {children}
    </SavedBooksContext.Provider>
  );
}

export function useSavedBooks() {
  return useContext(SavedBooksContext);
}
