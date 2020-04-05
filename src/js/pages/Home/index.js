import React from 'react'
import Layout from '../../components/Layout'
import NextRaidsList from '../../components/NextRaidsList'
import RaidForm from '../../components/RaidForm'

const Home = () => {
  return (
    <Layout>
      <RaidForm />
      <NextRaidsList/>
    </Layout>
  )
}

export default Home
