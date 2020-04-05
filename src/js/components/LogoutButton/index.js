import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const LogoutButton = ({ dispatch }) => {
  return (
    <div className='button' onClick={() => {
      dispatch({ type: 'DISCONNECT' })
    }}>
    Logout
    </div>
  )
}
LogoutButton.propTypes = {
  dispatch: PropTypes.func
}

export default withRouter(connect()(LogoutButton))
