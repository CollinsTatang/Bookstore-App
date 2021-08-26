import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as UUID } from 'uuid';
import { createApp } from '../../api';
import {
  allBooks, addBookToStore, removeBookFromStore, fetchBooks,
} from '../../redux/books/books';

export default function Books() {
  const dispatch = useDispatch();
  const books = useSelector(allBooks);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(async () => {
    await createApp();
    dispatch(fetchBooks);
  }, [createApp]);

  const setBookTitle = (e) => {
    setTitle(e.target.value);
  };

  const setBookAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const submitToBookStore = () => {
    const newBook = {
      id: UUID(),
      title,
      author,
      category: '',
    };
    dispatch(addBookToStore(newBook));
    const clearTitle = document.getElementById('clear-title');
    clearTitle.value = '';
    const clearAuthor = document.getElementById('clear-author');
    clearAuthor.value = '';
  };

  const deleteBookFromStore = (e) => {
    dispatch(removeBookFromStore({ id: e.target.id }));
  };

  return (
    <div className="app-container">
      <div>
        <div>
          { books.map((book) => (
            <div className="book-panel bg-white d-flex align-items-center justify-content-between" key={book.id}>
              <div className="d-inline-flex flex-column">
                <span className="book-genre">Genre</span>
                <span className="book-title">{book.title}</span>
                <span className="book-author">{book.author}</span>
                <span className="d-inline-block">
                  <button id={book.id} type="button" className="btn btn-link border-end book-link ps-0">Comments</button>
                  <button id={book.id} type="button" className="btn btn-link border-end book-link" onClick={deleteBookFromStore}>Remove</button>
                  <button id={book.id} type="button" className="btn btn-link book-link">Edit</button>
                </span>
              </div>

              <div className="d-flex">
                <div className="d-flex align-items-center border-end">
                  <div className="progress-oval d-inline-block" />
                  <span>
                    <div className="percent-complete">64%</div>
                    <div className="completed">Completed</div>
                  </span>
                </div>

                <div className="d-flex flex-column">
                  <div className="current-chapter">CURRENT CHAPTER</div>
                  <div className="current-lesson">Chapter 17</div>
                  <button type="button" className="btn btn-update">UPDATE PROGRESS</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className="add-book-form">
        <span className="add-new-book">ADD NEW BOOK</span>
        <input id="clear-title" placeholder="Book Title" onChange={setBookTitle} className="book-title-input" />
        <input id="clear-author" placeholder="Author" onChange={setBookAuthor} className="book-category-input" />
        <button type="button" className="btn add-book-button" onClick={submitToBookStore}>ADD BOOK</button>
      </form>
    </div>
  );
}
