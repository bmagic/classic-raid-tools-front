import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MissingRegistrations extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_MISSING_REGISTRATIONS', raidId: this.props.raidId })
  }

  render () {
    const { missingRegistrations } = this.props

    if (missingRegistrations.length === 0) return null
    return (
      <div className='missing-registrations'>
        Inscriptions manquantes : {missingRegistrations.sort().join(', ')}
      </div>

    )
  }
}
MissingRegistrations.propTypes = {
  dispatch: PropTypes.func,
  raidId: PropTypes.string,
  missingRegistrations: PropTypes.array
}

function mapStateToProps (state) {
  return {
    missingRegistrations: state.missingRegistrations
  }
}
export default connect(mapStateToProps)(MissingRegistrations)
