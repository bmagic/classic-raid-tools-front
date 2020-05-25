import React from 'react'
import Layout from '../../components/Common/Layout'
import LootAdmin from '../../components/Loots/LootAdmin'
import RosterList from '../../components/Roster/RosterList'

class AdminLoots extends React.Component {
  constructor (props) {
    super(props)
    this.state = { tab: 'bwl' }
  }

  render () {
    const { tab } = this.state
    return (
      <Layout>
        <div className="tabs">
          <ul>
            <li className={tab === 'bwl' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'bwl' })}><a>BWL</a></li>
          </ul>
        </div>

        <LootAdmin instance={tab} />

      </Layout>
    )
  }
}

export default AdminLoots
