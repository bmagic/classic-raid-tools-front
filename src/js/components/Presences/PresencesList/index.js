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
    const { presences } = this.props
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
        presencesList[presence.userId._id][presence.reportId] = presence.characterId ? presence : null
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
                  return <th className='is-size-7 has-text-centered' key={raid}>
                    {instance === '' && <div>{raidsList[raid].instance}</div>}
                    <div>{moment(raidsList[raid].date).format('DD/MM')}</div>
                  </th>
                })}
              </tr>
            </thead>
            <tbody>
              {userPercentArray.map((array) => {
                const key = array[0]
                return (
                  <tr key={key}>
                    <td className='is-size-7'>{usersList[key].username}</td>
                    <td>{(userPercent[key] * 100).toFixed(0)}%</td>
                    {raids.map((raid) => {
                      if (presencesList[key][raid] !== undefined) {
                        return <td className='has-background-success' key={raid} title={presencesList[key][raid].characterId ? presencesList[key][raid].characterId.name : 'Personnage inconnu'}/>
                      } else {
                        return <td className='has-background-danger' key={raid} />
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
  presences: PropTypes.array
}

function mapStateToProps (state) {
  return {
    presences: state.presences
  }
}
export default connect(mapStateToProps)(PresencesList)