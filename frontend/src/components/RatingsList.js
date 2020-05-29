import React from 'react'
import PropTypes from 'prop-types'
import RatingCard from './RatingCard'

const RatingsList = (props) => {
  const { ratings, refresh } = props
  
  return (
    <div className="ratings-list">
      { ratings.map( rating => (
        <RatingCard 
          key={rating.ratingId} 
          refresh={refresh}
          rating={rating} />
      ))}
    </div>
  )
}

RatingsList.propTypes = {
  ratings: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired
}

export default RatingsList