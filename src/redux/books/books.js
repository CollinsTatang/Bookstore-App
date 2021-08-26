import {
  getBooks, createBook, deleteBook,
} from '../../api';

const ADD_BOOK = 'bookStore/books/ADD_BOOK';
const REMOVE_BOOK = 'bookStore/books/REMOVE_BOOK';

const initialState = [];

export const addBook = (payload) => ({
  type: ADD_BOOK,
  payload,
});

export const removeBook = (payload) => ({
  type: REMOVE_BOOK,
  payload,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.payload];
    case REMOVE_BOOK:
      return state.filter((book) => book.id !== action.payload.id);
    default:
      return state;
  }
};

export const fetchBooks = async (dispatch) => {
  let books = await getBooks();
  if (books.trim().length > 0) {
    books = JSON.parse(books);
    Object.keys(books).forEach((book) => {
      dispatch(addBook({
        id: book,
        title: books[book][0].title.split('&|&|&')[0],
        author: books[book][0].title.split('&|&|&')[1],
        category: books[book][0].category,
      }));
    });
  }
};

export const addBookToStore = (book) => async function addBookThunk(dispatch) {
  await createBook(book);
  dispatch(addBook(book));
};

export const removeBookFromStore = (book) => async function removeBookThunkj(dispatch) {
  await deleteBook(book);
  dispatch(removeBook(book));
};

export const allBooks = (state) => state.booksReducer;
export default reducer;
