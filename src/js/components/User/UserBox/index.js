import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowClassImage from '../../Common/WowClassImage'

import './styles.scss'

class UserBox extends React.Component {
  constructor (props) {
    super(props)

    this.onRoleClick = this.onRoleClick.bind(this)
  }



  render () {
    const { username, roles, email, user, id, characters } = this.props
    return (
      <div className='user-box box'>
        <article className="media">
          <div className="media-left">
            {username} {email}
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                {characters.map((character) => {
                  return (
                    <span className='character' key={character._id}>
                      <span className='icon '><WowClassImage keySpec={character.spec} keyClass={character.class}/></span>
                      {character.name}
                    </span>
                  )
                })}
              </p>
            </div>
            <nav className="level is-mobile">
              <div className='level-left'>
                <div className='level-item'>
                  <label className="checkbox">
                    <input type="checkbox" checked={roles.includes('admin')} disabled={user._id === id} onClick={() => this.onRoleClick('admin')}/>
                  Admin
                  </label>
                </div>
                <div className='level-item'>
                  <label className="checkbox">
                    <input type="checkbox" checked={roles.includes('member')} onClick={() => this.onRoleClick('member')}/>
                  Member
                  </label>
                </div>
                <div className='level-item'>
                  <label className="checkbox">
                    <input type="checkbox" checked={roles.includes('modify_raid')} onClick={() => this.onRoleClick('modify_raid')}/>
                  Modify Raid
                  </label>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    )
  }
}
UserBox.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.string,
  roles: PropTypes.string,
  email: PropTypes.string,
  characters: PropTypes.array,
  user: PropTypes.object,
  username: PropTypes.string
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(UserBox)
