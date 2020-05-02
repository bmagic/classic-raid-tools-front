import React from 'react'
import PropTypes from 'prop-types'
import { wowClass } from '../../../lib/wow'

const WowClassImage = ({ keyClass, keySpec }) => {
  return (
    <img src={wowClass[keyClass][keySpec]} />
  )
}
WowClassImage.propTypes = {
  keyClass: PropTypes.string,
  keySpec: PropTypes.string
}

export default WowClassImage
