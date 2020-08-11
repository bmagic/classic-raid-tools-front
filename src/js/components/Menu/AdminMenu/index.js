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
    if (user === null) return null
    if (user && user.roles && !user.roles.includes('admin')) return null
    return (
      <div className='navbar-item has-dropdown is-hoverable'>
        <a className="navbar-link">
          Admin
        </a>
        <div className="navbar-dropdown">
          <Link to="/admin/users" className="navbar-item">Users</Link>
          <Link to="/admin/availabilities" className="navbar-item">Dispos</Link>

        </div>
      </div>
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
