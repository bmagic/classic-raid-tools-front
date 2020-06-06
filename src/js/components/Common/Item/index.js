import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Item = ({ wid, lang, ench }) => {
  if (wid !== 0) {
    return (
      <a key={wid} data-wowhead={`${ench ? `ench=${ench}` : ''}`}href={`https://${lang === 'en' ? '' : 'fr.'}classic.wowhead.com/item=${wid}`}>{wid}</a>
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
  ench: PropTypes.number
}

function mapStateToProps (state) {
  return {
    lang: state.lang
  }
}
export default connect(mapStateToProps)(Item)
