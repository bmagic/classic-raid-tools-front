import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import './styles.scss'

class PresencesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { instance: 'bwl' }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_PRESENCES', instance: this.state.instance })
  }

  onInstanceChange (instance) {
    this.setState({ instance: instance })
    this.props.dispatch({ type: 'GET_PRESENCES', instance: instance })
  }

  render () {
    const { instance } = this.state
    const { presences,user } = this.props
    const usersList = {}
    const raidsList = {}
    const presencesList = {}
    const raids = []

    for (const presence of presences) {
      if (!raids.includes(presence.reportId)) {
        raids.push(presence.reportId)
        raidsList[presence.reportId] = presence
      }
      if (presence.userId && presence.userId._id) {
        usersList[presence.userId._id] = presence.userId

        if (presencesList[presence.userId._id] === undefined) { presencesList[presence.userId._id] = {} }
        presencesList[presence.userId._id][presence.reportId] = presence
      }
    }

    const userPercent = {}
    const tmpRaids = raids.slice(0).reverse()
    for (const key of Object.keys(presencesList)) {
      let count = 0
      let total = 0
      for (const tmpRaid of tmpRaids) {
        if (presencesList[key][tmpRaid]) {
          count++
          total++
        } else {
          if (total !== 0) { total++ }
        }
      }
      userPercent[key] = count / total
    }

    const userPercentArray = Object.entries(userPercent).sort((a, b) => b[1] - a[1])

    return (
      <div className='presences-list'>
        <div className='field'>
          <div className="select is-small" value={instance} onChange={(e) => this.onInstanceChange(e.target.value)}>
            <select>
              <option value='bwl'>Black Wing Lair</option>
              <option value='zg'>{'Zul\'Gurub'}</option>
              <option value='mc'>Molten Core</option>
              <option value='onyxia'>Onyxia</option>
              <option value=''>Tous les raids</option>
            </select>
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
                    {instance === '' && <div>{raidsList[raid].instance}</div>}
                    <div>{moment(raidsList[raid].date).format('DD/MM')}</div>
                  </th>
                })}
              </tr>
            </thead>
            <tbody>
              {userPercentArray.map((array) => {
                const key = array[0]
                if(!(usersList[key]?.roles?.includes('member')) && !(usersList[key]?.roles?.includes('apply'))) return null

                return (
                  <tr key={key}>
                    <td className='is-size-7'>{usersList[key].username}</td>
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
  user:PropTypes.object
}

function mapStateToProps (state) {
  return {
    presences: state.presences,
    user:state.user
  }
}
export default connect(mapStateToProps)(PresencesList)
