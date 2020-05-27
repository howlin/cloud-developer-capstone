import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/fontawesome-free-solid'
import { faStar as farStar } from '@fortawesome/fontawesome-free-regular'
import Rating from 'react-rating'

class Create extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      shop: '',
      rating: 0,
      review: '',
      photo: ''
    }
  }
  handleShopChange = ( e ) => {
    this.setState({shop: e.target.value})
  }
  handleReviewChange = ( e ) => {
    this.setState({review: e.target.value})
  }
  handleRatingChange = ( value ) => {
    this.setState({rating: value})
  }
  render() {
    return (
      <div className="create-form">
        
        <form>
          <div className="form-control">
            <div className="form-element-label">
              <label>Shop Name:</label>
            </div>
            <div className="form-element">
              <select value={this.state.shop} onChange={this.handleShopChange}>
                <option value=""></option>
                <option value="Carters">Carters</option>
                <option value="Blackfriars Coffee">Blackfriars Coffee</option>
                <option value="Gallweys Chocolate Cafe">Gallweys Chocolate Cafe</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label">
              <label>Ratings:</label>
            </div>
            <div className="form-element">
              <Rating 
                initialRating={this.state.rating}
                onChange={this.handleRatingChange}
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
                className="form-element-textarea"
                value={this.state.review} 
                onChange={this.handleReviewChange}>
              </textarea>
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label">
              <label>Select a photo:</label>
            </div>
            <div className="form-element">
              <input type="file" /> 
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label"></div>
            <div className="form-element">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Create