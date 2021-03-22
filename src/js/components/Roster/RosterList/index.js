import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { wowClass } from '../../../lib/wow'
import WowClassImage from '../../Common/WowClassImage'

import './styles.scss'
import { Link } from 'react-router-dom'

class RosterList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_ROSTER', main: this.props.main, roles: this.props.roles })
  }

  render () {
    const classes = Object.keys(wowClass)
    const { roster, main, roles } = this.props
    let count = 0
    const roleCount = { tank: 0, heal: 0, dd: 0, cac: 0 }
    const classCount = { druid: 0, hunt: 0, mage: 0, priest: 0, rogue: 0, shaman: 0, warlock: 0, warrior: 0 }
    for (const character of roster) {
      count++
      roleCount[character.spec]++
      classCount[character.class]++
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
                    if (character.class === wClass) {
                      return <div className='level' title={character.username} key={character._id}>
                        <div className='level-left'>
                          <Link to={`/character/${character.name}`}><div className='level-item'><figure className='image is-24x24'><WowClassImage keyClass={character.class} keySpec={character.spec}/></figure>&nbsp;{character.name}</div></Link>
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
        {main === true && roles.includes('member') && <div>
          <hr/>
          <div className='columns is-multiline'>
            <div className='column is-4 has-text-centered'>
              <h2 className='subtitle'>Tank: {roleCount.tank}/4</h2>
              <span>{(roleCount.tank / 4 * 100).toFixed(0)}%</span>
              <progress className={`progress ${roleCount.tank / 4 < 0.5 ? 'is-danger' : roleCount.tank / 4 < 0.7 ? 'is-warning' : 'is-success'}`} value={roleCount.tank} max={4}/>
            </div>
            <div className='column is-4 has-text-centered'>
              <h2 className='subtitle'>Heal: {roleCount.heal}/12</h2>
              <span>{(roleCount.heal / 12 * 100).toFixed(0)}%</span>
              <progress className={`progress ${roleCount.heal / 12 < 0.5 ? 'is-danger' : roleCount.heal / 12 < 0.7 ? 'is-warning' : 'is-success'}`} value={roleCount.heal} max={12}/>
            </div>
            <div className='column is-4 has-text-centered'>
              <h2 className='subtitle'>Dps: {roleCount.dd + roleCount.cac}/24</h2>
              <span>{((roleCount.dd + roleCount.cac) / 24 * 100).toFixed(0)}%</span>
              <progress className={`progress ${(roleCount.dd + roleCount.cac) / 24 < 0.5 ? 'is-danger' : (roleCount.dd + roleCount.cac) / 24 < 0.7 ? 'is-warning' : 'is-success'}`} value={roleCount.dd + roleCount.cac} max={24}/>
            </div>
          </div>
        </div>}
      </div>

    )
  }
}
RosterList.propTypes = {
  dispatch: PropTypes.func,
  main: PropTypes.bool,
  roster: PropTypes.array,
  roles: PropTypes.array
}

function mapStateToProps (state) {
  return {
    roster: state.roster
  }
}
export default connect(mapStateToProps)(RosterList)
