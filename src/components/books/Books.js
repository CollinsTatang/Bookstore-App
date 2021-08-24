import PropTypes from 'prop-types';
import Book from './BookAction';

const Books = ({ books }) => (
  <ul>{books.map((book) => <li key={book.title}><Book book={book} /></li>)}</ul>
);

Books.propTypes = {
  books: PropTypes.arrayOf(Book.propTypes.book).isRequired,
};

export default Books;
