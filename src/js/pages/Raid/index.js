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
import RaidInscriptions from '../../components/Raid/RaidInscriptions'

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
    const { dispatch, raidTab } = this.props
    return (
      <Layout>
        <div className='raid'>
          <div className="tabs">
            <ul>
              <li className={raidTab==='infos'?'is-active':''} onClick={() => dispatch({ type: 'CHANGE_RAID_TAB', raidTab: 'infos' })}><a>Informations</a></li>
              <li className={raidTab==='inscriptions'?'is-active':''} onClick={() => dispatch({ type: 'CHANGE_RAID_TAB', raidTab: 'inscriptions' })}><a>Inscriptions</a></li>
            </ul>
          </div>


          {raidTab === 'infos' && <RaidInfo/>}
          {raidTab === 'inscriptions' && <RaidInscriptions/>}

        </div>
      </Layout>
    )
  }
}

Raid.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  raidTab: PropTypes.string
}
function mapStateToProps (state) {
  return {
    raidTab: state.raidTab
  }
}
export default connect(mapStateToProps)(Raid)
