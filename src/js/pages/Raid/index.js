import React from 'react'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowRaidImage from '../../components/WowRaidImage'
import io from 'socket.io-client'
import moment from 'moment'

import './styles.scss'
import CharactersSubscribeForm from '../../components/CharactersRegistrationForm'
import CharactersRegistrationList from '../../components/CharactersRegistrationList'

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
    const { user, raid } = this.props
    if (raid === null) return <Layout><div>Chargement en cours </div></Layout>
    return (
      <Layout>
        <div className='raid columns'>
          <div className='column is-8'>
            <div className='date is-size-4'> {moment(raid.date).format('dddd DD MMMM YYYY')}</div>
            <hr/>
            <h2 className='subtitle'>Infos</h2>
            <div>Heure de départ: {moment(raid.date).format('HH')}h{moment(raid.date).format('mm')}</div>
            <div>Groupage: 21h00 wisp Spoonk</div>
            <div>TP: 21h00 </div>
            <div>Raid Leader: Keywar</div>
            <div>Logs : Url vers les logs</div>
            <hr/>
            <h2 className='subtitle'>Rooster</h2>
            Un joli tableau avec les places des gens dans le raid
            <hr/>
            <h2 className='subtitle'>Ragnaros</h2>
            Position 2 (Info relative uniquement au joueur)
            <hr/>
            <h2 className='subtitle'>Majordomo Example d'un joueur Mage Nuked (les autres ne le voit pas) </h2>
              Sheep carré<br/>
              Tu as l'infusion de Bmagic
            <hr/>
            <h2 className='subtitle'>Majordomo Example d'un joueur Heal Bmagic (les autres ne le voit pas) </h2>
              Heal KeyWar (MT Majordomo)<br/>
              Pose ton infusion sur Nuked
            <hr/>
            <h2 className='subtitle'>Majordomo Example Tank (les autres ne le voit pas)</h2>
            MT1: Keywar<br/>
            MT2: La Chaussette<br/>
            MT3: Zw
            <hr/>
            <p className='content'>
              L'objectif de cette page est de fournir sous forme de fiche les informations utiles pour le joueur uniquement :
              <ul>
                <li>La compo du raid (groupe par groupe)</li>
                <li>Les buffs / débuff qu'il doit mettre et sur qui</li>
                <li>Si il a un role précis sur le boss</li>
                <li>etc etc</li>
              </ul>
              Le tout est dynamique et se refresh en live si il y a un changement fait par un officier
            </p>
          </div>
          <div className='column is-4'>
            <div className='logo has-text-centered'>
              <WowRaidImage instance={raid.instance} />
            </div>
            <CharactersSubscribeForm raidId={this.props.match.params.id} />
            <CharactersRegistrationList raidId={this.props.match.params.id} />
          </div>
        </div>
      </Layout>
    )
  }
}

Raid.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  match: PropTypes.object,
  raid: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user,
    raid: state.raid
  }
}
export default connect(mapStateToProps)(Raid)
