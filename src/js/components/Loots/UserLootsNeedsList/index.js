import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../../Common/Item'
import { Link } from 'react-router-dom'
import './styles.scss'
import NPC from '../../Common/NPC'

class UserLootsNeedsList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER_LOOTS_NEEDS' })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { userLootsNeeds, dispatch } = this.props
    if (userLootsNeeds.length === 0) {
      return (
        <div className='user-loots-needs-list'>
        Aucun objet encore dans la liste de souhait : <Link to='/loots'>Ajoutez des objets</Link>
        </div>
      )
    }

    const instances = ['onyxia', 'mc', 'bwl', 'zg', 'aq20', 'aq40', 'naxxramas']

    const userLootsNeedsSorted = {}
    for (const userLootNeed of userLootsNeeds) {
      if (!userLootsNeedsSorted[userLootNeed.instance]) userLootsNeedsSorted[userLootNeed.instance] = []
      userLootsNeedsSorted[userLootNeed.instance].push(userLootNeed)
    }

    return (
      <div className='user-loots-needs-list'>
        {instances.map((instance) => {
          if (!userLootsNeedsSorted[instance]) return null
          return (
            <div key={instance} >
              <h2 className='is-uppercase'>{instance}</h2>

              <table className='table is-narrow is-fullwidth'>
                <tbody>
                  {userLootsNeedsSorted[instance].map((userLootNeed) => {
                    return (
                      <tr key={userLootNeed._id}>
                        <td><Item wid={parseInt(userLootNeed.wid)}/> </td>
                        <td>{userLootNeed.class}</td>
                        <td>{userLootNeed.subclass}</td>
                        <td>{userLootNeed.type}</td>
                        <td><a onClick={ () => {
                          if (confirm('Confirmer la suppression de l\'objet')) {
                            dispatch({ type: 'DELETE_USER_LOOT_NEED', id: userLootNeed._id })
                          }
                        }}><i className='fas fa-trash has-text-danger'/></a></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}

        {JSON.stringify()}
      </div>

    )
  }
}
UserLootsNeedsList.propTypes = {
  dispatch: PropTypes.func,
  userLootsNeeds: PropTypes.array
}

function mapStateToProps (state) {
  return {
    loots: state.loots,
    userLootsNeeds: state.userLootsNeeds
  }
}
export default connect(mapStateToProps)(UserLootsNeedsList)
