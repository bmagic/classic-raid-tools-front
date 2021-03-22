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
    const { user} = this.props
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
