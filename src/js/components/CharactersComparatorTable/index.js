import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../Common/Item'
import moment from 'moment'
import { wowClass } from '../../lib/wow'
import { Link } from 'react-router-dom'
class CharactersComparatorTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { spec: 'tank', wClass: '' }
  }

  componentDidMount () {
    const { spec, wClass } = this.state
    this.props.dispatch({ type: 'GET_CHARACTERS_COMPARATOR_DATA', spec: spec, class: wClass })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
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
    const { spec, wClass } = this.state
    const { data } = this.props
    const itemSlots = ['head', 'neck', 'shoulder', 'chest', 'waist', 'legs', 'feet', 'wrist', 'hands', 'finger', 'trinket', 'back', 'weapon', 'ranged']

    return (
      <div>
        <div className='field  is-grouped'>
          <div className='control'>
            <div className="select">
              <select value={spec} onChange={(e) => { this.setState({ spec: e.target.value }) }}>
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

        <div className="table-container">
          <table className='table is-fullwidth is-mob'>
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

              {itemSlots.map((slot, index) => {
                return (
                  <tr key={slot}>
                    <td>{slot}</td>
                    {Object.keys(data).map((key) => {
                      return (
                        <td key={`${slot}${key}`}> {data[key].map((characterItem) => {
                          if (characterItem.slot !== slot) return null
                          if (this.state.displayAllItems || moment(characterItem.lastDate) > moment().subtract(1, 'month')) {
                            return (
                              <div key={characterItem._id}>
                                <Item wid={characterItem.wid}/>
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
