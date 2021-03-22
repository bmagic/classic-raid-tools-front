import React from 'react'
import Layout from '../../components/Common/Layout'

import CharacterForm from '../../components/Character/CharacterForm'
import CharactersList from '../../components/Character/CharactersList'

class Characters extends React.Component {
  render () {
    return (
      <Layout>

            <h1 className='title'>Characters</h1>
            <CharacterForm />
            <CharactersList />

      </Layout>
    )
  }
}

export default Characters
