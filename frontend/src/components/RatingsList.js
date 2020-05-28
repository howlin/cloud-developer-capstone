import React from 'react'
import PropTypes from 'prop-types'
import RatingCard from './RatingCard'

const RatingsList = (props) => {
  const { ratings } = props
  
  return (
    <div className="ratings-list">
      { ratings.map( rating => (
        <RatingCard key={rating.ratingId} rating={rating} />
      ))}
    </div>
  )
}

RatingsList.propTypes = {
  ratings: PropTypes.array.isRequired
}

export default RatingsList