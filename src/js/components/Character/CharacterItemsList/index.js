import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../../Bank/Item'
import moment from 'moment'

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

  generateSlots (itemSlots, characterItems) {
    return (
      <div>
        {itemSlots.map((slot) => {
          return (
            <div key={slot}>
              <span className='subtitle'>{slot}</span>
              {characterItems.map((characterItem) => {
                if (characterItem.slot !== slot) return null
                if (this.state.displayAllItems || moment(characterItem.date) > moment().subtract(1, 'month')) {
                  return (
                    <div key={characterItem._id}><Item wid={characterItem._id} /> - {moment(characterItem.date).format('DD/MM/YYYY')} - {characterItem.encounters.length} boss tués</div>
                  )
                }
              })}
              <hr/>
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    const { displayAllItems } = this.state
    const { characterItems } = this.props
    const itemSlotsLeft = ['head', 'neck', 'shoulder', 'chest', 'waist', 'legs', 'feet', 'wrist']
    const itemSlotsRight = ['hands', 'finger', 'trinket', 'back', 'mainHand', 'offHand', 'ranged']

    if (characterItems.length === 0) {
      return (
        <div>Chargement en cours</div>
      )
    }
    return (
      <div>
        <label className="checkbox">
          <input type="checkbox" checked={displayAllItems} onClick={() => this.setState({ displayAllItems: !displayAllItems })}/>
            Afficher les items utilisés il y a plus d'un mois
        </label>
        <div className='columns'>
          <div className='column is-6'>
            {this.generateSlots(itemSlotsLeft, characterItems)}
          </div>
          <div className='column is-6'>
            {this.generateSlots(itemSlotsRight, characterItems)}
          </div>
        </div>

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
