import React from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import EnchantsAnalyzerDataIssues from '../../components/Enchants/EnchantsAnalyzerDataIssues'

class EnchantsAnalyzer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selectedTab: 0 }
  }

  componentDidMount () {
    this.props.dispatch({ type: 'GET_ENCHANTS_ANALYZER_RAIDS' })
  }

  render () {
    const { enchantsAnalyzerRaids } = this.props
    const { selectedTab } = this.state
    return (
      <Layout>
        <div className='raid'>
          <div className="tabs">
            <ul>
              {enchantsAnalyzerRaids.map((raids, index) => {
                return (
                  <li key={index} className={selectedTab === index ? 'is-active' : ''} onClick={() => this.setState({ selectedTab: index })}><a>{raids.instance}-{moment(raids._id).format('DD/MM/YYYY')}</a></li>
                )
              })}

            </ul>
          </div>

          {enchantsAnalyzerRaids.length > 0 && <EnchantsAnalyzerDataIssues instance={enchantsAnalyzerRaids[selectedTab].instance} date={enchantsAnalyzerRaids[selectedTab]._id}/>}

        </div>
      </Layout>
    )
  }
}

EnchantsAnalyzer.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
  enchantsAnalyzerRaids: PropTypes.array
}
function mapStateToProps (state) {
  return {
    enchantsAnalyzerRaids: state.enchantsAnalyzerRaids
  }
}
export default connect(mapStateToProps)(EnchantsAnalyzer)
