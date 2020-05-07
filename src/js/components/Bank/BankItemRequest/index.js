import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Item from '../Item'
class BankItemsRequest extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_BANK_ITEMS_REQUEST' })
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
    const { bankItemsRequests } = this.props
    return (
      <div >

        {bankItemsRequests.map((bankItemsRequest) => {
          return (
            <div className='box has-background-grey-darker has-text-white' key={bankItemsRequest._id}>
              <div className='level'>
                <div className='item-level'>
                  <div>{moment(bankItemsRequest.date).format('DD/MM/YYYY HH:mm')}</div>
                  <div>{bankItemsRequest.userId.username}</div>
                </div>
                <div className='item-level'>
                  <div>{bankItemsRequest.message}</div>
                </div>
                <div className='item-level'>
                  {Object.keys(bankItemsRequest.items).map((wid) => {
                    const item = bankItemsRequest.items[wid]
                    return (
                      <div key={wid}>{item.quantity} x <Item wid={parseInt(wid)}/></div>
                    )
                  })}
                </div>
                <div className='item-level'>{bankItemsRequest.status}</div>
              </div>
            </div>
          )
        })}
      </div>

    )
  }
}
BankItemsRequest.propTypes = {
  dispatch: PropTypes.func,
  bankItemsRequests: PropTypes.array
}

function mapStateToProps (state) {
  return {
    bankItemsRequests: state.bankItemsRequests
  }
}
export default connect(mapStateToProps)(BankItemsRequest)
