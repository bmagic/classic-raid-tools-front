import React from 'react'
import Layout from '../../components/Layout'

import CharacterForm from '../../components/CharacterForm'
import CharactersList from '../../components/CharactersList'

class Characters extends React.Component {
  render () {
    return (
      <Layout>
        <h1 className='title'>Characters</h1>
        <section className='section'>
          <CharacterForm />
        </section>
        <section className='section'>
          <CharactersList />
        </section>
      </Layout>
    )
  }
}

export default Characters
