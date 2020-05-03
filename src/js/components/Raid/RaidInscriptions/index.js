import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CharactersRegistrationList from '../CharactersRegistrationList'
import CharactersSubscribeForm from '../CharactersRegistrationForm'
import CharactersRegistrationLogs from '../CharactersRegistrationLogs'

class RaidInscriptions extends React.Component {


  render () {
    const { raid } = this.props
    if (raid === null) {
      return <div>Chargement en cours...</div>
    }
    return (
      <div>
        <CharactersRegistrationList raidId={raid._id} />
        <CharactersRegistrationLogs raidId={raid._id} />



      </div>
    )
  }
}

RaidInscriptions.propTypes = {
  raid: PropTypes.object
}

function mapStateToProps (state) {
  return {
    raid: state.raid
  }
}
export default connect(mapStateToProps)(RaidInscriptions)
