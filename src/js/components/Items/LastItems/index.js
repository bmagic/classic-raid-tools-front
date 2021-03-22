import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Item from '../../Common/Item'
import { Link } from 'react-router-dom'
import { tokens } from '../../../lib/wow'
import './styles.scss'

class LastItems extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_LAST_ITEMS' })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { lastItems } = this.props
    return (
      <div className='last-items '>
        {lastItems.map((lastItem) => {
          if (!lastItem.characterId) return null

          let isToken = false
          Object.keys(tokens).map((wid) => {
            if (tokens[wid].includes(lastItem.wid)) {
              isToken = true
            }
          })
          if (isToken === false) { return null }

          return <div key={lastItem._id}>
            <Item wid={lastItem.wid}/> par <Link to={`/character/${lastItem.characterId.name}`}><a>{lastItem.characterId.name}</a></Link>
          </div>
        })}
      </div>

    )
  }
}
LastItems.propTypes = {
  dispatch: PropTypes.func,
  lastItems: PropTypes.array
}

function mapStateToProps (state) {
  return {
    lastItems: state.lastItems
  }
}
export default connect(mapStateToProps)(LastItems)
