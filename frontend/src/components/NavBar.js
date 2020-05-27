import React from 'react'
import { useAuth0 } from '../react-auth0-spa'
import { Link } from 'react-router-dom'


const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <div className="nav">
      <div className="nav-menu-items">
        <Link to="/" className="nav-menu-item">Home</Link>
        <Link to="/create" className="nav-menu-item">Create Rating</Link>
        <Link to="/profile" className="nav-menu-item">Profile</Link>
      </div>
      <div className="nav-loginout">
        {!isAuthenticated && (
            <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}
        {isAuthenticated && 
            <div className="nav-loginout">
              <img src={user.picture} alt="Profile" />
              <span>Welcome {user.given_name}</span>
              <button onClick={() => logout()}>Log out</button>
            </div>}
      </div>
    </div>
  )
}

export default NavBar