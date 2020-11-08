import React from 'react'
import Item from '../../Common/Item'
import './styles.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import md5 from 'md5'
import Spell from '../../Common/Spell'

class ProfessionList extends React.Component {
  constructor (props) {
    super(props)
    this.tbody = React.createRef()
    this.state = { professionData: { list: [], characterNames: [] } }
  }

  componentDidMount () {
    this.setState({ professionData: this.props.professionData })
    this.props.dispatch({ type: 'GET_PROFESSION_DATA', profession: this.props.profession })
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.profession !== this.props.profession) {
      this.props.dispatch({ type: 'GET_PROFESSION_DATA', profession: this.props.profession })
    }

    if (md5(JSON.stringify(prevProps.professionData)) !== md5(JSON.stringify(this.props.professionData))) {
      this.setState({ professionData: this.props.professionData })
    }

    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { professionData } = this.state
    const { list, characterNames } = professionData

    return (
      <div className='professions-list'>
        <div className="table-container">

          <table className='table is-narrow is-fullwidth is-striped is-bordered'>
            <thead>
              <tr>
                <th/>
                {characterNames.map((characterName) => {
                  return <th key={characterName._id} title={`${characterName.count} recettes`}>{characterName._id}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {list.map((data) => {
                return (
                  <tr key={data._id}>
                    <td>
                      {this.props.profession !== 'enchanting' && <Item size='small' wid={data._id}/>}
                      {this.props.profession === 'enchanting' && <Spell size='small' wid={data._id}/>}
                    </td>
                    {characterNames.map((characterName) => {
                      if (data.characterNames.includes(characterName._id)) { return (<td key={characterName._id} className='has-background-success'/>) } else { return (<td key={characterName._id} className='has-background-danger'/>) }
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
ProfessionList.propTypes = {
  dispatch: PropTypes.func,
  profession: PropTypes.string,
  professionData: PropTypes.array
}
function mapStateToProps (state) {
  return {
    professionData: state.professionData
  }
}
export default connect(mapStateToProps)(ProfessionList)
