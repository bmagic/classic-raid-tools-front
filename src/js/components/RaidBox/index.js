import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowRaidImage from '../WowRaidImage'
import moment from 'moment'
import './styles.scss'
import { Link } from 'react-router-dom'

class RaidBox extends React.Component {
  render () {
    const { raid, user } = this.props
    return (
      <div className="raid-box box">
        <article className="media">
          <div className="media-left">
            <figure className="image">
              <WowRaidImage instance={raid.instance}/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong><span className='day'>{moment(raid.date).format('dddd')}</span>&nbsp;{moment(raid.date).format('DD MMMM à HH:mm')}</strong>
                <br/>
                {raid.description}
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                {user.roles.includes('member') &&
                  <Link to={`/raid/${raid._id}`}>
                    <a className="level-item" aria-label="reply">
                      <span className="icon is-small">
                        <i className="fas fa-eye" aria-hidden="true"/>
                      </span>&nbsp;&nbsp;Voir le raid
                    </a>
                  </Link>
                }
              </div>
            </nav>
          </div>
        </article>
      </div>
    )
  }
}

RaidBox.propTypes = {
  dispatch: PropTypes.func,
  raid: PropTypes.object,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(RaidBox)
