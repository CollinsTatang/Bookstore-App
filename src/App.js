import
{
  BrowserRouter as Router, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import Books from './components/books/Books';
import Categories from './components/categories/Categories';

function App() {
  return (
    <div className="App">
      <h1>BookStore CMS</h1>
      <Router>
        <Link to="/books">Books</Link>
        <Link to="/categories">Categories</Link>
        <Switch>
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Redirect from="/" to="/books" />
        </Switch>
      </Router>
    </div>
  );
}

export default (App);
