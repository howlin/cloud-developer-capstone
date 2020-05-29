import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/fontawesome-free-solid'
import { faStar as farStar } from '@fortawesome/fontawesome-free-regular'
import Rating from 'react-rating'
import { createRating, updateRating } from '../api/ratings-api'
import { useAuth0 } from "../react-auth0-spa"

import RingLoader from "react-spinners/RingLoader"

const CreateEdit = (props) => {
  const { getIdTokenClaims } = useAuth0()
  const history = useHistory();
  const ratingId = props.match.params.ratingId

  const isUpdating = !!ratingId

  const seed = props.getRating(ratingId) ?? { shop: '', rating: 0, review: '', file: ''}

  const [ state, setState ] = useState(seed)
  const [ isUploading, setIsUploading ] = useState( false )

  const handleReviewChange = ( e ) => {
    e.persist()
    setState(prev => ({...prev, review: e.target.value}))
  }

  const handleShopChange = ( e ) => {
    e.persist()
    setState( prev => ({ ...prev, shop: e.target.value}))
  }

  const handleFileChange = ( e ) => {
    const files = e.target.files

    if (!files) return

    setState(prev => ({...prev, file: files[0]}))
  }

  const callCreateAPI = async ( jwt ) => {
    try {
      await createRating(jwt, {
        shop: state.shop,
        rating: state.rating,
        review: state.review,
      }, state.file)
    }
    catch (e) {
      alert('Rating creation failed')
      console.log(e)
    }
  }

  const callUpdateAPI = async ( jwt ) => {
    try {
      await updateRating(jwt, ratingId, {
        shop: state.shop,
        rating: state.rating,
        review: state.review
      }, state.file)
    }
    catch (e) {
      alert('Rating update failed')
      console.log(e)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const jwt = await getIdTokenClaims()

    setIsUploading( true )

    if (isUpdating) {
      await callUpdateAPI( jwt )
    }else {
      await callCreateAPI( jwt )
    }
    
    setIsUploading( false )
    props.refresh()
    history.push('/')
  }

  return (
    <div className="create-form">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="form-element-label">
              <label>_Shop Name:</label>
            </div>
            <div className="form-element">
              <select value={state.shop} onChange={handleShopChange}>
                <option value=""></option>
                <option value="Carters">Carters</option>
                <option value="Blackfriars Coffee">Blackfriars Coffee</option>
                <option value="Gallweys Chocolate Cafe">Gallweys Chocolate Cafe</option>
                <option value="Costa">Costa</option>
                <option value="Starbucks">Starbucks</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label">
              <label>Ratings:</label>
            </div>
            <div className="form-element">
              <Rating 
                initialRating={state.rating}
                onChange={ value => setState(prev => ({ ...prev, rating: value })) }
                emptySymbol={<FontAwesomeIcon icon={farStar} />}
                fullSymbol={<FontAwesomeIcon icon={fasStar} />} />
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label">
              <label>Review:</label>
            </div>
            <div className="form-element">
              <textarea
                value={state.review}
                onChange={handleReviewChange}
                className="form-element-textarea">
              </textarea>
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label">
              <label>Select a photo:</label>
            </div>
            <div className="form-element">
              <input 
                type="file" 
                accept="image/*" 
                placeholder="Image to upload"
                onChange={handleFileChange}
              /> 
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label"></div>
            <div className="form-element">
              <input 
                type="submit" 
                value="Submit"
                disabled={isUploading} />
              <RingLoader
                size={15}
                loading={isUploading} />
              
            </div>
          </div>
        </form>
      </div>
  )
}

CreateEdit.propTypes = {
  getRating: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default CreateEdit