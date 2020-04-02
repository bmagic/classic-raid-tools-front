import React from 'react'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Error from '../../components/Error'

class AuthRedirect extends React.Component {
  componentDidMount () {
    const code = new URLSearchParams(this.props.location.search).get('code')
    this.props.dispatch({ type: 'GET_TOKEN', code: code, service: this.props.service })
  }

  render () {
    const { token, history } = this.props
    if (token) {
      history.push('/')
    }
    return <Error />
  }
}
AuthRedirect.propTypes = {
  component: PropTypes.any,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  token: PropTypes.string,
  service: PropTypes.service,
  history: PropTypes.object
}

function mapStateToProps (state) {
  return {
    token: state.token
  }
}

export default withRouter(connect(mapStateToProps)(AuthRedirect))
