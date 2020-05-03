import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import './styles.scss'

class CharactersRegistrationLogs extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_REGISTRATION_LOGS', raidId: this.props.raidId })
  }

  render () {
    const { registrationLogs } = this.props
    return (
      <div className='characters-registration-logs'>
        {registrationLogs.map((registrationLog) => {
          return (
            <div key={registrationLog._id}>
              <span className='has-text-weight-bold'>{moment(registrationLog.date).format('DD/MM/YYYY LTS')}:</span> {registrationLog.characterName} {registrationLog.status}  {registrationLog.favorite ? '(Favori)' : ''}
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
