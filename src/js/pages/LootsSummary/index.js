import React, { Fragment } from 'react'
import Layout from '../../components/Common/Layout'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bossList } from '../../lib/wow'
import NPC from '../../components/Common/NPC'
import Item from '../../components/Common/Item'

class LootsSummary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { openInstance: '' }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_LOOTS_NEEDS' })

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
    const { lootsNeeds } = this.props
    const { openInstance } = this.state

    const instances = ['onyxia', 'mc', 'bwl', 'zg', 'aq20', 'aq40', 'naxxramas']

    const lootsOrdered = {}

    for (const loot of lootsNeeds) {
      if (!lootsOrdered[loot.instance]) lootsOrdered[loot.instance] = { '+1': 0, '+2': 0, '+C': 0 }
      lootsOrdered[loot.instance][loot.type] = lootsOrdered[loot.instance][loot.type] + 1

      for (const boss of loot.bosses) {
        if (!lootsOrdered[loot.instance][boss]) lootsOrdered[loot.instance][boss] = { count: 0, items: {} }
        if (loot.type === '+1') {
          lootsOrdered[loot.instance][boss].count = lootsOrdered[loot.instance][boss].count + 1
          if (!lootsOrdered[loot.instance][boss].items[loot.wid]) lootsOrdered[loot.instance][boss].items[loot.wid] = []
          lootsOrdered[loot.instance][boss].items[loot.wid].push(loot.username)
        }
      }
    }

    return (
      <Layout >
        {instances.map((instance) => {
          if (!lootsOrdered[instance]) return null
          return (
            <div key={instance} onClick={() => this.setState({ openInstance: openInstance !== instance ? instance : '' })}>
              <div className='columns '>
                <div className='column is-3 has-text-centered has-background-grey-dark'>
                  <h2 className='title is-uppercase'>{instance}</h2>
                </div>
                <div className='column is-3 has-text-centered has-background-grey-dark'>
                  <span className='is-size-4  has-text-weight-bold has-text-success'>{lootsOrdered[instance]['+1']}</span>&nbsp;&nbsp;(Need +1)
                </div>
                <div className='column is-3 has-text-centered has-background-grey-dark'>
                  <span className='is-size-4  has-text-weight-bold has-text-warning'>{lootsOrdered[instance]['+2']}</span>&nbsp;&nbsp;(Need +2)
                </div>
                <div className='column is-3 has-text-centered has-background-grey-dark'>
                  <span className='is-size-4  has-text-weight-bold '>{lootsOrdered[instance]['+C']}</span>&nbsp;&nbsp;(Need collection)
                </div>
              </div>
              {openInstance === instance && <Fragment>
                {bossList[instance].map((boss) => {
                  if (!lootsOrdered[instance][boss] || lootsOrdered[instance][boss].count === 0) return null
                  return (
                    <div key={`${instance}-${boss}`}>
                      <NPC wid={parseInt(boss)}/>
                      <div className='columns is-multiline'>

                        {Object.keys(lootsOrdered[instance][boss].items).map((wid) => {
                          if (lootsOrdered[instance][boss].items[wid].length === 0) return null
                          return (
                            <div className='column is-narrow is-3' key={`${instance}-${boss}-${wid}`}>
                              <div className='box' >
                                <Item wid={parseInt(wid)}/>
                                <div>
                                  {lootsOrdered[instance][boss].items[wid].sort().join(', ')}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
                }
              </Fragment>
              }
              <hr/>
            </div>

          )
        })}
      </Layout>
    )
  }
}

LootsSummary.propTypes = {
  dispatch: PropTypes.func,
  lootsNeeds: PropTypes.array
}
function mapStateToProps (state) {
  return {
    lootsNeeds: state.lootsNeeds
  }
}
export default connect(mapStateToProps)(LootsSummary)
