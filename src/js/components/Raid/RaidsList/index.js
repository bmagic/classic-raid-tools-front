import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

class RaidsList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_RAIDS' })
  }

  render () {
    const { raids } = this.props

    return (
      <div className='raids-list content'>
        <h1 className='title'>Raids</h1>
        <ul>
          {raids.map((raid) => {
            return <li key={raid._id}><Link to={`/raid/${raid._id}`}><a>{raid.instance.toUpperCase()} du {moment(raid.date).format('DD/MM/YYYY')}</a></Link></li>
          })}
        </ul>
      </div>

    )
  }
}

RaidsList.propTypes = {
  dispatch: PropTypes.func,
  raids: PropTypes.array
}

function mapStateToProps (state) {
  return {
    raids: state.raids
  }
}
export default connect(mapStateToProps)(RaidsList)
