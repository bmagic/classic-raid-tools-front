import React from 'react'
import Layout from '../../components/Common/Layout'
import PresencesList from '../../components/Presences/PresencesList'

class Presences extends React.Component {
  render () {
    return (
      <Layout>
        <PresencesList/>
      </Layout>
    )
  }
}

export default Presences
