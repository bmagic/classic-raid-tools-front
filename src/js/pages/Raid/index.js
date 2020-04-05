import React from 'react'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowRaidImage from '../../components/WowRaidImage'

class Raid extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_RAID', id: this.props.match.params.id })
  }

  render () {
    const { user, raid } = this.props
    if (raid === null) return <Layout><div>Chargement en cours </div></Layout>
    return (
      <Layout>
        <div className='columns'>
          <div className='column is-8'>
            <div><WowRaidImage instance={raid.instance} /></div>
            <div> {raid.date}</div>
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
            <p className='content'>
              Un formulaire d'inscription pour les personnages du joueur avec leur status
              <ul>
                <li>Inscrit</li>
                <li>Absent</li>
                <li>Présent mais pas chaud</li>
              </ul>
            </p>
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
