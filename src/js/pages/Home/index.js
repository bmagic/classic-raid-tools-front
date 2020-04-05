import React from 'react'
import Layout from '../../components/Layout'

const Home = () => {
  return (
    <Layout>
      <h1 className='title'>Classic Raid Tools</h1>
      <div className='columns'>
        <div className='column is-8'>
          Liste des prochains raids (visible en rouge ceux ou on n'est pas inscrit avec au moins un personnage)
        </div>
        <div className='column is-4'>

        </div>
      </div>
    </Layout>
  )
}

export default Home
