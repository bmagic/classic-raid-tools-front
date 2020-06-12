import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Spell = ({ wid, lang, size }) => {
  return (
    <a className='spell' data-wh-icon-size={size || 'tiny'} key={wid}
      href={`https://${lang === 'en' ? '' : 'fr.'}classic.wowhead.com/spell=${wid}`}>{wid}</a>
  )
}

Spell.propTypes = {
  lang: PropTypes.string,
  wid: PropTypes.number,
  size: PropTypes.string
}

function mapStateToProps (state) {
  return {
    lang: state.lang
  }
}
export default connect(mapStateToProps)(Spell)
