import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Login from '../../../pages/Login'

class PrivateRoute extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER' })
  }

  render () {
    const { user, token, dispatch, component: Component, roles, ...rest } = this.props

    if (user === null) {
      return <Login />
    } else {
      if (roles) {
        let access = false

        for (const index in user.roles) {
          const role = user.roles[index]
          if (roles.includes(role)) access = true
        }

        if (!access) {
          return <div>Access denied</div>
        }
      }

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
  roles: PropTypes.array
}

function mapStateToProps (state) {
  return {
    user: state.user,
    token: state.token
  }
}

export default connect(mapStateToProps)(PrivateRoute)
