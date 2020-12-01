import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { wowClass } from '../../lib/wow'
const queryString = require('query-string')

class InstanceStatsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { spec: '', wClass: '' }
  }

  componentDidMount () {
    const hash = queryString.parse(location.hash)
    const wClass = hash.class || this.state.wClass
    const spec = hash.spec || this.state.spec

    this.setState({ spec: spec, wClass: wClass })
    this.props.dispatch({ type: 'GET_INSTANCE_STATS' })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const hash = queryString.stringify({ spec: this.state.spec, class: this.state.wClass })
    location.hash = hash
  }

  render () {
    const { instanceStats } = this.props
    const { spec, wClass } = this.state

    const wowRaids = ['naxxramas', 'aq40', 'bwl', 'mc', 'onyxia', 'aq20', 'zg']

    return (
      <div className='instance-stats-list'>
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

          <table className='table is-narrow is-fullwidth is-striped is-bordered'>
            <thead>
              <tr>
                <th/>
                <th>Total</th>
                {wowRaids.map((raid) => {
                  return <th key={raid} >{raid}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {instanceStats.map((data) => {
                if (data.characterId === undefined) return null
                if (data.stats === undefined) return null
                if (spec !== '' && data.characterId.spec !== spec) return null
                if (wClass !== '' && data.characterId.class !== wClass) return null
                return (
                  <tr key={data._id}>
                    <td>
                      {data.characterId.name}
                    </td>
                    <td>
                      {data.stats.all}
                    </td>
                    {wowRaids.map((raid) => {
                      if (data.stats[raid] === undefined) return (<td key={raid} >0</td>)
                      return (<td key={raid} >{data.stats[raid]}</td>)
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
InstanceStatsList.propTypes = {
  dispatch: PropTypes.func,
  instanceStats: PropTypes.array
}
function mapStateToProps (state) {
  return {
    instanceStats: state.instanceStats
  }
}
export default connect(mapStateToProps)(InstanceStatsList)
