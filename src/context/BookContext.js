// context/BookContext.js
import React, { createContext, useState } from "react";

// Create a context for the book data
export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]); // List of all available books
  const [borrowedBooks, setBorrowedBooks] = useState([]); // List of borrowed books

  return (
    <BookContext.Provider
      value={{ books, setBooks, borrowedBooks, setBorrowedBooks }}
    >
      {children}
    </BookContext.Provider>
  );
};
