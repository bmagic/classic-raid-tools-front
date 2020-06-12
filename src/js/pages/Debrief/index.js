import React from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import DebriefEnchantsIssues from '../../components/Debrief/DebriefEnchantsIssues'
import EnchantsList from '../../components/Debrief/EnchantsList'
import { wowClass } from '../../lib/wow'
import DebriefBuffIssues from '../../components/Debrief/DebriefBuffsIssues'
const queryString = require('query-string')

class Debrief extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selectedTab: 0, spec: '', wClass: '' }
  }

  componentDidMount () {
    const hash = queryString.parse(location.hash)
    const wClass = hash.class || this.state.wClass
    const spec = hash.spec || this.state.spec
    const selectedTab = hash.selectedTab ? parseInt(hash.selectedTab) : this.state.selectedTab

    this.setState({ spec: spec, wClass: wClass, selectedTab: selectedTab })

    this.props.dispatch({ type: 'GET_DEBRIEF_RAIDS' })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const hash = queryString.stringify({ spec: this.state.spec, class: this.state.wClass, selectedTab: this.state.selectedTab })
    location.hash = hash

    const prevRaid = prevProps.debriefRaids[prevState.selectedTab] || {}
    const raid = this.props.debriefRaids[this.state.selectedTab]

    if (raid && (prevRaid._id !== raid._id || prevRaid.instance !== raid.instance)) {
      this.props.dispatch({ type: 'GET_DEBRIEF', date: raid._id, instance: raid.instance })
    }
  }

  render () {
    const { debriefRaids } = this.props
    const { selectedTab, spec, wClass } = this.state
    return (
      <Layout>
        <div className='raid'>
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
                  <option value=''>All</option>
                  {Object.keys(wowClass).map((key, index) => {
                    if (wowClass[key][spec]) {
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

          <div className="tabs">
            <ul>
              {debriefRaids.map((raids, index) => {
                return (
                  <li key={index} className={selectedTab === index ? 'is-active' : ''} onClick={() => this.setState({ selectedTab: index })}><a>{raids.instance}-{moment(raids._id).format('DD/MM/YYYY')}</a></li>
                )
              })}
              <li className={selectedTab === 'list' ? 'is-active' : ''} onClick={() => this.setState({ selectedTab: 'list' })}><a>BIS DB</a></li>
            </ul>
          </div>

          {debriefRaids.length > 0 && selectedTab !== 'list' && <div>
            <div className='content'>
              <h2 className='subtitle'>Buffs</h2>
              <DebriefBuffIssues spec={spec} wClass={wClass}/>
            </div>
            <div className='content'>
              <h2 className='subtitle'>Enchants</h2>
              <DebriefEnchantsIssues spec={spec} wClass={wClass}/>
            </div>
          </div>}
          {selectedTab === 'list' && <EnchantsList/>}

        </div>
      </Layout>
    )
  }
}

Debrief.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  debriefRaids: PropTypes.array
}
function mapStateToProps (state) {
  return {
    debriefRaids: state.debriefRaids
  }
}
export default connect(mapStateToProps)(Debrief)
