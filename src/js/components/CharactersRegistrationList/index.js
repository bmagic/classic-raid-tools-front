import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WowClassImage from '../WowClassImage'

import './styles.scss'

class CharactersRegistrationList extends React.Component {
  componentDidMount () {
    console.log(this.props)
    this.props.dispatch({ type: 'GET_REGISTRATIONS', raidId: this.props.raidId })
  }

  generateRegistration (registration) {
    return (
      <div key={registration._id} className='level is-mobile'>
        <div className='level-left'>
          <div className='level-item'>
            <figure className='image is-24x24'><WowClassImage keyClass={registration.class} keySpec={registration.spec}/></figure>&nbsp;{registration.name}
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { registrations } = this.props
    const charactersRegistration = { tank: [], heal: [], cac: [], dd: [], bench: [], late: [], ko: [] }
    let count = 0
    for (const index in registrations) {
      const registration = registrations[index]
      if (registration.status === 'ok') {
        charactersRegistration[registration.spec].push(registration)
        count++
      } else {
        charactersRegistration[registration.status].push(registration)
      }
    }
    return (
      <div className='characters-registration-list box'>
        <h2 className='subtitle'>Inscrits : {count}</h2>
        <div className='columns'>
          <div className='column is-6'>
            <h3>Tank ({charactersRegistration.tank.length})</h3>
            {charactersRegistration.tank.map((registration) => {
              return this.generateRegistration(registration)
            })}
            <h3>Heal ({charactersRegistration.heal.length})</h3>
            {charactersRegistration.heal.map((registration) => {
              return this.generateRegistration(registration)
            })}
          </div>
          <div className='column is-6'>
            <h3>CaC ({charactersRegistration.cac.length})</h3>
            {charactersRegistration.cac.map((registration) => {
              return this.generateRegistration(registration)
            })}
            <h3>DD ({charactersRegistration.dd.length})</h3>
            {charactersRegistration.dd.map((registration) => {
              return this.generateRegistration(registration)
            })}
          </div>
        </div>
        <hr/>
        <div className='columns'>
          <div className='column is-6'>
            <h3>Fatigué ({charactersRegistration.bench.length})</h3>
            {charactersRegistration.bench.map((registration) => {
              return this.generateRegistration(registration)
            })}
          </div>
          <div className='column is-6'>
            <h3>Retard ({charactersRegistration.late.length})</h3>
            {charactersRegistration.late.map((registration) => {
              return this.generateRegistration(registration)
            })}
          </div>
        </div>


        <h3>Absents ({charactersRegistration.tank.length})</h3>
        {charactersRegistration.ko.map((registration) => {
          return this.generateRegistration(registration)
        })}
      </div>

    )
  }
}
CharactersRegistrationList.propTypes = {
  dispatch: PropTypes.func,
  raidId: PropTypes.raidId,
  registrations: PropTypes.array
}

function mapStateToProps (state) {
  return {
    registrations: state.registrations
  }
}
export default connect(mapStateToProps)(CharactersRegistrationList)
