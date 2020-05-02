import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WowClassImage from '../../Common/WowClassImage'

import './styles.scss'

class CharactersRegistrationList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_REGISTRATIONS', raidId: this.props.raidId })
  }

  generateRegistration (registration, uniqueUser) {
    return (
      <div key={registration._id} className='level is-mobile'>
        <div className='level-left'>
          <div className='level-item' title={uniqueUser[registration.userId] && uniqueUser[registration.userId].length > 1 ? uniqueUser[registration.userId].join(', ') : ''}>
            <figure className='image is-24x24'><WowClassImage keyClass={registration.class} keySpec={registration.spec}/></figure>&nbsp;{registration.name}&nbsp;
            {registration.favorite && <i title='Je souhaiterai jouer ce personnage en priorité' className='fas fa-star'/>}
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { registrations } = this.props
    const charactersRegistration = { tank: [], heal: [], cac: [], dd: [], bench: [], late: [], ko: [] }
    const uniqueUser = {}
    let count = 0
    for (const index in registrations) {
      const registration = registrations[index]

      if (uniqueUser[registration.userId] === undefined) uniqueUser[registration.userId] = []
      uniqueUser[registration.userId].push(registration.name)

      if (registration.status === 'ok') {
        charactersRegistration[registration.spec].push(registration)

        count++
      } else if (charactersRegistration[registration.status]) {
        charactersRegistration[registration.status].push(registration)
      }
    }

    return (
      <div className='characters-registration-list box'>
        <h2 className='subtitle'>{Object.keys(uniqueUser).length > 1 ? 'Joueurs inscrits' : 'Joueur inscrit'}: {Object.keys(uniqueUser).length} / {count > 1 ? 'Personnages inscrits' : 'Personnage inscrit'}: {count}</h2>
        <div className='columns'>
          <div className='column is-3'>
            <h3>Tank ({charactersRegistration.tank.length})</h3>
            {charactersRegistration.tank.map((registration) => {
              return this.generateRegistration(registration, uniqueUser)
            })}
          </div>
          <div className='column is-3'>
            <h3>Heal ({charactersRegistration.heal.length})</h3>
            {charactersRegistration.heal.map((registration) => {
              return this.generateRegistration(registration, uniqueUser)
            })}
          </div>
          <div className='column is-3'>
            <h3>CaC ({charactersRegistration.cac.length})</h3>
            {charactersRegistration.cac.map((registration) => {
              return this.generateRegistration(registration, uniqueUser)
            })}
          </div>
          <div className='column is-3'>
            <h3>DD ({charactersRegistration.dd.length})</h3>
            {charactersRegistration.dd.map((registration) => {
              return this.generateRegistration(registration, uniqueUser)
            })}
          </div>
        </div>
        <hr/>
        <div className='columns'>
          <div className='column is-3'>
            <h3>Repos si possible ({charactersRegistration.bench.length})</h3>
            {charactersRegistration.bench.map((registration) => {
              return this.generateRegistration(registration, uniqueUser)
            })}
          </div>
          <div className='column is-3'>
            <h3>Retard ({charactersRegistration.late.length})</h3>
            {charactersRegistration.late.map((registration) => {
              return this.generateRegistration(registration, uniqueUser)
            })}
          </div>
          <div className='column is-3'>

            <h3>Absents ({charactersRegistration.ko.length})</h3>
            {charactersRegistration.ko.map((registration) => {
              return this.generateRegistration(registration, uniqueUser)
            })}
          </div>
        </div>
      </div>

    )
  }
}
CharactersRegistrationList.propTypes = {
  dispatch: PropTypes.func,
  raidId: PropTypes.string,
  registrations: PropTypes.array
}

function mapStateToProps (state) {
  return {
    registrations: state.registrations
  }
}
export default connect(mapStateToProps)(CharactersRegistrationList)
