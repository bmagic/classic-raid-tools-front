import React from 'react'
import Layout from '../../components/Common/Layout'

import CharacterForm from '../../components/Character/CharacterForm'
import CharactersList from '../../components/Character/CharactersList'
import UserLootsNeedsList from '../../components/Loots/UserLootsNeedsList'

class Characters extends React.Component {
  render () {
    return (
      <Layout>
        <div className='columns'>
          <div className='column is-7'>
            <h1 className='title'>Loots list</h1>

            <UserLootsNeedsList />

          </div>
          <div className='column is-5'>
            <h1 className='title'>Characters</h1>
            <CharacterForm />
            <CharactersList />
          </div>
        </div>

      </Layout>
    )
  }
}

export default Characters
