import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import './styles.scss'
import { Link } from 'react-router-dom'
import { wowClass } from '../../../lib/wow'
const queryString = require('query-string')

class PresencesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { instance: 'bwl+aq40',  spec: '', wClass: ''}
  }

  componentDidMount () {
    const hash = queryString.parse(location.hash)
    const wClass = hash.class || this.state.wClass
    const spec = hash.spec || this.state.spec
    const instance = hash.instance || this.state.instance

    this.setState({ spec: spec, wClass: wClass, instance:instance })
    this.props.dispatch({ type: 'GET_PRESENCES', instance: instance })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const hash = queryString.stringify({ spec: this.state.spec, class: this.state.wClass, instance: this.state.instance })
    location.hash = hash
  }

  onInstanceChange (instance) {
    this.setState({ instance: instance })
    this.props.dispatch({ type: 'GET_PRESENCES', instance: instance })
  }

  render () {
    const { instance, spec, wClass } = this.state
    const { presences,presencesUsers,user } = this.props
    const usersList = {}
    const charactersList = {}
    const raidsList = {}
    const presencesList = {}
    const raids = []
    const raidsWeight={}


    for (const presence of presences) {
      if(raidsWeight[moment(presence.date).format('L')]===undefined) {
        raidsWeight[moment(presence.date).format('L')]=[presence.reportId]
      }else{
        if(!raidsWeight[moment(presence.date).format('L')].includes(presence.reportId))
          raidsWeight[moment(presence.date).format('L')].push(presence.reportId)
      }
      if (!raids.includes(presence.reportId)) {
        raids.push(presence.reportId)
        raidsList[presence.reportId] = presence
      }
      if (presence.userId && presence.userId._id) {
        usersList[presence.userId._id] = presence.userId

        if(presence.characterId && presence.characterId.main){
          charactersList[presence.userId._id] = presence.characterId
        }

        if (presencesList[presence.userId._id] === undefined) { presencesList[presence.userId._id] = {} }
        presencesList[presence.userId._id][presence.reportId] = presence
      }
    }
    for (const presencesUser of presencesUsers){
      if(presencesList[presencesUser._id]===undefined){

        usersList[presencesUser._id] = presencesUser
        presencesList[presencesUser._id]={}
      }
    }

    const userPercent = {}
    const tmpRaids = raids.slice(0).reverse()
    for (const key of Object.keys(presencesList)) {
      let count = 0
      let total = 0
      for (const tmpRaid of tmpRaids) {

        const raidWeight = 1 / (raidsWeight[moment(raidsList[tmpRaid].date).format('L')].length)
        if (presencesList[key][tmpRaid]) {
          count = count + raidWeight
          total = total + raidWeight
        } else {
          if (total !== 0) { total = total + raidWeight }
        }
      }
      userPercent[key] = isNaN(count / total)? 0 : count / total
    }

    const userPercentArray = Object.entries(userPercent).sort((a, b) => b[1] - a[1])


    return (
      <div className='presences-list'>
        <div className='field'>
          <div className="select is-small" value={instance} onChange={(e) => this.onInstanceChange(e.target.value)}>
            <select>
              <option value='bwl+aq40'>BWL + AQ40</option>
              <option value='aq40'>Temple of Ahn'Qiraj</option>
              <option value='aq20'>Ruins of Ahn'Qiraj</option>
              <option value='bwl'>Black Wing Lair</option>
              <option value='zg'>{'Zul\'Gurub'}</option>
              <option value='mc'>Molten Core</option>
              <option value='onyxia'>Onyxia</option>
              <option value=''>Tous les raids</option>
            </select>
          </div>
        </div>
        <div className='field  is-grouped'>
          <div className='control'>
            <div className="select">
              <select value={spec} onChange={(e) => { this.setState({ spec: e.target.value, wClass: '' }) }}>
                <option value=''>All</option>
                <option>tank</option>
                <option>heal</option>
                <option>dd</option>
                <option>cac</option>
              </select>
            </div>
          </div>
          <div className='control'>
            <div className="select">
              <select value={wClass} onChange={(e) => { this.setState({ wClass: e.target.value }) }}>
                <option></option>
                {Object.keys(wowClass).map((key, index) => {
                  if (wowClass[key][spec] || spec === '') {
                    return (
                      <option key={index}>{key}</option>
                    )
                  } else {
                    return null
                  }
                })
                }
              </select>
            </div>
          </div>

        </div>
        <div className="table-container">

          <table className='table is-bordered is-narrow'>
            <thead>
              <tr>
                <th className='is-size-7'>Raider</th>
                <th className='is-size-7'>Présence</th>
                {raids.map((raid) => {
                  return <th className='is-size-7 has-text-centered' key={`head-${raid}`}>
                    <Link to={`/raid/${raidsList[raid]._id}`}>
                    {(instance === '' || instance==='bwl+aq40') && <div>{raidsList[raid].instance}</div>}
                    <div>{moment(raidsList[raid].date).format('DD/MM')}</div>
                    </Link>
                  </th>
                })}
              </tr>
            </thead>
            <tbody>
              {userPercentArray.map((array) => {
                const key = array[0]
                if(!(usersList[key]?.roles?.includes('member')) && !(usersList[key]?.roles?.includes('apply')) && !(usersList[key]?.roles?.includes('casu'))) return null

                if(spec!== '' && charactersList[key] === undefined) return null
                if(wClass!== '' && charactersList[key] === undefined) return null

                if (spec!== '' && spec!==charactersList[key].spec) return null
                if (wClass!== '' && wClass!==charactersList[key].class) return null

                return (
                  <tr key={key}>
                    <td className='is-size-7'>
                      {usersList[key].username}
                      {usersList[key]?.roles?.includes('apply') && <sup>a</sup>}
                      {usersList[key]?.roles?.includes('casu') && <sup>c</sup>}
                    </td>
                    <td>{(userPercent[key] * 100).toFixed(0)}%</td>
                    {raids.map((raid) => {

                      if (presencesList[key][raid]  && presencesList[key][raid].status==='ok') {
                        return <td className='has-background-success has-text-centered' key={raid} title={presencesList[key][raid]?.characterId ? presencesList[key][raid]?.characterId?.name : 'Personnage inconnu'}>{presencesList[key][raid]?.characterId && !presencesList[key][raid]?.characterId?.main && <span className='has-text-black'>R</span>}</td>
                      } else if(presencesList[key][raid] && presencesList[key][raid].status==='bench' ){
                        if(user && user.roles && user.roles.includes('modify_raid')){
                          return <td className='has-background-warning' key={raid} onClick={()=>this.props.dispatch({type:'DELETE_PRESENCE_BENCH', id: presencesList[key][raid]._id, instance:raidsList[raid].instance})}/>
                        }else {
                          return <td className='has-background-warning' key={raid}/>
                        }
                      }else{
                        if(user && user.roles && user.roles.includes('modify_raid')){
                          return <td className='has-background-danger' key={raid} onClick={()=>this.props.dispatch({type:'CREATE_PRESENCE_BENCH', presence: {userId:usersList[key]._id, status:'bench', reportId:raid, date:raidsList[raid].date,instance:raidsList[raid].instance}})}/>
                        }else {
                          return <td className='has-background-danger' key={raid}/>
                        }

                      }
                    })}

                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
PresencesList.propTypes = {
  dispatch: PropTypes.func,
  presences: PropTypes.array,
  presencesUsers: PropTypes.array,
  user:PropTypes.object
}

function mapStateToProps (state) {
  return {
    presences: state.presences,
    presencesUsers: state.presencesUsers,
    user:state.user
  }
}
export default connect(mapStateToProps)(PresencesList)
