import React from 'react'
import Layout from '../../../components/Common/Layout'

import Consommables from '../../../../../static/md/aq40/Consommables.md'
import TrashsSkeram from '../../../../../static/md/aq40/Trashs-Skeram.md'
import Skeram from '../../../../../static/md/aq40/Skeram.md'
const queryString = require('query-string')

class AQ40 extends React.Component {
  constructor (props) {
    super(props)
    this.state = { activeTab: 'Consommables' }
  }

  componentDidMount () {
    const hash = queryString.parse(location.hash)
    const activeTab = hash.activeTab || this.state.activeTab
    this.setState({ activeTab: activeTab })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { activeTab } = this.state
    const hash = queryString.stringify({ activeTab: activeTab })
    location.hash = hash

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { activeTab } = this.state

    let content = null
    switch (activeTab) {
      case 'Consommables':
        content = Consommables
        break
      case 'Trashs-Skeram':
        content = TrashsSkeram
        break
      case 'Skeram':
        content = Skeram
        break
    }

    const tabs = ['Consommables', 'Trashs-Skeram', 'Skeram']
    return (
      <Layout>
        <h1 className='title'>AQ40 Stratégie</h1>
        <div className="tabs">
          <ul>
            {tabs.map((tab) => {
              return (
                <li key={tab} className={activeTab === tab ? 'is-active' : ''} onClick={() => this.setState({ activeTab: tab })}><a>{tab}</a></li>
              )
            })}
          </ul>
        </div>
        <div className='content' dangerouslySetInnerHTML={{ __html: content }}/>

      </Layout>
    )
  }
}

export default AQ40
