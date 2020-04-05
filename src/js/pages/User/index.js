import React from 'react'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import OAuthStatusButton from '../../components/OAuthStatusButton'

class User extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER' })
  }

  render () {
    const { user } = this.props
    if (user === null) return <div>Loading</div>
    return (
      <Layout>
        <h1 className='title'>Profile</h1>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              Email: {user.email}
            </div>
          </div>
        </div>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              Roles: {user.roles.join(', ')}
            </div>
          </div>
        </div>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <OAuthStatusButton service='discord' id={user.discordId} />
            </div>
            <div className='level-item'>
              <OAuthStatusButton service='github' id={user.githubId} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

User.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(User)
