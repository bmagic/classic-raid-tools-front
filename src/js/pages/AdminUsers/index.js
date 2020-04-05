import React from 'react'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import OAuthStatusButton from '../../components/OAuthStatusButton'
import UserBox from '../../components/UserBox'

class AdminUsers extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USERS' })
  }

  render () {
    const { users } = this.props
    if (users === null) return <div>Loading</div>
    return (
      <Layout>
        <h1 className='title'>Users</h1>.
        {users.map((user) => {
          return <UserBox key={user._id} id={user._id} email={user.email} roles={user.roles} characters={user.characters} />
        })}
      </Layout>
    )
  }
}

AdminUsers.propTypes = {
  dispatch: PropTypes.func,
  users: PropTypes.array
}

function mapStateToProps (state) {
  return {
    users: state.users
  }
}
export default connect(mapStateToProps)(AdminUsers)
