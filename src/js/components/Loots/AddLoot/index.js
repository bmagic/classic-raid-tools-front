import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bossList } from '../../../lib/wow'
import EscapeOutside from 'react-escape-outside'
import NPC from '../../Common/NPC'
import './styles.scss'

class AddLoot extends React.Component {
  constructor (props) {
    super(props)
    this.state = { wid: 0, bosses: [], instance: 'bwl', globalText: '', assignText: '' }
  }

  onBossClick (boss) {
    const { bosses } = this.state
    if (bosses.includes(boss)) {
      bosses.splice(bosses.indexOf(boss), 1)
    } else {
      bosses.push(boss)
    }

    this.setState({ bosses: bosses })
  }

  submit (e) {
    e.preventDefault()
    const { wid, bosses, instance, mdcClassSpecs, globalText, assignText } = this.state
    const { loot, filter, user } = this.props
    if (user.roles.includes('modify_raid')) {
      if (loot._id) {
        this.props.dispatch({ type: 'UPDATE_LOOT', id: loot._id, loot: { wid: wid, bosses: bosses, instance: instance, globalText: globalText, assignText: assignText, mdcClassSpecs: mdcClassSpecs }, filter: filter })
        this.closeModal()
      } else {
        this.props.dispatch({ type: 'CREATE_LOOT', loot: { wid: wid, bosses: bosses, instance: instance, globalText: globalText, assignText: assignText }, filter: filter })
      }
    } else {
      this.props.dispatch({ type: 'UPDATE_LOOT_ASSIGN', id: loot._id, value: assignText, filter: filter })
      this.closeModal()
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.loot === null && this.props.loot !== null) {
      this.setState({ _id: null, globalText: '', assignText: '' })
      this.setState(this.props.loot)
    }
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidMount () {
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  closeModal () {
    this.props.dispatch({ type: 'SET_LOOT', loot: null })
  }

  render () {
    const { _id, wid, bosses, instance, globalText, assignText } = this.state
    const { user, loot } = this.props
    const wowRaids = ['onyxia', 'mc', 'bwl', 'zg', 'aq20', 'aq40', 'naxxramas']

    if (!user || !((user && user.roles.includes('modify_raid')) || (user.mdc && user.mdc !== ''))) return null
    if (loot === null) return null

    return (
      <EscapeOutside onEscapeOutside={() => this.closeModal()}>
        <div className={'modal is-active'}>
          <div className='modal-background'/>
          <div className='modal-content'>
            <div className='box add-loot'>
              <form onSubmit={(e) => this.submit(e)}>
                {user.roles.includes('modify_raid') && <div className='field'>
                  <div className="control">
                    {wowRaids.map((raidKey) => {
                      return (
                        <label key={raidKey} className="radio">
                          <input value={raidKey} checked={instance === raidKey } type="radio" name="instance" onChange={(e) => this.setState({ instance: e.target.value, bosses: [] }) }/>
                          {raidKey}
                        </label>
                      )
                    })}

                  </div>
                </div>}
                {user.roles.includes('modify_raid') && <div className="field">
                  <p className="control">
                    <input className="input is-small" type="number" value={wid} onChange={(e) => this.setState({ wid: e.target.value })} placeholder="Wow item id"/>
                  </p>
                </div>}
                {user.roles.includes('modify_raid') && <div className='field is-grouped is-grouped-multiline'>
                  {bossList[instance] && bossList[instance].map((boss) => {
                    return (
                      <p key={boss} className='control'>
                        <label className="checkbox" onClick={(e) => this.onBossClick(boss)}>
                          <input type="checkbox" onChange={() => {}} checked={bosses.includes(boss) || bosses.includes(boss.toString())} value={boss} />
                          <NPC wid={boss} />
                        </label>
                      </p>
                    )
                  })}
                </div>}
                {user.roles.includes('modify_raid') && <div className=''>
                  <p className="control">
                    <textarea className="textarea is-small is-expanded" value={globalText || ''} onChange={(e) => this.setState({ globalText: e.target.value })} placeholder="Class Assign"/>
                  </p>
                </div>}
                {user.mdc && user.mdc !== '' && <div className=''>
                  <p className="control">
                    <textarea className="textarea is-small is-expanded" value={assignText || ''} onChange={(e) => this.setState({ assignText: e.target.value })} placeholder="Player Assign"/>
                  </p>
                </div>}
                <div className='field'>
                  <p className="control">
                    <button className='button' disabled={wid === 0}>{_id === null ? 'Ajouter' : 'Modifier'}</button>
                  </p>
                </div>
              </form>
            </div>
            <button className='modal-close is-large' aria-label='close' onClick={(e) => this.closeModal()}/>

          </div>
        </div>

      </EscapeOutside>

    )
  }
}
AddLoot.propTypes = {
  dispatch: PropTypes.func,
  loot: PropTypes.object,
  user: PropTypes.object,
  filter: PropTypes.object
}

function mapStateToProps (state) {
  return {
    loot: state.loot,
    user: state.user
  }
}

export default connect(mapStateToProps)(AddLoot)
