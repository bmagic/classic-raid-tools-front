import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WowClassImage from '../../Common/WowClassImage'
import { Link } from 'react-router-dom'

import './styles.scss'

class CharactersRegistrationForm extends React.Component {
  constructor (props) {
    super(props)
    this.characters = {}
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_REGISTRATIONS', raidId: this.props.raidId })
    this.props.dispatch({ type: 'GET_USER_CHARACTERS' })
  }

  onClick (characterId, status, favorite) {
    if (this.characters[characterId] && this.characters[characterId].status === status && this.characters[characterId].favorite === favorite) {
      status = null
    }
    this.props.dispatch({ type: 'CREATE_REGISTRATION', characterId: characterId, raidId: this.props.raidId, status: status, favorite: favorite })
  }

  render () {
    const { userCharacters, registrations, raidId } = this.props

    if (registrations[raidId] === undefined) return <div>Chargement en cours</div>

    this.characters = {}
    for (const registration of registrations[raidId]) {
      this.characters[registration.characterId] = { status: registration.status, favorite: registration.favorite }
    }

    return (
      <div className='characters-registration-form box'>
        {userCharacters.length === 0 && <span>Vous {'n\'avez'} pas encore de personnages, ajoutez en <Link to='/characters'>ici</Link></span>}
        {userCharacters.map((character) => {
          const status = this.characters[character._id] ? this.characters[character._id].status : undefined
          const favorite = this.characters[character._id] ? this.characters[character._id].favorite : false
          return (
            <div key={character._id} className='level is-mobile'>
              <div className='level-left'>
                <div className='level-item'>
                  <figure className='image is-24x24'><WowClassImage keyClass={character.class} keySpec={character.spec}/></figure>
                  &nbsp;{character.name}
                </div>
                <div className='level-item'>
                  <span onClick={() => this.onClick(character._id, status, !favorite)}><i title='Je souhaiterai jouer ce personnage en priorité' className={favorite ? 'fas fa-star' : 'far fa-star'}/></span>
                </div>
              </div>

              <div className='level-right'>

                <div className='level-item'>
                  <button onClick={() => this.onClick(character._id, 'ok', favorite)} className={`button is-small ${status === 'ok' ? 'is-success' : ''}`} title='Disponible'><i className="fas fa-check"/></button>
                  <button onClick={() => this.onClick(character._id, 'late', favorite)} className={`button is-small ${status === 'late' ? 'is-warning' : ''}`} title='Disponible mais en retard'><i className="fas fa-clock"/></button>
                  <button onClick={() => this.onClick(character._id, 'ko', favorite)} className={`button is-small ${status === 'ko' ? 'is-danger' : ''}`} title='Absent'><i className="fas fa-times"/></button>
                  <button onClick={() => this.onClick(character._id, 'bench', favorite)} className={`button is-small ${status === 'bench' ? 'is-warning' : ''}`} title='Dispo mais si possible en repos'><i className="fas fa-umbrella-beach"/></button>
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
