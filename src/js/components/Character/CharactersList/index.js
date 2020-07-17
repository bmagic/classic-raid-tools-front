import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CharacterBox from '../CharacterBox'

class CharactersList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER_CHARACTERS' })
  }

  render () {
    const { userCharacters } = this.props
    let oneMain = false
    for (const index in userCharacters) {
      const userCharacter = userCharacters[index]
      if (userCharacter.main) oneMain = true
    }
    return (
      <div className='characters-list'>
        {!oneMain && <div className='notification is-light is-warning'>Vous n'avez pas défini de personnage principal</div>}
        <div className=''>

          {userCharacters.map((character) => {
            return (
              <div key={character._id}>
                <CharacterBox wclass={character.class} spec={character.spec} name={character.name} id={character._id} main={character.main}/>
              </div>
            )
          })}
        </div>
      </div>

    )
  }
}
CharactersList.propTypes = {
  dispatch: PropTypes.func,
  userCharacters: PropTypes.array
}

function mapStateToProps (state) {
  return {
    userCharacters: state.userCharacters
  }
}
export default connect(mapStateToProps)(CharactersList)
