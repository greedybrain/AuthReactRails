import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './component/Home';
import Dashboard from './component/Dashboard';
import axios from 'axios'

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN')
  const [user, setUser] = useState({})

  const checkLoggedInStatus = () => {
    axios.get("http://localhost:3001/logged_in", {
      withCredentials: true
    }).then(
      response => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus('LOGGED_IN')
          setUser(response.data.user)
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus('NOT_LOGGED_IN')
          setUser({})
        }
      }
    ).catch(
      error => {
        console.log('logged in error: ', error)
      }
    )
  }

  useEffect(() => {
    checkLoggedInStatus()
  })

  const handleLogin = (data) => {
    setLoggedInStatus('LOGGED_IN')
    setUser(data)
  }

  const handleLogout = () => {
    axios.delete("http://localhost:3001/logout", {
      withCredentials: true
    }).then(
      setLoggedInStatus("NOT_LOGGED_IN"),
      setUser({})
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path={"/dashboard"} 
            render={props => (
              <Dashboard {...props} loggedInStatus={loggedInStatus} />
            )}
          />
          <Route
            path={"/"}
            render={props => (
              <Home {...props} handleLogout={handleLogout} handleLogin={handleLogin} loggedInStatus={loggedInStatus} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
