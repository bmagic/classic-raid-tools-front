import React from 'react'
import PropTypes from 'prop-types'
import { wowRaids } from '../../lib/wow'

const WowRaidImage = ({ instance }) => {
  return (
    <img src={wowRaids[instance]} />
  )
}
WowRaidImage.propTypes = {
  instance: PropTypes.string
}

export default WowRaidImage
