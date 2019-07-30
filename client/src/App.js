import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Containers/Main/Main';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
     
    </div>
  );
}

export default App;

