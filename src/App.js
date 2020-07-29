import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import UserCreate from './users/UserCreate';
import UserEdit from './users/UserEdit';
import UserShow from './users/UserShow';
import UserIndex from './users/UserIndex';
import UserPasswordReset from './users/UserPasswordReset';
import Login from './Login';
import './index.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={UserCreate} /> 
          <Route exact path='/users' component={UserIndex} />
          <Route path='/users/:email/edit' component={UserEdit} />
          <Route path='/users/:email/show' component={UserShow} />
          <Route path='/users/:email/password/edit' component={UserPasswordReset} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
