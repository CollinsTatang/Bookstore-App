import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as UUID } from 'uuid';
import { addBook, allBooks, removeBook } from '../../redux/books/books';

export default function Books() {
  const dispatch = useDispatch();
  const books = useSelector(allBooks);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const setBookTitle = (e) => {
    setTitle(e.target.value);
  };

  const setBookAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const submitToBookStore = (event) => {
    event.preventDefault();
    const newBook = {
      id: UUID(),
      title,
      author,
    };
    dispatch(addBook(newBook));
    setTitle('');
    setAuthor('');
  };

  const deleteBookFromStore = (e) => {
    dispatch(removeBook({ id: e.target.id }));
  };

  return (
    <div>
      <h3>All Books</h3>
      <div>
        <ul>
          { books.map((book) => (
            <li key={book.id}>
              <span className="">{book.title}</span>
              <button id={book.id} type="button" onClick={deleteBookFromStore}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={submitToBookStore}>
        <h4>Add New Book</h4>
        <input placeholder="Title" value={title} required onChange={setBookTitle} />
        <br />
        <br />
        <input placeholder="Author" value={author} required onChange={setBookAuthor} />
        <br />
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
