import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const LogoutButton = ({ dispatch, history }) => {
  return (
    <div className='button' onClick={() => {
      dispatch({ type: 'LOGOUT' })
      history.push('/')
    }}>
    Déconnexion
    </div>
  )
}
LogoutButton.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object
}

export default withRouter(connect()(LogoutButton))
