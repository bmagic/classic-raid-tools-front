import React from 'react'
import Layout from '../../components/Common/Layout'
import BankLogs from '../../components/Bank/BankLogs'
import BankList from '../../components/Bank/BankList'
import BankImport from '../../components/Bank/BankImport'
import BankItemsRequest from '../../components/Bank/BankItemRequest'
import BankBasket from '../../components/Bank/BankBasket'
import { connect } from 'react-redux'

class Bank extends React.Component {
  constructor (props) {
    super(props)
    this.state = { tab: 'bank' }
  }

  render () {
    const { tab } = this.state
    const { basketItems } = this.props
    return (
      <Layout>
        <div className='is-pulled-right'>
          <BankImport/>
        </div>
        <div className="tabs">
          <ul>
            <li className={tab === 'bank' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'bank' })}><a>Banque</a></li>
            <li className={tab === 'basket' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'basket' })}><a>Panier ({Object.keys(basketItems).length})</a></li>
            <li className={tab === 'request' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'request' })}><a>Requêtes</a></li>
            <li className={tab === 'logs' ? 'is-active' : ''} onClick={() => this.setState({ tab: 'logs' })}><a>Logs import</a></li>
          </ul>
        </div>

        {tab === 'bank' && <BankList />}
        {tab === 'basket' && <BankBasket /> }
        {tab === 'request' && <BankItemsRequest /> }
        {tab === 'logs' && <BankLogs /> }

      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    basketItems: state.basketItems
  }
}
export default connect(mapStateToProps)(Bank)
