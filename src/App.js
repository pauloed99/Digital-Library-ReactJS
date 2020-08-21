import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import UserCreate from './users/UserCreate';
import UserEdit from './users/UserEdit';
import UserShow from './users/UserShow';
import UserIndex from './users/UserIndex';
import UserPasswordReset from './users/UserPasswordReset';
import Login from './Login';
import BookCreate from './books/BookCreate';
import BookEdit from './books/BookEdit'
import BookImageEdit from './books/BookImageEdit';
import BookIndex from './books/BookIndex';
import BookShow from './books/BookShow';
import UserBooksIndex from './userBooks/UserBooksIndex';
import UserBooksShow from './userBooks/UserBooksShow';
import './index.css';
import Navbar from './bootstrap/components/Navbar';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={UserCreate} /> 
          <Route exact path='/users' component={UserIndex} />
          <Route path='/users/:email/edit' component={UserEdit} />
          <Route path='/users/:email/show' component={UserShow} />
          <Route path='/users/:email/password/edit' component={UserPasswordReset} />
          <Route exact path='/books' component={BookIndex} />
          <Route path='/books/create' component={BookCreate} />
          <Route path='/books/:id/image/edit' component={BookImageEdit} />
          <Route path='/books/:id/edit' component={BookEdit} />
          <Route exact path='/books/:id/show' component={BookShow} />
          <Route exact path='/userBooks' component={UserBooksIndex}/>
          <Route path='/userBooks/:id/show' component={UserBooksShow}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
