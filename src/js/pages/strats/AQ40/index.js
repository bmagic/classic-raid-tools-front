import React from 'react'
import Layout from '../../../components/Common/Layout'

import Consommables from '../../../../../static/md/aq40/Consommables.md'
import Trashs1 from '../../../../../static/md/aq40/Trashs-1.md'
import Skeram from '../../../../../static/md/aq40/Skeram.md'
import Trashs2 from '../../../../../static/md/aq40/Trashs-2.md'
import BugFamily from '../../../../../static/md/aq40/Bug-Family.md'
import Trashs3 from '../../../../../static/md/aq40/Trashs-3.md'
import Sartura from '../../../../../static/md/aq40/Sartura.md'
import Trashs4 from '../../../../../static/md/aq40/Trashs-4.md'
import Fankriss from '../../../../../static/md/aq40/Fankriss.md'
import Viscidus from '../../../../../static/md/aq40/Viscidus.md'
import Trashs5 from '../../../../../static/md/aq40/Trashs-5.md'
import Huhuran from '../../../../../static/md/aq40/Huhuran.md'
import Trashs6 from '../../../../../static/md/aq40/Trashs-6.md'
import Twins from '../../../../../static/md/aq40/Twins.md'
import Trashs7 from '../../../../../static/md/aq40/Trashs-7.md'
import Ouro from '../../../../../static/md/aq40/Ouro.md'
import Trashs8 from '../../../../../static/md/aq40/Trashs-8.md'
import Cthun from '../../../../../static/md/aq40/Cthun.md'

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
      case 'Trashs-1':
        content = Trashs1
        break
      case 'Skeram':
        content = Skeram
        break
      case 'Trashs-2':
        content = Trashs2
        break
      case 'Bug-Family':
        content = BugFamily
        break
      case 'Trashs-3':
        content = Trashs3
        break
      case 'Sartura':
        content = Sartura
        break
      case 'Trashs-4':
        content = Trashs4
        break
      case 'Fankriss':
        content = Fankriss
        break
      case 'Viscidus':
        content = Viscidus
        break
      case 'Trashs-5':
        content = Trashs5
        break
      case 'Huhuran':
        content = Huhuran
        break
      case 'Trashs-6':
        content = Trashs6
        break
      case 'Twins':
        content = Twins
        break
      case 'Trashs-7':
        content = Trashs7
        break
      case 'Ouro':
        content = Ouro
        break
      case 'Trashs-8':
        content = Trashs8
        break
      case 'Cthun':
        content = Cthun
        break
    }

    const tabsBoss = ['Consommables', 'Skeram', 'Bug-Family', 'Sartura', 'Fankriss', 'Viscidus', 'Huhuran', 'Twins', 'Ouro', 'Cthun']
    const tabsTrash = ['Trashs-1', 'Trashs-2', 'Trashs-3', 'Trashs-4', 'Trashs-5', 'Trashs-6', 'Trashs-7', 'Trashs-8']

    return (
      <Layout >
        <h1 className='title'>AQ40 Stratégie</h1>
        <div className="tabs is-small">
          <ul>
            {tabsBoss.map((tab, index) => {

              return (
                <li key={tab} className={activeTab === tab ? 'is-active' : ''} onClick={() => this.setState({ activeTab: tab })}><a>{tab}</a></li>
              )
            })}
          </ul>
        </div>
        <div className="tabs is-small">
          <ul>
            {tabsTrash.map((tab, index) => {
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
