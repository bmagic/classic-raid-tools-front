import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Item from '../../Common/Item'
class BankLogs extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_BANK_LOGS' })
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
    const { bankLogs } = this.props
    return (
      <div className='box  '>
        <table className='table is-fullwidth is-striped'>

          <tbody>

            {bankLogs.map((log) => {
              return (
                <tr key={log._id}>
                  <td>
                    {moment(log.date).format('DD/MM/YYYY HH:mm')}
                  </td>
                  <td>
                    {log.character}
                  </td>
                  <td>
                    <Item key={log._id} wid={log.wid}/>
                  </td>
                  <td >
                    <span className={log.prevQuantity > log.quantity ? 'has-text-danger' : 'has-text-success'}>
                      {log.prevQuantity} <i className='fa fa-arrow-right'/> {log.quantity}
                    </span>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    )
  }
}
BankLogs.propTypes = {
  dispatch: PropTypes.func,
  bankLogs: PropTypes.array
}

function mapStateToProps (state) {
  return {
    bankLogs: state.bankLogs
  }
}
export default connect(mapStateToProps)(BankLogs)
