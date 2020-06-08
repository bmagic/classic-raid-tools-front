import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Item = ({ wid, lang, ench, size }) => {
  if (wid !== 0) {
    return (
      <a className='item' data-wh-icon-size={size || 'tiny'} key={wid} data-wowhead={`${ench ? `ench=${ench}&` : ''}`}href={`https://${lang === 'en' ? '' : 'fr.'}classic.wowhead.com/item=${wid}`}>{wid}</a>
    )
  } else {
    return (
      <span>Gold</span>
    )
  }
}

Item.propTypes = {
  lang: PropTypes.string,
  wid: PropTypes.number,
  ench: PropTypes.number,
  size: PropTypes.string
}

function mapStateToProps (state) {
  return {
    lang: state.lang
  }
}
export default connect(mapStateToProps)(Item)
