import React from 'react'
import Layout from '../../components/Common/Layout'
import RosterList from '../../components/Roster/RosterList'

class Roster extends React.Component {
  constructor (props) {
    super(props)
    this.state = { tab: 'main' }
  }

  render () {
    const { tab } = this.state
    return (
      <Layout>
        <div className="tabs">
          <ul>
            <li className={tab === 'main' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'main' })}><a>Main</a></li>
            <li className={tab === 'reroll' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'reroll' })}><a>Reroll</a></li>
          </ul>
        </div>

        {tab === 'main' && <RosterList main={true} />}
        {tab === 'reroll' && <RosterList main={false}/> }

      </Layout>
    )
  }
}

export default Roster
