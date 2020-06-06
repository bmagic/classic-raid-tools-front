import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Spell = ({ wid, lang }) => {
  return (
    <a key={wid} data-wowhead="wh-icon-size=small" href={`https://${lang === 'en' ? '' : 'fr.'}classic.wowhead.com/spell=${wid}`}>{wid}</a>
  )
}

Spell.propTypes = {
  lang: PropTypes.string,
  wid: PropTypes.number
}

function mapStateToProps (state) {
  return {
    lang: state.lang
  }
}
export default connect(mapStateToProps)(Spell)
