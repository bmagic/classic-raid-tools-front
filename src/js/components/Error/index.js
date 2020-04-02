import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Error = ({ errors, dispatch }) => {
  if (errors.length === 0) return null
  return (
    <div className='notification is-danger'>
      <button className="delete" onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}/>

      {errors.map((message, index) => {
        return <p key={`message-${index}`}>{message}</p>
      })}

    </div>
  )
}

Error.propTypes = {
  dispatch: PropTypes.func,
  errors: PropTypes.array
}

function mapStateToProps (state) {
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps)(Error)
