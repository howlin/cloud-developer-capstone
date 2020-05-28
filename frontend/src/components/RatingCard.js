import React from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from "../react-auth0-spa"

import { deleteRating } from '../api/ratings-api'

import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/fontawesome-free-solid'
import { faStar as farStar } from '@fortawesome/fontawesome-free-regular'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const RatingCard = (props) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0()
  const { rating } = props


  const handleDelete = async e => {
    const jwt = await getIdTokenClaims()

    try {
      await deleteRating(jwt, rating.ratingId)
    }
    catch (e) {
      alert('Rating creation failed')
    }
  }

  return (
    <div className="rating-card">
      <div className="rating-card-holder">
        <div className="rating-card-image">
          {rating.imageUrl 
            ? <img src={rating.imageUrl} alt="Rating"/> 
            : (<div className="rating-card-image-placeholder">
                <FontAwesomeIcon icon={faImage} className="image-placeholder"  />
              </div>)
          }
        </div>
        <div className="rating-card-content">
          <div className="rating-card-heading">
            <h2>{rating.shop}</h2>
            <Rating 
                initialRating={rating.rating}
                readonly={true}
                emptySymbol={<FontAwesomeIcon icon={farStar} />}
                fullSymbol={<FontAwesomeIcon icon={fasStar} />} />
          </div>
          <div className="rating-card-body"> 
            {rating.review}
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <div className="rating-card-admin">
            <button onClick={handleDelete}>Delete</button>
            <button>Update</button>
        </div>
      )}
    </div>
  )
}

RatingCard.propTypes = {
  rating: PropTypes.object.isRequired
}

export default RatingCard