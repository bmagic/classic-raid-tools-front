import React from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowClassImage from '../../components/Common/WowClassImage'

import './styles.scss'

class AdminUsers extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USERS' })
  }

  onRoleClick (id, roles, role) {
    if (roles.includes(role)) {
      roles = roles.filter(item => item !== role)
    } else {
      roles.push(role)
    }
    this.props.dispatch({ type: 'UPDATE_ROLES', roles: roles, id: id })
  }

  render () {
    const roles = ['admin', 'member', 'modify_raid']
    const { users } = this.props
    if (users === null) return <div>Loading</div>
    return (
      <Layout>
        <div className={'admin-users'}>
          <h1 className='title'>Users</h1>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Characters</th>
                {roles.map((role, index) => {
                  return (
                    <th key={index}>
                      {role}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.characters.map((character) => {
                        return (
                          <span className='character' key={character._id}>
                            <span className='icon '><WowClassImage keySpec={character.spec} keyClass={character.class}/></span>
                            {character.name}
                          </span>
                        )
                      })}
                    </td>

                    {roles.map((role, index) => {
                      return (
                        <td key={index}>
                          <label className="checkbox">
                            <input type="checkbox" checked={user.roles.includes(role)} onClick={() => this.onRoleClick(user._id, user.roles, role)}/>
                          </label>
                        </td>
                      )
                    })}

                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
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
