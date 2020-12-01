import React from 'react'
import Layout from '../../components/Common/Layout'
import PresencesList from '../../components/Presences/PresencesList'
import InstanceStatsList from '../../components/InstanceStatsList'

class InstanceStats extends React.Component {
  render () {
    return (
      <Layout>
        <h1 className='title'>Boss Kill Count</h1>
        <InstanceStatsList/>
      </Layout>
    )
  }
}

export default InstanceStats
