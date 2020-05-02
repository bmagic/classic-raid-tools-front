import React from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowRaidImage from '../../components/Common/WowRaidImage'
import io from 'socket.io-client'
import moment from 'moment'
import CharactersSubscribeForm from '../../components/Raid/CharactersRegistrationForm'
import CharactersRegistrationList from '../../components/Raid/CharactersRegistrationList'
import CharactersRegistrationLogs from '../../components/Raid/CharactersRegistrationLogs'

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
      this.props.dispatch({ type: data.type, raidId: data.raidId })
    })

    this.props.dispatch({ type: 'GET_RAID', id: this.props.match.params.id })
  }

  componentWillUnmount () {
    this.state.socket.close()
  }

  render () {
    const { raid } = this.props
    if (raid === null) return <Layout><div>Chargement en cours </div></Layout>
    return (
      <Layout>
        <div className='raid'>
          <div className='level'>

            <div className='level-item'>
              <div className='date is-size-4'> {moment(raid.date).format('dddd DD MMMM YYYY (HH:MM)')}</div>

            </div>
            <div className='level-item'>
              <div className='logo'>
                <WowRaidImage instance={raid.instance} />
              </div>
            </div>

          </div>

          <div className="tabs">
            <ul>
              <li className="is-active"><a>Inscriptions</a></li>
              {/*<li><a>Infos</a></li>*/}
              {/*<li><a>Loots</a></li>*/}
            </ul>
          </div>
          <div className=' columns'>

            <div className='column is-8'>
              <CharactersRegistrationList raidId={this.props.match.params.id} />
            </div>
            <div className='column is-4'>
              <CharactersSubscribeForm raidId={this.props.match.params.id} />
              <CharactersRegistrationLogs raidId={this.props.match.params.id} />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

Raid.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  raid: PropTypes.object
}

function mapStateToProps (state) {
  return {
    raid: state.raid
  }
}
export default connect(mapStateToProps)(Raid)
