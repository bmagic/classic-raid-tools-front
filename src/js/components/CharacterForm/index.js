import React from 'react'
import WowClassImage from '../WowClassImage'
import { wowClass } from '../../lib/wow'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class CharacterForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '', class: '', spec: '' }

    this.onNameChange = this.onNameChange.bind(this)
    this.onClassSpecClick = this.onClassSpecClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  onNameChange (key, e) {
    const state = {}
    state[key] = e.target.value
    this.setState(state)
  }

  onClassSpecClick (e, wClass, spec) {
    e.preventDefault()

    this.setState({ class: wClass, spec: spec })
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.dispatch({ type: 'CREATE_USER_CHARACTER', name: this.state.name, class: this.state.class, spec: this.state.spec })
    this.setState({ class: '', spec: '', name:'' })

  }

  render () {
    return (
      <div className='character-form'>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className='field'>
            <div className='control'>
              <input className='input' type='text' placeholder='Name' value={this.state.name} onChange={e => this.onNameChange('name', e)} />
            </div>
          </div>
          <div className="field is-grouped is-grouped-multiline">

            {Object.keys(wowClass).map((keyClass) => {
              return Object.keys(wowClass[keyClass]).map((keySpec) => {
                return <div className="control" key={`${keyClass}-${keySpec}`}>
                  <button title={`${keyClass} ${keySpec}`} className={`button ${this.state.class === keyClass && this.state.spec === keySpec ? 'is-active' : ''} bg-class-${keyClass}`} onClick={(e) => this.onClassSpecClick(e, keyClass, keySpec)}>
                    <span className="icon">
                      <WowClassImage keySpec={keySpec} keyClass={keyClass} />
                    </span>
                  </button>
                </div>
              })
            })}

          </div>
          <button type='submit' className='button' disabled={this.state.name === '' || this.state.class === '' || this.state.spec === ''}>
            Add character
          </button>
        </form>
      </div>

    )
  }
}

CharacterForm.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(CharacterForm)
