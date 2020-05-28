import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import { useAuth0 } from './react-auth0-spa'
import './App.css'
import { Router, Switch } from 'react-router-dom'
import history from './utils/history'
import { getRatings } from './api/ratings-api'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import Create from './components/Create'
import RatingList from './components/RatingsList'

function App() {
  const [ ratings, setRatings ] = useState([])
  const { loading, getIdTokenClaims } = useAuth0()

  useEffect(() => {
    const fetch = async e => {
      const jwt = await getIdTokenClaims()
      const results = await getRatings(jwt) ?? []
      setRatings(results)
    }

    if (!loading) {
      fetch()
    }
  }, [loading, getIdTokenClaims])

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
            <PrivateRoute path='/' ratings={ratings} component={RatingList} exact />
            <PrivateRoute path='/create' setRatings={setRatings} component={Create} exact />
            <PrivateRoute path='/profile' component={Profile} exact />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App
