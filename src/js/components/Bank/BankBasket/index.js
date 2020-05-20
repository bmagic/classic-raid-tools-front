import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Item from '../Item'
import Gold from '../Gold'

import './styles.scss'
import ItemQuantity from '../ItemQuantity'

class BankBasket extends React.Component {
  constructor (props) {
    super(props)
    this.tbody = React.createRef()
    this.state = { gold: 0, message: '' }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_BANK_ITEMS' })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    for (const key in this.props.basketItems) {
      let stock = null
      for (const bankItem of this.props.bankItems) {
        if (bankItem._id === parseInt(key)) {
          stock = bankItem
        }
      }
      if (stock === null) {
        this.props.dispatch({
          type: 'CHANGE_BASKET_ITEM_QUANTITY',
          quantity: 0,
          wid: key,
          item: { _id: key }
        })
      } else {
        if (stock.quantity < this.props.basketItems[key].quantity) {
          this.props.dispatch({
            type: 'CHANGE_BASKET_ITEM_QUANTITY',
            quantity: stock.quantity,
            wid: key,
            item: stock
          })
        }
      }
    }

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { basketItems, dispatch } = this.props
    const { message } = this.state

    let basketPrice = 0
    return (
      <div className=' bank-basket'>
        <div className='box'>
          <a className='is-pulled-right' onClick={() => { dispatch({ type: 'CLEAR_BASKET' }) }}>Vider le panier</a>

          <h2 className='subtitle'>Panier</h2>

          <div className='basket  field'>
            <table className='table is-fullwidth is-striped'>

              {Object.keys(basketItems).map((key) => {
                const item = basketItems[key]
                console.log(item)

                if (!item.item.freeForMembers) { basketPrice += item.marketValue * item.quantity }
                return (
                  <tr key={key}>
                    <td>
                      <Item wid={key}/>
                    </td>
                    <td>.
                      <ItemQuantity quantity={item.quantity} wid={key} item={item.item}/>
                    </td>
                    <td className='has-text-right'>
                      <Gold count={item.item.freeForMembers ? 0 : item.marketValue} />
                    </td>
                  </tr>
                )
              })}
              <tfoot>
                <tr>
                  <th className='has-text-white'>Total</th>
                  <th className='has-text-white'/>
                  <th className='has-text-white has-text-right'><Gold count={basketPrice} /></th>
                </tr>
                <tr>
                  <th className='has-text-white'>Total avec réduction de guilde</th>
                  <th className='has-text-white'/>
                  <th className='has-text-white has-text-right'><Gold count={basketPrice / 2}/> </th>
                </tr>
              </tfoot>

            </table>

          </div>

          <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: 'CREATE_ITEMS_REQUEST', items: basketItems, message: message }) }}>
            <div className='field is-grouped is-grouped-right'>
              <div className='control is-expanded'>
                <input className='input' placeholder='Raison de votre demande: enchant / craft etc' value={message} onChange={(e) => this.setState({ message: e.target.value })}/>
              </div>
              <div className='control'>
                <button disabled={message === '' || Object.keys(basketItems).length === 0 } className='button is-primary is-pulled-right has-text-white' type='submit'>Envoyer la demande</button>

              </div>
            </div>
          </form>
        </div>
      </div>

    )
  }
}
BankBasket.propTypes = {
  dispatch: PropTypes.func,
  bankItems: PropTypes.array,
  basketItems: PropTypes.object
}

function mapStateToProps (state) {
  return {
    bankItems: state.bankItems,
    basketItems: state.basketItems
  }
}
export default connect(mapStateToProps)(BankBasket)
