import React from 'react'
import Layout from '../../components/Layout'

const Home = () => {
  return (
    <Layout>
      <h1 className='title'>Classic Raid Tools</h1>
      <div className='columns'>
        <div className='column is-8'>
          Left
        </div>
        <div className='column is-4'>
          Right
        </div>
      </div>
    </Layout>
  )
}

export default Home
