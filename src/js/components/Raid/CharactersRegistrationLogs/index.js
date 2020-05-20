import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import './styles.scss'

class CharactersRegistrationLogs extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_REGISTRATION_LOGS', raidId: this.props.raidId })
  }

  generateStatus (status) {
    switch (status) {
      case 'ok':
        return <i className="fas has-text-success fa-check"/>
      case 'late':
        return <i className="fas has-text-warning fa-clock"/>
      case 'ko':
        return <i className="fas has-text-danger fa-times"/>
      case 'bench': {
        return <i className="fas has-text-warning fa-umbrella-beach"/>
      }
    }
  }

  render () {
    const { registrationLogs } = this.props
    return (
      <div className='characters-registration-logs'>
        {registrationLogs.map((registrationLog) => {
          return (
            <div key={registrationLog._id}>
              <span className='has-text-weight-bold'>{moment(registrationLog.date).format('DD/MM/YYYY LTS')}: </span>Personnage {registrationLog.characterName} {this.generateStatus(registrationLog.status)} {registrationLog.favorite ? <i className='fas fa-star'/> : ''} {registrationLog.validated ? '(Validé)' : ''}
              &nbsp;{registrationLog.userId && <span>par {registrationLog.userId.username}</span>}
            </div>
          )
        })}
      </div>
    )
  }
}
CharactersRegistrationLogs.propTypes = {
  dispatch: PropTypes.func,
  raidId: PropTypes.string,
  registrationLogs: PropTypes.array
}

function mapStateToProps (state) {
  return {
    registrationLogs: state.registrationLogs
  }
}
export default connect(mapStateToProps)(CharactersRegistrationLogs)
