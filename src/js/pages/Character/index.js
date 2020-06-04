import React from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CharacterItemsList from '../../components/Character/CharacterItemsList'

class Character extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_CHARACTER', name: this.props.match.params.name })
  }

  render () {
    const { character } = this.props

    if (!character) {
      return (
        <Layout>
          <h1 className='title'>Chargement en cours</h1>
        </Layout>
      )
    }
    return (
      <Layout>
        <h1 className='title'>{character.name}</h1>
        <CharacterItemsList id={character._id}/>
      </Layout>
    )
  }
}

Character.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  character: PropTypes.object
}

function mapStateToProps (state) {
  return {
    character: state.character
  }
}
export default connect(mapStateToProps)(Character)
