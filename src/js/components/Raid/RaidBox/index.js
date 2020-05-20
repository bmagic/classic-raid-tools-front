import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowRaidImage from '../../Common/WowRaidImage'
import moment from 'moment'
import './styles.scss'
import { Link } from 'react-router-dom'
import PlayersCountProgressBar from '../PlayersCountProgressBar'
import CharactersRegistrationForm from '../CharactersRegistrationForm'

class RaidBox extends React.Component {
  render () {
    const { raid, user } = this.props
    return (
      <div className="raid-box box">
        <article className="media">
          <div className="media-left">

          </div>
          <div className="media-content">
            <div className='level'>
              <div className='level-left'>
                <div className='level-item logo'>
                  <div>
                    <figure className="image">
                      <WowRaidImage instance={raid.instance}/>
                    </figure>
                    <PlayersCountProgressBar instance={raid.instance} playersCount={raid.playersCount}/>
                  </div>
                </div>
                <div className='level-item'>
                  <div>
                    <div>{raid.title}</div>
                    <p className="content">
                      <strong><span className='day is-capitalized'>{moment(raid.date).format('dddd')}</span>&nbsp;{moment(raid.date).format('DD MMMM à HH:mm')}</strong>
                      <br/>
                      {raid.main && <span className="tag is-primary is-light">Raid principal</span>}
                      {!raid.registered && <span className="tag is-danger is-light">Aucun de tes personnages n'est inscrit pour ce raid</span>}
                    </p>

                    <nav className="level is-mobile">
                      <div className="level-left">
                        {(user.roles.includes('member') || user.roles.includes('guest')) &&
                  <Link to={`/raid/${raid._id}`}>
                    <a className="level-item" aria-label="reply">
                      <span className="icon is-small">
                        <i className="fas fa-eye" aria-hidden="true"/>
                      </span>&nbsp;&nbsp;Voir le raid
                    </a>
                  </Link>
                        }
                        {!(user.roles.includes('member') || user.roles.includes('guest')) && <span className='has-text-danger'>
                  Pour pouvoir accéder au raid, demandez les permissions sur discord
                        </span>}
                      </div>
                    </nav>
                  </div>
                </div>

              </div>
              <div className='level-right'>
                <div className='level-item'>
                  <CharactersRegistrationForm raidId={raid._id}/>
                </div>
              </div>
            </div>
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
