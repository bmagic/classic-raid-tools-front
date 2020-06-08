import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../../Common/Item'
import moment from 'moment'
import Spell from '../../Common/Spell'
import { enchantToSpell } from '../../../lib/wow'
import './styles.scss'
class CharacterItemsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { displayAllItems: false }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_CHARACTER_ITEMS', id: this.props.id })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) this.props.dispatch({ type: 'GET_CHARACTER_ITEMS', id: this.props.id })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { displayAllItems } = this.state
    const { characterItems } = this.props
    const itemSlots = [['Head'], ['Neck'], ['Shoulder'], ['Back'], ['Chest'], ['Wrist'], ['Hands'], ['Waist'], ['Legs'], ['Feet'], ['Finger'], ['Trinket'], ['Main Hand', 'One-Hand', 'Held In Off-hand', 'Two-Hand'], ['Ranged']]

    const characterItemsSorted = {}
    for (const item of characterItems) {
      if (!characterItemsSorted[item.slot]) characterItemsSorted[item.slot] = []
      characterItemsSorted[item.slot].push(item)
    }

    if (characterItems.length === 0) {
      return (
        <div>Chargement en cours</div>
      )
    }

    return (
      <div className='character-items-list'>
        <label className="checkbox">
          <input type="checkbox" checked={displayAllItems} onClick={() => this.setState({ displayAllItems: !displayAllItems })}/>
            Afficher les items utilisés il y a plus de 15 jours
        </label>

        {itemSlots.map((slots) => {

          return (
            <div key={slots.join('-')} className="table-container">

              <table className='table is-fullwidth is-narrow'>
                <thead>
                  <th className='slot'>{slots.join(', ')}</th>
                  <th className='enchant'>Enchantement</th>
                  <th className='first-use'>Première utilisation</th>
                  <th className='last-use'>Dernière utilisation</th>
                </thead>
                <tbody>
                  {Object.keys(characterItemsSorted).map((characterItemKey) => {
                    if (!characterItemsSorted[characterItemKey]) return null
                    if (!slots.includes(characterItemKey)) return null
                    return (
                      characterItemsSorted[characterItemKey].map((characterItem) => {
                        if (this.state.displayAllItems || moment(characterItem.lastDate) > moment().subtract(15, 'days')) {
                          return (
                            <tr key={characterItem._id} >
                              <td><Item ench={characterItem.enchantId} wid={characterItem.wid} /></td>
                              <td>{characterItem.enchantId ? <Spell wid={enchantToSpell[characterItem.enchantId] || characterItem.enchantId}/> : 'Aucun'}</td>
                              <td>{moment(characterItem.firstDate).format('DD/MM/YYYY')}</td>
                              <td>{moment(characterItem.lastDate).format('DD/MM/YYYY')}</td>
                            </tr>
                          )
                        }
                      })
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}

      </div>
    )
  }
}
CharacterItemsList.propTypes = {
  dispatch: PropTypes.func,
  characterItems: PropTypes.array,
  id: PropTypes.string
}

function mapStateToProps (state) {
  return {
    characterItems: state.characterItems
  }
}
export default connect(mapStateToProps)(CharacterItemsList)
