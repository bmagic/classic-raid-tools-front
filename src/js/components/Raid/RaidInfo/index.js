import React from 'react'
import { connect } from 'react-redux'
import WowRaidImage from '../../Common/WowRaidImage'
import PropTypes from 'prop-types'
import moment from 'moment'
import CharactersRegistrationForm from '../CharactersRegistrationForm'

import './styles.scss'
import { withRouter } from 'react-router-dom'
import CharactersRegistrationList from '../CharactersRegistrationList'
class RaidInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = { edit: false, title: '', main: false, date: '', logs: '', gdoc: '', infos: '' }
    this.activateEdit = this.activateEdit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  activateEdit () {
    const { date, title, main, logs, gdoc, infos } = this.props.raid
    this.setState({ edit: true, title: title, main: main, date: moment(date).format('YYYY-MM-DDTHH:mm'), logs: logs || '', gdoc: gdoc || '', infos: infos || '' })
  }

  onInputChange (key, e) {
    const state = {}
    state[key] = e.target.value
    this.setState(state)
  }

  onSubmit (e) {
    e.preventDefault()
    const { date, title, main, logs, gdoc, infos } = this.state
    const { raidId } = this.props
    this.props.dispatch({ type: 'UPDATE_RAID', id: raidId, raid: { date: moment(date).toISOString(), title: title, main: main, logs: logs, gdoc: gdoc, infos: infos } })
    this.setState({ edit: false })
  }

  render () {
    const { user, raid, dispatch, history, raidId } = this.props
    const { edit, title, main, date, logs, gdoc, infos } = this.state
    if (raid === null) {
      return <div className='box'>Chargement en cours...</div>
    }
    return (
      <div className='raid-info'>
        <div className='columns'>
          <div className='column is-8'>
            <div className='box'>
              {user && user.roles && user.roles.includes('modify_raid') && !edit &&
                <span className='edit-button is-pulled-right'><a onClick={this.activateEdit} ><i
                  className='fas fa-pen'/>&nbsp;Edit</a></span>}
              {!edit && <div>

                <p className='info-item'>
                  <span className='has-text-weight-bold'>Date:</span><br/><span
                    className='is-capitalized'>{moment(raid.date).format('dddd DD MMMM')}</span>
                </p>

                <p className='info-item'>
                  <span
                    className='has-text-weight-bold'>Heure de pull:</span><br/>{moment(raid.date).format('HH')}h{moment(raid.date).format('mm')}
                </p>
                {raid.logs && raid.logs !== '' && <p className='info-item'>
                  <span
                    className='has-text-weight-bold'>Warcraftlogs:</span><br/><a href={raid.logs}>{raid.logs}</a>
                </p>}
                {raid.gdoc && raid.gdoc !== '' && <p className='info-item'>
                  <span
                    className='has-text-weight-bold'>Attrib/Assign:</span><br/><a href={raid.gdoc}>{raid.gdoc}</a>
                </p>}
                {raid.infos && raid.infos !== '' && <p className='info-item'>
                  <span
                    className='has-text-weight-bold'>Infos utiles:</span><br/><div dangerouslySetInnerHTML={{ __html: raid.infos.replace(/\r\n|\r|\n/g, '<br />') }}/>
                </p>}
              </div>}
              {edit && <div>
                <form onSubmit={this.onSubmit}>
                  <div className='field '>
                    <label className="label">Titre</label>
                    <div className='control'>
                      <input className='input' type='title' value={title} onChange={e => this.onInputChange('title', e)} />
                    </div>
                  </div>
                  <div className='field '>
                    <label className="checkbox">
                      <input type="checkbox" checked={main} onChange={() => this.setState({ main: !main })}/>
                      Raid Principal
                    </label>
                  </div>
                  <div className='field '>
                    <label className="label">Date</label>
                    <div className='control'>
                      <input className='input' type='datetime-local' value={date} onChange={e => this.onInputChange('date', e)} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">WarcraftLogs</label>
                    <div className="control">
                      <input className="input" type="text" value={logs} onChange={(e) => this.onInputChange('logs', e)} placeholder="Url vers WarcraftLogs"/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Attrib/Assign</label>
                    <div className="control">
                      <input className="input" type="text" value={gdoc} onChange={(e) => this.onInputChange('gdoc', e)} placeholder="Url vers le GoogleDoc"/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Infos utiles:</label>
                    <div className="control">
                      <textarea className="textarea" placeholder="Qui groupe ? Qui TP ? Vers quelle heure ?" value={infos} onChange={(e) => this.onInputChange('infos', e)}/>
                    </div>
                  </div>
                  <div className="field is-pulled-right ">

                    <a onClick={() => {
                      if (confirm('Confirmer la suppression du raid')) {
                        history.push('/')
                        dispatch({ type: 'DELETE_RAID', id: raidId })
                      }
                    }} className="button is-danger">
                      <span className="icon is-small">
                        <i className='fas fa-trash'/>
                      </span>
                      <span>Supprimer</span>
                    </a>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button type='submit' className="button is-link">Sauvegarder</button>
                    </div>
                    <div className="control">
                      <a onClick={() => this.setState({ edit: false })} className="button is-link is-light">Annuler</a>
                    </div>
                  </div>
                </form>
              </div>}
            </div>
            <CharactersRegistrationList raidId={raidId}/>

          </div>
          <div className='column is-4'>
            <div className='logo box has-text-centered'>
              <WowRaidImage instance={raid.instance}/>
              {raid.title && raid.title !== '' &&
              <div className='subtitle'>{raid.title}</div>
              }
              {raid.main && <div className='tag is-light is-primary'>Raid principal</div>}
            </div>
            <CharactersRegistrationForm raidId={raidId}/>
          </div>
        </div>
      </div>
    )
  }
}

RaidInfo.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  raid: PropTypes.object,
  history: PropTypes.object,
  raidId: PropTypes.string
}

function mapStateToProps (state) {
  return {
    user: state.user,
    raid: state.raid
  }
}
export default withRouter(connect(mapStateToProps)(RaidInfo))
