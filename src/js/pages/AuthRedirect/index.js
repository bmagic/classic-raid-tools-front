import React from 'react'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Error from '../../components/Common/Error'

class AuthRedirect extends React.Component {
  componentDidMount () {
    const code = new URLSearchParams(this.props.location.search).get('code')
    this.props.dispatch({ type: 'LOGIN', code: code })
  }

  render () {
    const { user, history } = this.props
    if (user) {
      history.push('/')
    }
    return <div>Loading...<Error /></div>
  }
}
AuthRedirect.propTypes = {
  component: PropTypes.any,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(AuthRedirect))
