import React from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import CharactersSubscribeForm from '../../components/Raid/CharactersRegistrationForm'
import CharactersRegistrationList from '../../components/Raid/CharactersRegistrationList'
import CharactersRegistrationLogs from '../../components/Raid/CharactersRegistrationLogs'
import RaidInfo from '../../components/Raid/RaidInfo'

import './styles.scss'

class Raid extends React.Component {
  constructor (props) {
    super(props)
    this.state = { socket: null }
  }

  componentDidMount () {
    const socket = io(process.env.BACKEND_URL)
    this.setState({ socket })
    socket.emit('room', this.props.match.params.id)
    socket.on('ACTION', (data) => {
      this.props.dispatch(data)
    })

    this.props.dispatch({ type: 'GET_RAID', id: this.props.match.params.id })
  }

  componentWillUnmount () {
    this.state.socket.close()
  }

  render () {
    return (
      <Layout>
        <div className='raid'>
          <div className="tabs">
            <ul>
              <li className="is-active"><a>Informations</a></li>
              <li><a>Inscriptions</a></li>
            </ul>
          </div>

          <RaidInfo/>
          {/*<div className=' columns'>*/}

          {/*  <div className='column is-8'>*/}
          {/*    <CharactersRegistrationList raidId={this.props.match.params.id} />*/}
          {/*  </div>*/}
          {/*  <div className='column is-4'>*/}
          {/*    <CharactersSubscribeForm raidId={this.props.match.params.id} />*/}
          {/*    <CharactersRegistrationLogs raidId={this.props.match.params.id} />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </Layout>
    )
  }
}

Raid.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object
}

export default connect()(Raid)
