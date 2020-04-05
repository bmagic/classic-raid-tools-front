import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

class RaidForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { date: moment().format('YYYY-MM-DDTHH:mm'), instance: 'mc' }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (key, e) {
    const state = {}
    state[key] = e.target.value
    this.setState(state)
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.dispatch({ type: 'CREATE_RAID', date: this.state.date, instance: this.state.instance })
    this.setState({ date: moment().format('YYYY-MM-DDTHH:mm'), instance: 'mc' })
  }

  render () {
    if (!this.props.user.roles.includes('modify_raid')) return null
    return (
      <div className='box'>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className='field is-horizontal'>
            <div className="field-body">
              <div className='field is-narrow'>
                <div className='control'>
                  <input className='input is-small' type='datetime-local' value={this.state.date} onChange={e => this.onChange('date', e)} />
                </div>
              </div>
              <div className='field is-narrow'>
                <div className="control" onChange={e => this.onChange('instance', e)}>
                  <label className="radio">
                    <input type="radio" name="instance" value="onyxia" checked={this.state.instance === 'onyxia'}/>Onyxia
                  </label>
                  <label className="radio">
                    <input type="radio" name="instance" value="mc" checked={this.state.instance === 'mc'}/>Molten Core
                  </label>
                  <label className="radio">
                    <input type="radio" name="instance" value="bwl" checked={this.state.instance === 'bwl'}/>Black Wing Lair
                  </label>
                  <label className="radio">
                    <input type="radio" name="instance" value="zg" checked={this.state.instance === 'zg'}/>{'Zul\'Gurub'}
                  </label>
                  <label className="radio">
                    <input type="radio" name="instance" value="aq20" checked={this.state.instance === 'aq20'}/>{'Ahn\'Qiraj 20'}
                  </label>
                  <label className="radio">
                    <input type="radio" name="instance" value="aq40" checked={this.state.instance === 'aq40'}/>{'Ahn\'Qiraj 40'}
                  </label>
                  <label className="radio">
                    <input type="radio" name="instance" value="naxxramas" checked={this.state.instance === 'naxxramas'}/>Naxxramas
                  </label>
                </div>
              </div>

              <div className='field is-narrow'>
                <button type='submit' className='button is-small is-primary' disabled={this.state.instance === ''}>
                  Ajouter un raid
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    )
  }
}

RaidForm.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(RaidForm)
