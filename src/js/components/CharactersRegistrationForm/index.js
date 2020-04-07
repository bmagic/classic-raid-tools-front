import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WowClassImage from '../WowClassImage'
import { Link } from 'react-router-dom'

class CharactersRegistrationForm extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_REGISTRATIONS', raidId: this.props.raidId })
    this.props.dispatch({ type: 'GET_USER_CHARACTERS' })
  }

  onClick (characterId, status) {
    this.props.dispatch({ type: 'CREATE_REGISTRATION', characterId: characterId, raidId: this.props.raidId, status: status })
  }

  render () {
    const { userCharacters } = this.props
    return (
      <div className='characters-registration-form'>
        <h2 className='subtitle'>Inscription des personnages</h2>
        {userCharacters.length === 0 && <span>Vous {'n\'avez'} pas encore de personnages, ajoutez en <Link to='/characters'>ici</Link></span>}
        {userCharacters.map((character) => {
          return (
            <div key={character._id} className='level'>
              <div className='level-left'>
                <div className='level-item'>
                  <figure className='image is-24x24'><WowClassImage keyClass={character.class} keySpec={character.spec}/></figure>
                  {character.name}
                </div>
              </div>

              <div className='level-right'>
                <div className='level-item'>
                  <button onClick={() => this.onClick(character._id, 'ok')} className='button is-small' title='Disponible'><i className="fas fa-check"/></button>
                  <button onClick={() => this.onClick(character._id, 'late')} className='button is-small' title='Disponible mais en retard'><i className="fas fa-clock"/></button>
                  <button onClick={() => this.onClick(character._id, 'ko')} className='button is-small' title='Absent'><i className="fas fa-times"/></button>
                  <button onClick={() => this.onClick(character._id, 'bench')} className='button is-small' title='Dispo mais si possible en repos'><i className="fas fa-umbrella-beach"/></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    )
  }
}
CharactersRegistrationForm.propTypes = {
  dispatch: PropTypes.func,
  userCharacters: PropTypes.array,
  raidId: PropTypes.string,
  registrations: PropTypes.array
}

function mapStateToProps (state) {
  return {
    userCharacters: state.userCharacters,
    registrations: state.registrations
  }
}
export default connect(mapStateToProps)(CharactersRegistrationForm)
