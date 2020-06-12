import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../../Common/Item'

import './styles.scss'

import { enchantsList } from '../../../lib/wow'

class DebriefEnchantsIssues extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
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

  generateStatus (wClass, spec, slots, enchantsDebrief) {
    return (
      <React.Fragment>
        {Object.keys(enchantsDebrief).map((slotKey) => {
          return (
            <React.Fragment key={slotKey}>
              {enchantsDebrief[slotKey].map((enchant) => {
                if (!slots.includes(enchant.slot)) return null
                if (enchantsList[wClass] && enchantsList[wClass][spec] && enchantsList[wClass][spec][enchant.slot.toLowerCase()]) {
                  if (enchantsList[wClass][spec][enchant.slot.toLowerCase()].length === 0) {
                    return (
                      <div key={enchant._id} className='has-background-success item-container'>
                        <Item size='small' ench={enchant.enchantId} wid={enchant.wid}/>
                      </div>
                    )
                  } else {
                    if (enchant.enchantId) {
                      if (enchantsList[wClass][spec][enchant.slot.toLowerCase()].includes(enchant.enchantId)) {
                        return (
                          <div key={enchant._id} className='has-background-success item-container'>
                            <Item size='small' ench={enchant.enchantId} wid={enchant.wid}/>
                          </div>
                        )
                      } else {
                        return (
                          <div key={enchant._id} className='has-background-warning item-container'>
                            <Item size='small' ench={enchant.enchantId} wid={enchant.wid}/>
                          </div>
                        )
                      }
                    } else {
                      return (
                        <div key={enchant._id} className='has-background-danger item-container'>
                          <Item size='small' ench={enchant.enchantId} wid={enchant.wid}/>
                        </div>
                      )
                    }
                  }
                } else {
                  return (
                    <div key={enchant._id} className='item-container'>
                      <Item size='small' ench={enchant.enchantId} wid={enchant.wid}/>
                    </div>

                  )
                }
              })}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

  render () {
    const { debrief, spec, wClass } = this.props
    const itemSlots = [['Head'], ['Shoulder'], ['Back'], ['Chest'], ['Wrist'], ['Hands'], ['Legs'], ['Feet'], ['Main Hand', 'One-Hand', 'Held In Off-hand', 'Two-Hand', 'Shield'], ['Ranged']]

    if (!debrief.enchants) return null
    const enchantsTmp = {}
    const characters = {}

    for (const enchant of debrief.enchants) {
      if (!enchant.characterId) {
        continue
      } else {
        characters[enchant.characterId.name] = enchant.characterId
      }
      if (!enchantsTmp[enchant.characterId.name]) enchantsTmp[enchant.characterId.name] = {}
      if (!enchantsTmp[enchant.characterId.name][enchant.slot]) enchantsTmp[enchant.characterId.name][enchant.slot] = []
      enchantsTmp[enchant.characterId.name][enchant.slot].push(enchant)
    }

    const enchants = {}
    Object.keys(enchantsTmp).sort().forEach(function (key) {
      enchants[key] = enchantsTmp[key]
    })

    if (debrief) {
      return (
        <div className='debrief-enchants-issues'>
          <table className='table is-fullwidth is-narrow'>
            <thead>
              <tr>
                <th>Name</th>
                {itemSlots.map((slots, index) => {
                  return <th key={`slot-${index}`}>{slots.includes('Main Hand') ? 'Weapons' : slots.join(', ')}</th>
                })}
              </tr>
            </thead>

            <tbody>
              {Object.keys(enchants).map((characterName) => {
                if (spec !== '' && spec !== characters[characterName].spec) return null
                if (wClass !== '' && wClass !== characters[characterName].class) return null
                return (
                  <tr key={characterName}>

                    <td>{characters[characterName].name}</td>

                    {itemSlots.map((slots) => {
                      return <td key={`${characterName}-${slots.join()}`}>{this.generateStatus(characters[characterName].class, characters[characterName].spec, slots, enchants[characterName])}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
      )
    }
  }
}
DebriefEnchantsIssues.propTypes = {
  dispatch: PropTypes.func,
  debrief: PropTypes.object,
  wClass: PropTypes.string,
  spec: PropTypes.string
}

function mapStateToProps (state) {
  return {
    debrief: state.debrief
  }
}
export default connect(mapStateToProps)(DebriefEnchantsIssues)
