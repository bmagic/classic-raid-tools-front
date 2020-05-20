import React from 'react'
import PropTypes from 'prop-types'
import WowClassImage from '../../Common/WowClassImage'
import { connect } from 'react-redux'

import './styles.scss'
const CharacterBox = ({ dispatch, name, wclass, spec, id, main }) => {
  return (
    <div className={`box character-box bg-class-${wclass}`}>
      <div className="level">
        <div className="level-left">
          <div className='level-item'>
            <figure className="image is-32x32">
              <WowClassImage keyClass={wclass} keySpec={spec} />
            </figure>
          </div>
          <div className="level-item">
            <strong>{name}</strong>
          </div>
          <div className={`level-item main-tag ${main ? 'is-main' : ''}`}>
            <div onClick={() => dispatch({ type: 'SET_USER_MAIN_CHARACTER', id: id })} className={`tag ${main ? 'is-success' : 'is-light'}`}>Personnage principal</div>
          </div>
        </div>
        <div className="level-right">
          <div className='level-item delete-button '>
            <a className='has-text-danger' onClick={() => {
              if (confirm('Confirmer la suppression du personnage')) {
                dispatch({ type: 'DELETE_USER_CHARACTER', id: id })
              }
            }}>
              <i className="fas fa-trash" aria-hidden="true"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
CharacterBox.propTypes = {
  dispatch: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  wclass: PropTypes.string,
  spec: PropTypes.string,
  main: PropTypes.bool
}

export default connect()(CharacterBox)
