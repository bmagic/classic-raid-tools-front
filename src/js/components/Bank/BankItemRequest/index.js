import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import Item from '../../Common/Item'
import Gold from '../Gold'

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
    const { bankItemsRequests, user, dispatch } = this.props
    return (
      <div >
        {bankItemsRequests.map((bankItemsRequest) => {
          let basketPrice = 0
          return (
            <div className={`box ${bankItemsRequest.status==='asked'?'has-border-orange':''} ${bankItemsRequest.status==='ok'?'has-border-green':''} ${bankItemsRequest.status==='ko'?'has-border-red':''}`} key={bankItemsRequest._id}>
              <div className='level'>
                <div className='item-level  '>
                  <div>{moment(bankItemsRequest.date).format('DD/MM/YYYY HH:mm')}</div>
                  <div>{bankItemsRequest?.userId?.username || 'Joueur inconnu'}</div>
                  {bankItemsRequest.reroll && <div><span className='tag is-light is-warning'>Demande pour un reroll</span> </div>}
                </div>
                <div className='item-level'>
                  <div>{bankItemsRequest.message}</div>
                </div>
                <div className='item-level'>
                  {Object.keys(bankItemsRequest.items).map((wid) => {
                    const item = bankItemsRequest.items[wid]

                    if (!item?.item?.freeForMembers || bankItemsRequest.reroll === true) { basketPrice += item.marketValue * item.quantity }
                    return (
                      <div key={wid}>{item.quantity} x <Item wid={parseInt(wid)}/></div>
                    )
                  })}
                </div>
                <div className='item-level'>
                  <Gold count={basketPrice / 2}/>
                </div>
                {user && user.roles && !user.roles.includes('banker') && <div className='item-level'>
                  {bankItemsRequest.status === 'asked' && <div>En cours</div>}
                  {bankItemsRequest.status === 'ok' && <div className='has-text-success'>Effectuée</div>}
                  {bankItemsRequest.status === 'ko' && <div className='has-text-danger'>Refusée</div>}
                </div>}
                {user && user.roles && user.roles.includes('banker') && <div className='item-level'>
                  <div className="select has-text-black">
                    <select value={bankItemsRequest.status} onChange={(e) => dispatch({ type: 'UPDATE_BANK_ITEMS_REQUEST', id: bankItemsRequest._id, status: e.target.value })}>
                      <option value='asked'>En cours</option>
                      <option value='ok'>Effectuée</option>
                      <option value='ko'>Refusée</option>
                    </select>
                  </div>
                </div>}

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
  bankItemsRequests: PropTypes.array,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    bankItemsRequests: state.bankItemsRequests,
    user: state.user
  }
}
export default connect(mapStateToProps)(BankItemsRequest)
