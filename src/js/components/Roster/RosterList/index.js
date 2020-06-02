import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { wowClass } from '../../../lib/wow'
import WowClassImage from '../../Common/WowClassImage'

import './styles.scss'

class RosterList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_ROSTER' })
  }

  render () {
    const classes = Object.keys(wowClass)
    const { roster, main } = this.props
    let count = 0
    const roleCount = { tank: 0, heal: 0, dd: 0, cac: 0 }
    const classCount = { druid: 0, hunt: 0, mage: 0, priest: 0, rogue: 0, shaman: 0, warlock: 0, warrior: 0 }
    for (const index in roster) {
      const character = roster[index]
      if (character.main === main) {
        count++
        roleCount[character.spec]++
        classCount[character.class]++
      }
    }
    return (
      <div className='roster-list'>
        <h2 className='title'>{count} {main ? 'Main' : 'Reroll'} </h2>
        <div className='columns is-multiline'>
          {classes.map((wClass, index) => {
            return (
              <div key={index} className='column is-3'>
                <div className='box'>
                  <span className='is-capitalized has-text-weight-bold'>{wClass} ({classCount[wClass]})</span>
                  {roster.sort().map((character) => {
                    if (character.main === main && character.class === wClass) {
                      return <div className='level' title={character.username} key={character._id}>
                        <div className='level-left'>
                          <div className='level-item'><figure className='image is-24x24'><WowClassImage keyClass={character.class} keySpec={character.spec}/></figure>&nbsp;{character.name}</div>
                        </div>
                      </div>
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <hr/>
        <div className='columns is-multiline'>
          <div className='column is-4 has-text-centered'>
            <h2 className='subtitle'>Tank: {roleCount.tank}/3</h2>
            <span>{(roleCount.tank / 3 * 100).toFixed(0)}%</span>
            <progress className={`progress ${roleCount.tank / 3 < 0.5 ? 'is-danger' : roleCount.tank / 3 < 0.7 ? 'is-warning' : 'is-success'}`} value={roleCount.tank} max={3}/>
          </div>
          <div className='column is-4 has-text-centered'>
            <h2 className='subtitle'>Heal: {roleCount.heal}/10</h2>
            <span>{(roleCount.heal / 10 * 100).toFixed(0)}%</span>
            <progress className={`progress ${roleCount.heal / 10 < 0.5 ? 'is-danger' : roleCount.heal / 10 < 0.7 ? 'is-warning' : 'is-success'}`} value={roleCount.heal} max={10}/>
          </div>
          <div className='column is-4 has-text-centered'>
            <h2 className='subtitle'>Dps: {roleCount.dd + roleCount.cac}/27</h2>
            <span>{((roleCount.dd + roleCount.cac) / 27 * 100).toFixed(0)}%</span>
            <progress className={`progress ${(roleCount.dd + roleCount.cac) / 27 < 0.5 ? 'is-danger' : (roleCount.dd + roleCount.cac) / 27 < 0.7 ? 'is-warning' : 'is-success'}`} value={roleCount.dd + roleCount.cac} max={27}/>
          </div>
        </div>
      </div>
    )
  }
}
RosterList.propTypes = {
  dispatch: PropTypes.func,
  main: PropTypes.bool,
  roster: PropTypes.array
}

function mapStateToProps (state) {
  return {
    roster: state.roster
  }
}
export default connect(mapStateToProps)(RosterList)
