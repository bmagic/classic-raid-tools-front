import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../../Common/Item'
import Spell from '../../Common/Spell'
import { enchantToSpell } from '../../../lib/wow'

class EnchantsAnalyzerDataIssues extends React.Component {
  constructor (props) {
    super(props)
    this.state = { displayAllItems: false }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_ENCHANTS_ANALYZER_DATA', date: this.props.date, instance: this.props.instance })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.date !== this.props.date || prevProps.instance !== this.props.instance) this.props.dispatch({ type: 'GET_ENCHANTS_ANALYZER_DATA', date: this.props.date, instance: this.props.instance })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { enchantsAnalyzerData } = this.props
    if (enchantsAnalyzerData) {
      return (
        <div>
          {enchantsAnalyzerData.map((data) => {
            return (
              <div key={data._id}>
                {data._id}
                <table className='table is-fullwidth'>

                  {data.items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td><Item wid={item.wid} ench={item.enchantId}/></td>
                        <td>{item.slot}</td>
                        <td>
                          {item.enchantId && <Spell wid={enchantToSpell[item.enchantId]}/>}
                        </td>
                      </tr>
                    )
                  })}
                </table>
              </div>
            )
          })}
        </div>
      )
    }
  }
}
EnchantsAnalyzerDataIssues.propTypes = {
  dispatch: PropTypes.func,
  instance: PropTypes.string,
  date: PropTypes.string,
  enchantsAnalyzerData: PropTypes.array
}

function mapStateToProps (state) {
  return {
    enchantsAnalyzerData: state.enchantsAnalyzerData
  }
}
export default connect(mapStateToProps)(EnchantsAnalyzerDataIssues)
