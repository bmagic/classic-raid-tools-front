import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../Common/Item'
import moment from 'moment'
import { enchantToSpell, wowClass } from '../../lib/wow'
import { Link } from 'react-router-dom'
import Spell from '../Common/Spell'
const queryString = require('query-string')

import './styles.scss'

class CharactersComparatorTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { spec: 'tank', wClass: '', tab: 'items' }
  }

  componentDidMount () {
    const hash = queryString.parse(location.hash)
    const wClass = hash.class || this.state.wClass
    const spec = hash.spec || this.state.spec
    const tab = hash.tab || this.state.tab

    this.setState({ spec: spec, wClass: wClass, tab: tab })
    this.props.dispatch({ type: 'GET_CHARACTERS_COMPARATOR_DATA', spec: spec, class: wClass })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const hash = queryString.stringify({ spec: this.state.spec, class: this.state.wClass, tab: this.state.tab })
    location.hash = hash
    if (prevState.wClass !== this.state.wClass || prevState.spec !== this.state.spec) {
      const { spec, wClass } = this.state
      this.props.dispatch({ type: 'GET_CHARACTERS_COMPARATOR_DATA', spec: spec, class: wClass })
    }
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { spec, wClass, tab } = this.state
    const { data } = this.props
    const itemSlots = [['Head'], ['Neck'], ['Shoulder'], ['Back'], ['Chest'], ['Wrist'], ['Hands'], ['Waist'], ['Legs'], ['Feet'], ['Finger'], ['Trinket'], ['Main Hand', 'One-Hand', 'Held In Off-hand', 'Two-Hand','Shield'], ['Ranged']]

    return (
      <div className='characters-comparator-table'>
        <div className='field  is-grouped'>
          <div className='control'>
            <div className="select">
              <select value={spec} onChange={(e) => { this.setState({ spec: e.target.value, wClass: '' }) }}>
                <option>tank</option>
                <option>heal</option>
                <option>dd</option>
                <option>cac</option>
              </select>
            </div>
          </div>
          <div className='control'>
            <div className="select">
              <select value={wClass} onChange={(e) => { this.setState({ wClass: e.target.value }) }}>
                <option></option>
                {Object.keys(wowClass).map((key, index) => {
                  if (wowClass[key][spec]) {
                    return (
                      <option key={index}>{key}</option>
                    )
                  } else {
                    return null
                  }
                })
                }
              </select>
            </div>
          </div>

        </div>
        <div className="tabs">
          <ul>
            <li className={`${tab === 'items' ? 'is-active' : ''}`}><a onClick={() => this.setState({ tab: 'items' })}>Objets</a></li>
            <li className={`${tab === 'enchants' ? 'is-active' : ''}`}><a onClick={() => this.setState({ tab: 'enchants' })}>Enchantements</a></li>

          </ul>
        </div>
        <div className="table-container">
          <table className='table is-fullwidth is-narrow'>
            <thead>
              <tr>
                <th>Slots</th>
                {Object.keys(data).map((key) => {
                  return (
                    <th key={`${key}-head`}><Link to={`/character/${key}`}>{key}</Link></th>
                  )
                })}
              </tr>
            </thead>

            <tbody>

              {itemSlots.map((slots, index) => {
                return (
                  <tr key={slots.join('-')}>
                    <td>{slots.includes('Main Hand') ? 'Weapons' : slots.join(', ')}</td>
                    {Object.keys(data).map((key) => {
                      return (
                        <td key={`${slots.join('-')}-${key}`}> {data[key].map((characterItem) => {
                          if (!slots.includes(characterItem.slot)) return null
                          if (this.state.displayAllItems || moment(characterItem.lastDate) > moment().subtract(15, 'days')) {
                            return (
                              <div key={characterItem._id}>
                                {tab === 'items' && <Item ench={characterItem.enchantId} wid={characterItem.wid}/>}
                                {characterItem.enchantId && tab === 'enchants' && <span title={characterItem.enchantId} className='enchant'><Item size='small' ench={characterItem.enchantId} wid={characterItem.wid}/><Spell wid={enchantToSpell[characterItem.enchantId] || characterItem.enchantId}/></span>}
                              </div>
                            )
                          }
                        })}
                        </td>
                      )
                    })}

                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
CharactersComparatorTable.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object
}

function mapStateToProps (state) {
  return {
    data: state.charactersComparatorData
  }
}
export default connect(mapStateToProps)(CharactersComparatorTable)
