import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Item from '../../Common/Item'

import './styles.scss'
import WowClassImage from '../../Common/WowClassImage'

class LootList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { multiClasses: false, loot: null }
  }

  componentDidMount () {
    const { instance, classSpec, slot, whClass, whSubClass, dispatch } = this.props

    dispatch({ type: 'GET_LOOTS', filter: { instance: instance, classSpec: classSpec, slot: slot, whClass: whClass, whSubClass: whSubClass } })

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { instance, classSpec, slot, whClass, whSubClass, dispatch } = this.props
    if ((prevProps.instance !== instance) || (prevProps.classSpec !== classSpec || prevProps.slot !== slot || prevProps.whClass !== whClass || prevProps.whSubClass !== whSubClass)) {
      dispatch({ type: 'GET_LOOTS', filter: { instance: instance, classSpec: classSpec, slot: slot, whClass: whClass, whSubClass: whSubClass } })
    }
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  setMdcClassSpec (id, value) {
    const { instance, classSpec, slot, whClass, whSubClass, dispatch } = this.props

    dispatch({ type: 'SET_MDC_CLASS_SPEC', id: id, value: value, filter: { instance: instance, classSpec: classSpec, slot: slot, whClass: whClass, whSubClass: whSubClass } })
  }

  render () {
    const { multiClasses } = this.state

    const { loots, user, instance, classSpec, slot, whClass, whSubClass, dispatch } = this.props

    // const whClasses = []
    // const whSubClasses = []
    // for (const loot of loots) {
    //   if (loot.class && loot.class !== '' && !whClasses.includes(loot.class)) whClasses.push(loot.class)
    //   if (loot.subclass && loot.subclass !== '' && !whSubClasses.includes(loot.subclass)) whSubClasses.push(loot.subclass)
    // }
    // console.log(whClasses)
    // console.log(whSubClasses)

    return (
      <div className='loot-list'>
        {user.roles.includes('modify_raid') && <div className='field is-pulled-right'>
          <div className='button is-small' onClick={(e) => dispatch({ type: 'SET_LOOT', loot: { wid: 0, bosses: [], classes: [], instance: 'bwl' } })}>Ajouter un item</div>
        </div>}
        <div className='field'>
          <label className="checkbox">
            <input type="checkbox" checked={multiClasses} onClick={() => this.setState({ multiClasses: !multiClasses })}/>
            Afficher uniquement les loots multi-classes
          </label>
        </div>
        <table className='table is-fullwidth is-narrow'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Instance</th>
              <th>Classes</th>
              <th>Needs</th>
              <th>Priorité</th>
              <th>Attributions</th>
              <th>Actions</th>
              {((user && user.roles.includes('modify_raid')) || (user.mdc && user.mdc !== '')) && <th>Actions Staff</th>}
            </tr>
          </thead>
          <tbody>
            {loots.map((loot) => {
              if (multiClasses && ((loot.mdcClassSpecs && Object.keys(loot.mdcClassSpecs).length <= 1) || loot.mdcClassSpecs === undefined)) return null
              return (
                <tr key={loot.wid}>
                  <td><Item wid={loot.wid}/></td>
                  <td>{loot.instance}</td>
                  <td>{loot.mdcClassSpecs && Object.keys(loot.mdcClassSpecs).sort().map((classSpec) => {
                    return (
                      <div key={classSpec}>
                        <span className='image is-16x16'>
                          <WowClassImage keyClass={classSpec.split('-')[0]} keySpec={classSpec.split('-')[1]}/>
                        </span>
                        {loot.mdcClassSpecs[classSpec]}&nbsp;
                      </div>
                    )
                  })}</td>
                  <td>
                    {loot.lootNeeds.map((need) => {
                      return (
                        <div key={need._id}>{need.userId.username}&nbsp;{need.type}</div>
                      )
                    })
                    }
                  </td>
                  <td>
                    {loot.globalText && <span dangerouslySetInnerHTML={{ __html: loot.globalText.replace(/\r\n|\r|\n/g, '<br />') }} />}
                  </td>
                  <td>
                    {loot.assignText && <span dangerouslySetInnerHTML={{ __html: loot.assignText.replace(/\r\n|\r|\n/g, '<br />') }} />}
                  </td>
                  <td>
                    <a className='button is-small' onClick={(e) => dispatch({ type: 'SET_LOOT_NEED', wid: loot.wid, ltype: '+1', filter: { instance: instance, classSpec: classSpec, slot: slot, whClass: whClass, whSubClass: whSubClass } }) } >+1</a>&nbsp;&nbsp;
                    <a className='button is-small' onClick={(e) => dispatch({ type: 'SET_LOOT_NEED', wid: loot.wid, ltype: '+2', filter: { instance: instance, classSpec: classSpec, slot: slot, whClass: whClass, whSubClass: whSubClass } }) } >+2</a>&nbsp;&nbsp;
                    <a className='button is-small' title='collection' onClick={(e) => dispatch({ type: 'SET_LOOT_NEED', wid: loot.wid, ltype: '+C', filter: { instance: instance, classSpec: classSpec, slot: slot, whClass: whClass, whSubClass: whSubClass } }) } >+C</a>
                  </td>
                  {((user && user.roles.includes('modify_raid')) || (user.mdc && user.mdc !== '')) && <td>
                    {user.mdc && user.mdc !== '' && <span>
                      <span className='image is-24x24'><WowClassImage keyClass={user.mdc.split('-')[0]} keySpec={user.mdc.split('-')[1]}/></span>
                      <div className="select is-small" >
                        <select value={loot.mdcClassSpecs && loot.mdcClassSpecs[user.mdc] ? loot.mdcClassSpecs[user.mdc] : ''} onChange={(e) => this.setMdcClassSpec(loot._id, e.target.value)}>
                          <option value=''/>
                          <option value='+1'>+1</option>
                          <option value='bis-p4'>BIS P4</option>
                          <option value='bis-p5'>BIS P5</option>
                          <option value='bis-p6'>BIS P6</option>
                        </select>
                      </div>
                    </span>}
                    {(user.roles.includes('modify_raid') || (user.mdc && user.mdc !== '')) && <span>
                      &nbsp;&nbsp;<a onClick={() => dispatch({ type: 'SET_LOOT', loot: loot })}><i className='fas fa-pen'/></a>
                    </span> }
                    {user.roles.includes('modify_raid') && <span >
                      &nbsp;&nbsp;<a className='has-text-danger' onClick={() => { if (confirm('Confirmer la suppression de l\'objet')) { dispatch({ type: 'DELETE_LOOT', id: loot._id, filter: { instance: instance, classSpec: classSpec, slot: slot, whClass: whClass, whSubClass: whSubClass } }) } } }><i className='fas fa-times'/></a>
                    </span> }

                  </td>}

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    )
  }
}
LootList.propTypes = {
  dispatch: PropTypes.func,
  instance: PropTypes.string,
  classSpec: PropTypes.string,
  slot: PropTypes.string,
  loots: PropTypes.array,
  whClass: PropTypes.string,
  whSubClass: PropTypes.string,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    loots: state.loots,
    user: state.user
  }
}
export default connect(mapStateToProps)(LootList)
