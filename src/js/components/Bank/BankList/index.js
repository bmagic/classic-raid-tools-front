import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import md5 from 'md5'

import Item from '../Item'
import Gold from '../Gold'

import './styles.scss'
import ItemQuantity from '../ItemQuantity'

class BankList extends React.Component {
  constructor (props) {
    super(props)
    this.tbody = React.createRef()
    this.state = { bankItems: [], gold: 0, message: '' }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_BANK_ITEMS' })

    for (const item of this.props.bankItems) {
      if (item._id === 0) this.setState({ gold: item.quantity })
    }
    this.setState({ bankItems: this.props.bankItems })
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (md5(JSON.stringify(prevProps.bankItems)) !== md5(JSON.stringify(this.props.bankItems))) {
      for (const item of this.props.bankItems) {
        if (item._id === 0) this.setState({ gold: item.quantity })
      }
      this.setState({ bankItems: this.props.bankItems })
    }

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  onFilterChange (e) {
    const bankItems = []
    for (const tr of this.tbody.current.children) {
      const item = { _id: parseInt(tr.getAttribute('data')), quantity: parseInt(tr.getAttribute('quantity')), characters: tr.getAttribute('characters'), marketValue: tr.getAttribute('market-value') ? parseInt(tr.getAttribute('market-value')) : 0, freeForMembers: tr.getAttribute('free-for-members') === 'true', hidden: true }
      if (tr.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
        item.hidden = false
      }
      bankItems.push(item)
    }
    this.setState({ bankItems: bankItems })
  }

  render () {
    const { user, basketItems } = this.props
    const { bankItems, gold } = this.state

    return (
      <div className=' bank-list'>
        <div className='box'>
          <div className='field'>
            <input placeholder='Rechercher' className='input' onChange={(e) => this.onFilterChange(e)}/>
          </div>

          <div className='gold'>
              Bank gold : <Gold count={gold}/>
          </div>

          <table className='table is-fullwidth is-striped'>
            <thead >
              <tr>
                <th className='has-text-white'>Objet</th>
                <th className='has-text-white'>Gratuit</th>
                <th className='has-text-white'>Prix du marché</th>
                <th className='has-text-white'>Quantité</th>
                <th/>
              </tr>
            </thead>
            <tbody ref={this.tbody}>
              {bankItems.map((item, index) => {
                if (item._id === 0 || item.quantity === 0) return null
                return (
                  <tr data={item._id} free-for-members={item.freeForMembers ? 'true' : 'false'} market-value={item.marketValue ? item.marketValue : 0} characters={item.characters} quantity={item.quantity} className={item.hidden ? 'is-hidden' : '' } key={index}>
                    <td>
                      <Item wid={item._id}/>
                    </td>
                    <td className={`free ${user && user.roles && user.roles.includes('banker') ? 'is-banker' : ''}`}>
                      {item.freeForMembers ? <i className='fas fa-check has-text-success display'/> : <i className='fas fa-times has-text-danger display'/>}
                      <span className='addFree' onClick={() => { this.props.dispatch({ type: 'SET_ITEM_FREE', freeForMembers: !item.freeForMembers, wid: item._id }) }}>{!item.freeForMembers ? <i className='fas fa-check  add' /> : <i className='fas fa-times ' />}</span>
                    </td>
                    <td>
                      <Gold count={item.marketValue}/>
                    </td>
                    <td title={item.characters} className='has-text-weight-bold'>
                      {item.quantity}
                    </td>
                    <td className='add-action'>
                      <ItemQuantity quantity={basketItems[item._id] ? basketItems[item._id].quantity : 0} wid={item._id} item={item}/>
                    </td>
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
BankList.propTypes = {
  dispatch: PropTypes.func,
  bankItems: PropTypes.array,
  user: PropTypes.object,
  basketItems: PropTypes.object
}

function mapStateToProps (state) {
  return {
    bankItems: state.bankItems,
    user: state.user,
    basketItems: state.basketItems
  }
}
export default connect(mapStateToProps)(BankList)
