import React from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class User extends React.Component {
  constructor (props) {
    super(props)

    this.state = { username: '', email: '' }

    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER' })
    this.props.dispatch({ type: 'GET_USER_AVAILABILITIES' })

    const { username, email } = this.props.user

    this.setState({ username: username, email: email })
    this.onSubmit = this.onSubmit.bind(this)
  }

  onInputChange (key, e) {
    const state = {}
    state[key] = e.target.value
    this.setState(state)
  }

  onSubmit (e) {
    e.preventDefault()
    const { username, email } = this.state
    this.props.dispatch({ type: 'UPDATE_USER', user: { username: username, email: email } })
  }

  render () {
    const { user, userAvailabilities, lang, dispatch } = this.props
    const { username, email } = this.state
    if (user === null) return <div>Loading</div>
    return (
      <Layout>
        <h1 className='title'>Profile</h1>
        <form className='section' onSubmit={this.onSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input " type="text" placeholder="Your name" onChange={(e) => this.onInputChange('username', e)} value={username}/>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input " type="email" placeholder="Your email" onChange={(e) => this.onInputChange('email', e)} value={email}/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>

            </div>
          </div>
          <div className="control">
            <button className="button is-link" disabled={(username === user.username && email === user.email) || username === '' || email === ''}>Sauvegarder</button>
          </div>
        </form>
        <div className='section'>
          <h2 className='subtitle'>Disponibilités</h2>
          <table className='table is-narrow is-fullwidth is-hoverable is-bordered'>
            <thead>
              <tr>
                <th>Jour</th>
                <th className='has-text-centered'>Disponible ce soir sans problème</th>
                <th className='has-text-centered'>Disponible ce soir mais ça ne m'arrange pas trop</th>
                <th className='has-text-centered'>Pas disponible ce soir</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lundi</td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'monday', status: 'ok' })}>
                  {userAvailabilities && userAvailabilities.monday === 'ok' && <i className='fas fa-check has-text-success' />}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'monday', status: 'maybe' })}>
                  {userAvailabilities && userAvailabilities.monday === 'maybe' && <i className='fas fa-check has-text-warning'/>}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'monday', status: 'ko' })}>
                  {userAvailabilities && userAvailabilities.monday === 'ko' && <i className='fas fa-check has-text-danger'/>}
                </td>
              </tr>
              <tr>
                <td>Mardi</td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'tuesday', status: 'ok' })}>
                  {userAvailabilities && userAvailabilities.tuesday === 'ok' && <i className='fas fa-check has-text-success' />}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'tuesday', status: 'maybe' })}>
                  {userAvailabilities && userAvailabilities.tuesday === 'maybe' && <i className='fas fa-check has-text-warning'/>}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'tuesday', status: 'ko' })}>
                  {userAvailabilities && userAvailabilities.tuesday === 'ko' && <i className='fas fa-check has-text-danger'/>}
                </td>
              </tr>
              <tr>
                <td>Mercredi</td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'wednesday', status: 'ok' })}>
                  {userAvailabilities && userAvailabilities.wednesday === 'ok' && <i className='fas fa-check has-text-success' />}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'wednesday', status: 'maybe' })}>
                  {userAvailabilities && userAvailabilities.wednesday === 'maybe' && <i className='fas fa-check has-text-warning'/>}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'wednesday', status: 'ko' })}>
                  {userAvailabilities && userAvailabilities.wednesday === 'ko' && <i className='fas fa-check has-text-danger'/>}
                </td>
              </tr>
              <tr>
                <td>Jeudi</td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'thursday', status: 'ok' })}>
                  {userAvailabilities && userAvailabilities.thursday === 'ok' && <i className='fas fa-check has-text-success' />}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'thursday', status: 'maybe' })}>
                  {userAvailabilities && userAvailabilities.thursday === 'maybe' && <i className='fas fa-check has-text-warning'/>}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'thursday', status: 'ko' })}>
                  {userAvailabilities && userAvailabilities.thursday === 'ko' && <i className='fas fa-check has-text-danger'/>}
                </td>
              </tr>
              <tr>
                <td>Vendredi</td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'friday', status: 'ok' })}>
                  {userAvailabilities && userAvailabilities.friday === 'ok' && <i className='fas fa-check has-text-success' />}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'friday', status: 'maybe' })}>
                  {userAvailabilities && userAvailabilities.friday === 'maybe' && <i className='fas fa-check has-text-warning'/>}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'friday', status: 'ko' })}>
                  {userAvailabilities && userAvailabilities.friday === 'ko' && <i className='fas fa-check has-text-danger'/>}
                </td>
              </tr>
              <tr>
                <td>Samedi</td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'saturday', status: 'ok' })}>
                  {userAvailabilities && userAvailabilities.saturday === 'ok' && <i className='fas fa-check has-text-success' />}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'saturday', status: 'maybe' })}>
                  {userAvailabilities && userAvailabilities.saturday === 'maybe' && <i className='fas fa-check has-text-warning'/>}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'saturday', status: 'ko' })}>
                  {userAvailabilities && userAvailabilities.saturday === 'ko' && <i className='fas fa-check has-text-danger'/>}
                </td>
              </tr>
              <tr>
                <td>Dimanche</td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'sunday', status: 'ok' })}>
                  {userAvailabilities && userAvailabilities.sunday === 'ok' && <i className='fas fa-check has-text-success' />}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'sunday', status: 'maybe' })}>
                  {userAvailabilities && userAvailabilities.sunday === 'maybe' && <i className='fas fa-check has-text-warning'/>}
                </td>
                <td className='has-text-centered has-pointer' onClick={() => dispatch({ type: 'SET_AVAILABILITY', day: 'sunday', status: 'ko' })}>
                  {userAvailabilities && userAvailabilities.sunday === 'ko' && <i className='fas fa-check has-text-danger'/>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='section'>
          <div className="field">
            <label className="label">{'Langue d\'affichage des objets'}</label>
            <div className="select">
              <select value={lang} onChange={(e) => dispatch({ type: 'CHANGE_LANGUAGE', lang: e.target.value })}>
                <option>fr</option>
                <option>en</option>
              </select>
            </div>
          </div>
        </div>

        <p className='section'>
              Roles: {user.roles.length > 0 ? user.roles.join(', ') : 'Aucun role'}
        </p>

      </Layout>
    )
  }
}

User.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  lang: PropTypes.string,
  userAvailabilities: PropTypes.object

}

function mapStateToProps (state) {
  return {
    user: state.user,
    lang: state.lang,
    userAvailabilities: state.userAvailabilities
  }
}
export default connect(mapStateToProps)(User)
