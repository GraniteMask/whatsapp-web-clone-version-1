import React, {useState} from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Components/Login';
import {useStateValue} from './Components/Stateprovider'

function App() {
  const [{user}, dispatch] = useStateValue()


  return (
    <div className="App">

      {!user ? (
        <Login />
      ):
      <div className="app_body">
      
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    
      
      }
      </div>
  );
}

export default App;
