import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaidBox from '../RaidBox'

class NextRaidsList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_NEXT_RAIDS' })
  }

  render () {
    const { nextRaids } = this.props

    return (
      <div className='raids-list'>
        {nextRaids.map((raid) => {
          return (
            <RaidBox key={raid._id} raid={raid}/>
          )
        })}
      </div>

    )
  }
}

NextRaidsList.propTypes = {
  dispatch: PropTypes.func,
  nextRaids: PropTypes.array
}

function mapStateToProps (state) {
  return {
    nextRaids: state.nextRaids
  }
}
export default connect(mapStateToProps)(NextRaidsList)
