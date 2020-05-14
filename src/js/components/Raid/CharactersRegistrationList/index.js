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
      <div key={registration._id} className='registration' title={uniqueUser[registration.userId] && uniqueUser[registration.userId].length > 1 ? uniqueUser[registration.userId].join(', ') : ''}>
        {this.props.user && this.props.user.roles.includes('modify_raid') && registration.validated === true && <a className='is-pulled-right links' onClick={() => this.props.dispatch({ type: 'UPDATE_REGISTRATION', raidId: this.props.raidId, id: registration._id, registration: { validated: false } })}><i className='fas fa-user-clock'/></a>}
        {this.props.user && this.props.user.roles.includes('modify_raid') && registration.validated === false && <a className='is-pulled-right links' onClick={() => this.props.dispatch({ type: 'UPDATE_REGISTRATION', raidId: this.props.raidId, id: registration._id, registration: { validated: true } })}><i className='fas fa-user-check'/></a>}
        <div>
          <i className='image is-16x16'><WowClassImage keyClass={registration.class} keySpec={registration.spec}/></i>&nbsp;{registration.name}&nbsp;
          {registration.favorite && <i title='Je souhaiterai jouer ce personnage en priorité' className='fas fa-star'/>}
        </div>
      </div>
    )
  }

  render () {
    const { registrations } = this.props
    const charactersRegistration = { tank: [], heal: [], cac: [], dd: [], bench: [], late: [], ko: [] }
    const charactersRegistrationValidated = { tank: [], heal: [], cac: [], dd: [], error: [] }

    const uniqueUser = {}
    const uniqueUserValidated = {}
    const charactersuniqueUserRegistration = []
    const rosterError = []
    for (const index in registrations) {
      const registration = registrations[index]

      if (uniqueUser[registration.userId] === undefined) uniqueUser[registration.userId] = []
      uniqueUser[registration.userId].push(registration.name)

      if (registration.status === 'ok') {
        if (registration.validated === true) {
          charactersRegistrationValidated[registration.spec].push(registration)

          if (uniqueUserValidated[registration.userId] === undefined) uniqueUserValidated[registration.userId] = []
          uniqueUserValidated[registration.userId].push(registration.name)
        } else {
          charactersRegistration[registration.spec].push(registration)
        }
        if (!charactersuniqueUserRegistration.includes(registration.userId)) charactersuniqueUserRegistration.push(registration.userId)
      } else {
        if (registration.validated !== true) {
          charactersRegistration[registration.status].push(registration)
        } else {
          if (registration.status === 'bench') {
            charactersRegistrationValidated[registration.spec].push(registration)
            if (uniqueUserValidated[registration.userId] === undefined) uniqueUserValidated[registration.userId] = []
            uniqueUserValidated[registration.userId].push(registration.name)
          } else {
            charactersRegistrationValidated.error.push(registration)
          }
        }
      }
    }

    for (const key of Object.keys(uniqueUserValidated)) {
      const characterArray = uniqueUserValidated[key]
      if (characterArray.length > 1) {
        rosterError.push(`Les personnages ${characterArray.join(',')} appartiennent au même joueur.`)
      }
    }

    return (
      <div className='characters-registration-list '>
        <h2 className='subtitle'>{charactersuniqueUserRegistration.length > 1 ? 'Joueurs inscrits' : 'Joueur inscrit'}: {charactersuniqueUserRegistration.length}</h2>

        <div className='box'>
          <h2 className='subtitle'>Roster</h2>
          { rosterError.length > 0 && <div className='notification is-danger'>
            {rosterError.map((error, index) => {
              return <div key={index}>{error}</div>
            })}
          </div>}
          <div className='columns'>
            <div className='column is-3'>
              <h3>Tank ({charactersRegistrationValidated.tank.length})</h3>
              {charactersRegistrationValidated.tank.map((registration) => {
                return this.generateRegistration(registration, uniqueUser)
              })}
            </div>
            <div className='column is-3'>
              <h3>Heal ({charactersRegistrationValidated.heal.length})</h3>
              {charactersRegistrationValidated.heal.map((registration) => {
                return this.generateRegistration(registration, uniqueUser)
              })}
            </div>
            <div className='column is-3'>
              <h3>CaC ({charactersRegistrationValidated.cac.length})</h3>
              {charactersRegistrationValidated.cac.map((registration) => {
                return this.generateRegistration(registration, uniqueUser)
              })}
            </div>
            <div className='column is-3'>
              <h3>DD ({charactersRegistrationValidated.dd.length})</h3>
              {charactersRegistrationValidated.dd.map((registration) => {
                return this.generateRegistration(registration, uniqueUser)
              })}
            </div>
          </div>
        </div>
        <div className='box'>
          <h2 className='subtitle'>Bench</h2>

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
            <div className='column is-3'>
              <h3>Erreur ({charactersRegistrationValidated.error.length})</h3>
              {charactersRegistrationValidated.error.map((registration) => {
                return this.generateRegistration(registration, uniqueUser)
              })}
            </div>
          </div>
        </div>
      </div>

    )
  }
}
CharactersRegistrationList.propTypes = {
  dispatch: PropTypes.func,
  raidId: PropTypes.string,
  registrations: PropTypes.array,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    registrations: state.registrations,
    user: state.user
  }
}
export default connect(mapStateToProps)(CharactersRegistrationList)
