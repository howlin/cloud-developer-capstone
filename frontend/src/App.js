import React from 'react'
import NavBar from './components/NavBar'
import { useAuth0 } from './react-auth0-spa'
import './App.css'
import { Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import Create from './components/Create'

function App() {

  const { loading } = useAuth0()

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div className="app">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <main>
          <Switch>
            <Route path='/' exact />
            <PrivateRoute path='/create' component={Create} />
            <PrivateRoute path='/profile' component={Profile} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
