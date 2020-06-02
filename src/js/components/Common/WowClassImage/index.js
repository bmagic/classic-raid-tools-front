import React from 'react'
import PropTypes from 'prop-types'
import { wowClass } from '../../../lib/wow'

const WowClassImage = ({ keyClass, keySpec }) => {
  if (wowClass[keyClass] && wowClass[keyClass][keySpec]) {
    return (
      <img src={wowClass[keyClass][keySpec]}/>
    )
  } else {
    return null
  }
}
WowClassImage.propTypes = {
  keyClass: PropTypes.string,
  keySpec: PropTypes.string
}

export default WowClassImage
