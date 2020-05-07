import React from 'react'
import Layout from '../../components/Common/Layout'
import BankLogs from '../../components/Bank/BankLogs'
import BankList from '../../components/Bank/BankList'
import BankImport from '../../components/Bank/BankImport'
import BankItemsRequest from '../../components/Bank/BankItemRequest'

class Bank extends React.Component {
  constructor (props) {
    super(props)
    this.state = { tab: 'bank' }
  }

  render () {
    const { tab } = this.state
    return (
      <Layout>
        <div className='is-pulled-right'>
          <BankImport/>
        </div>
        <div className="tabs">
          <ul>
            <li className={tab === 'bank' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'bank' })}><a>Banque</a></li>
            <li className={tab === 'request' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'request' })}><a>Requêtes</a></li>
            <li className={tab === 'logs' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'logs' })}><a>Logs import</a></li>
          </ul>
        </div>

        {tab === 'bank' && <BankList main={true} />}
        {tab === 'request' && <BankItemsRequest main={false}/> }
        {tab === 'logs' && <BankLogs main={false}/> }

      </Layout>
    )
  }
}

export default Bank
