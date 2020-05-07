import React from 'react'
import PropTypes from 'prop-types'
import gold from '../../../../../static/Money/money-gold.gif'
import silver from '../../../../../static/Money/money-silver.gif'
import copper from '../../../../../static/Money/money-copper.gif'

const Gold = ({ count }) => {
  const c = count % 100
  const a = Math.trunc((count % 10000) / 100)
  const g = Math.trunc(count / 10000)
  return (
    <span className='gold'>{g !== 0 && <span>{g}<img src={gold}/>&nbsp;</span>}{a !== 0 && <span>{a}<img src={silver}/>&nbsp;</span>}{c}<img src={copper}/></span>
  )
}

Gold.propTypes = {
  count: PropTypes.number
}

export default Gold
