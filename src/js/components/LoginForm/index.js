import React from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '' }

    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange (key, e) {
    const state = {}
    state[key] = e.target.value
    this.setState(state)
  }

  addUser (e) {
    e.preventDefault()
    this.props.dispatch({ type: 'LOGIN', email: this.state.email, password: this.state.password })
  }

  render () {
    const { email, password } = this.state

    return (
      <form className='register-form' onSubmit={(e) => this.addUser(e)}>
        <div className='field'>
          <div className='control'>
            <input className='input' type='email' placeholder='Email' value={email} onChange={e => this.onInputChange('email', e)} />
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <input className='input' minLength='8' type='password' placeholder='Password' value={password} onChange={e => this.onInputChange('password', e)} />
          </div>
        </div>
        <button className='button' disabled={email === '' || password === ''} >Connexion</button>

      </form>

    )
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps (state) {
  return {
    token: state.token
  }
}

export default withRouter(connect(mapStateToProps)(LoginForm))
