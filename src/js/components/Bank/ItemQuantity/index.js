import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './styles.scss'
const ItemQuantity = ({ wid, item, quantity, dispatch }) => {
  return (
    <span className='item-quantity'>
      {quantity <= 0 && <i className='fas fa-minus  has-text-grey'/>}
      {quantity >= 1 && <a><i className='fas fa-minus  has-text-danger' onClick={() => dispatch({ type: 'CHANGE_BASKET_ITEM_QUANTITY', quantity: quantity - 1, wid: wid, item: item })} /></a>}
      <input min='0' max={item.quantity} type='number' onChange={(e) => dispatch({ type: 'CHANGE_BASKET_ITEM_QUANTITY', quantity: e.target.value >= item.quantity ? item.quantity : e.target.value, wid: wid, item: item })} value={quantity} />
      {quantity < item.quantity && <a><i className='fas fa-plus  has-text-success' onClick={() => dispatch({ type: 'CHANGE_BASKET_ITEM_QUANTITY', quantity: quantity + 1, wid: wid, item: item })} /></a>}
      {quantity >= item.quantity && <i className='fas fa-plus  has-text-grey'/>}
    </span>
  )
}

ItemQuantity.propTypes = {
  dispatch: PropTypes.func,
  quantity: PropTypes.number,
  wid: PropTypes.wid,
  item: PropTypes.object
}

export default connect()(ItemQuantity)
