import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/fontawesome-free-solid'
import { faStar as farStar } from '@fortawesome/fontawesome-free-regular'
import Rating from 'react-rating'

class Create extends Component {
  render() {
    return (
      <div className="create-form">
        
        <form>
          <div className="form-control">
            <div className="form-element-label">
              <label>Shop Name:</label>
            </div>
            <div className="form-element">
              <select>
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
                emptySymbol={<FontAwesomeIcon icon={farStar} />}
                fullSymbol={<FontAwesomeIcon icon={fasStar} />} />
            </div>
          </div>
          <div className="form-control">
            <div className="form-element-label">
              <label>Review:</label>
            </div>
            <div className="form-element">
              <textarea className="form-element-textarea"></textarea>
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
            <div className="form-element"></div>
          </div>
        </form>
      </div>
    )
  }
}

export default Create