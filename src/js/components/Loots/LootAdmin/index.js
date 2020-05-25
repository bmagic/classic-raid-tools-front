import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bossList, wowClass } from '../../../lib/wow'
import WowClassImage from '../../Common/WowClassImage'

import './styles.scss'
class LootAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = { wid: 0, bosses: [], classes: [] }
  }

  componentDidMount () {
  }

  classSpecisActive (wClass, spec) {
    let found = false
    for (const classSpec of this.state.classes) {
      if (classSpec.class === wClass && classSpec.spec === spec) {
        console.log(wClass, spec)

        found = true
      }
    }
    return found
  }

  onClassSpecClick (e, wClass, spec) {
    const tmpArray = this.state.classes.slice(0)

    let found = -1
    for (const index in tmpArray) {
      const classSpec = tmpArray[index]
      if (classSpec.class === wClass && classSpec.spec === spec) {
        found = index
      }
    }
    if (found === -1) {
      tmpArray.push({ class: wClass, spec: spec })
    } else {
      tmpArray.splice(found, 1)
    }
    console.log(tmpArray)
    this.setState({ classes: tmpArray })
  }

  addItem (e) {
    e.preventDefault()
    const { wid, bosses, classes } = this.state
    this.props.dispatch({ type: 'ADD_ITEM_LOOT', wid: wid, bosses: bosses, classes: classes })
  }

  render () {
    const { instance } = this.props
    console.log(this.state)
    return (
      <div className='loot-admin'>
        <div className='box'>
          <form onSubmit={(e) => this.addItem(e)}>
            <div className="field ">
              <p className="control">
                <input className="input" type="number" value={this.state.wid} onChange={(e) => this.setState({ wid: e.target.value })} placeholder="Wow item id"/>
              </p>
            </div>
            <div className='field is-grouped'>
              {bossList[instance].map((boss) => {
                return (
                  <p key={boss.id} className='control'>
                    <label className="checkbox">
                      <input type="checkbox"/>
                      {boss.name}
                    </label>
                  </p>
                )
              })}
            </div>

            <div className='field is-grouped'>
              {Object.keys(wowClass).map((keyClass) => {
                return Object.keys(wowClass[keyClass]).map((keySpec) => {
                  return (
                    <div className="control" key={`${keyClass}-${keySpec}`}>
                      <button title={`${keyClass} ${keySpec}`} className={`button is-small classSpec ${this.classSpecisActive(keyClass, keySpec) ? 'is-dark' : ''} bg-class-${keyClass}`} onClick={(e) => this.onClassSpecClick(e, keyClass, keySpec)}>
                        <span className="icon">
                          <WowClassImage keySpec={keySpec} keyClass={keyClass} />
                        </span>
                      </button>
                    </div>
                  )
                })
              })}
            </div>
            <div className='field'>

              <p className="control">
                <button className='button'>Ajouter</button>
              </p>
            </div>
          </form>
        </div>

      </div>

    )
  }
}
LootAdmin.propTypes = {
  dispatch: PropTypes.func,
  instance: PropTypes.string
}

function mapStateToProps (state) {
  return {

  }
}
export default connect(mapStateToProps)(LootAdmin)
