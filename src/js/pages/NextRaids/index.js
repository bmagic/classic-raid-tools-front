import React from 'react'
import Layout from '../../components/Common/Layout'
import NextRaidsList from '../../components/Raid/NextRaidsList'
import RaidForm from '../../components/Raid/RaidForm'
import { Link } from 'react-router-dom'

const NextRaids = () => {
  return (
    <Layout>
      <RaidForm />
      <NextRaidsList/>
      <div className='has-text-centered'><Link to={'/raids/all'}><a>Voir tous les raids</a></Link> </div>
    </Layout>
  )
}

export default NextRaids
