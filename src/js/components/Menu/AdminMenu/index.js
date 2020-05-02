import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class AdminMenu extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER' })
  }

  render () {
    const { user } = this.props
    if (user.roles && !user.roles.includes('admin')) return null
    return (
      <Link to="/admin/users" className="navbar-item">Admin</Link>
    )
  }
}
AdminMenu.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(AdminMenu)
