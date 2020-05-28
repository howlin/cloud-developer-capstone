import React, { useState } from 'react'
import NavBar from './components/NavBar'
import { useAuth0 } from './react-auth0-spa'
import './App.css'
import { Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import Create from './components/Create'
import RatingList from './components/RatingsList'

function App() {
  const [ ratings, setRatings ] = useState([
    {"userId":"google-oauth2|110745163924940519072","ratingId":"d1b5e1c2-0d48-4d6f-b484-5c82b962db5d","createdAt":"2020-05-28T09:28:34.163Z","shop":"Carters","rating":5,"review":"test"},
    {"userId":"google-oauth2|110745163924940519072","ratingId":"d1b5e1c2-0d48-4d6f-b484-5c82b962db5de","createdAt":"2020-05-28T09:28:34.163Z","shop":"Carters","rating":5,"review":"test"}
  ])
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
            <Route path='/' render={(props) => <RatingList {...props} ratings={ratings} />} exact />
            <PrivateRoute path='/create' setRatings={setRatings} component={Create} exact />
            <PrivateRoute path='/profile' component={Profile} exact />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App
