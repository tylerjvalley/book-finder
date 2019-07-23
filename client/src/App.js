import React from 'react';
import Main from './Containers/Main/Main';
import Login from './Components/Login/Login';
import SignIn from './Components/SignIn/SignIn';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
                
        <Route path="/" exact component={Main} />
        <Route path="/sign-in/" component={SignIn} />
        <Route path="/log-in/"  component={Login} />

      </Router>
      
    </div>
  );
}

export default App;

