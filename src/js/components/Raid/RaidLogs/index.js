import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CharactersRegistrationLogs from '../CharactersRegistrationLogs'

class RaidLogs extends React.Component {


  render () {
    const { raid } = this.props
    if (raid === null) {
      return <div>Chargement en cours...</div>
    }
    return (
      <div>
        <CharactersRegistrationLogs raidId={raid._id} />
      </div>
    )
  }
}

RaidLogs.propTypes = {
  raid: PropTypes.object
}

function mapStateToProps (state) {
  return {
    raid: state.raid
  }
}
export default connect(mapStateToProps)(RaidLogs)
