import React from 'react'
import Layout from '../../components/Common/Layout'
import NextRaidsList from '../../components/Raid/NextRaidsList'
import RaidForm from '../../components/Raid/RaidForm'

const Home = () => {
  return (
    <Layout>
      <RaidForm />
      <NextRaidsList/>
    </Layout>
  )
}

export default Home
