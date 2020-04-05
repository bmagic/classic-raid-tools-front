import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CharacterBox from '../CharacterBox'

class CharactersList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER_CHARACTERS' })
  }

  render () {
    return (
      <div className='characters-list'>
        <div className='columns is-multiline'>

          {this.props.userCharacters.map((character) => {
            return (
              <div className='column is-4' key={character._id}>
                <CharacterBox wclass={character.class} spec={character.spec} name={character.name} id={character._id}/>
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
