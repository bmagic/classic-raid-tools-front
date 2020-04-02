import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Login from '../../pages/Login'

class PrivateRoute extends React.Component {
  render () {
    const { user, token, component: Component, ...rest } = this.props

    if (user === null) {
      if (token) {
        return <div>Chargement en cours</div>
      } else {
        return <Login />
      }
    }

    if (user) {
      return (
        <Route {...rest} render={
          (props) => {
            return <Component {...props} />
          }
        }/>
      )
    }
  }
}

PrivateRoute.propTypes = {
  dispatch: PropTypes.func,
  component: PropTypes.any,
  token: PropTypes.string,
  user: PropTypes.object,
  permission: PropTypes.array
}

function mapStateToProps (state) {
  return {
    user: state.user,
    token: state.token
  }
}

export default connect(mapStateToProps)(PrivateRoute)
