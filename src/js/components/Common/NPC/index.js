import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const NPC = ({ wid, lang }) => {
  if (wid === 0) {
    return (
      <span onClick={(e) => e.preventDefault()}>Trashs</span>
    )
  }
  return (
    <a onClick={(e) => e.preventDefault()} className='npc' key={wid}
      href={`https://${lang === 'en' ? '' : 'fr.'}classic.wowhead.com/npc=${wid}/test`}>{wid}</a>
  )
}

NPC.propTypes = {
  lang: PropTypes.string,
  wid: PropTypes.number
}

function mapStateToProps (state) {
  return {
    lang: state.lang
  }
}
export default connect(mapStateToProps)(NPC)
