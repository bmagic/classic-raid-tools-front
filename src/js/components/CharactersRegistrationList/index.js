import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WowClassImage from '../WowClassImage'

class CharactersRegistrationList extends React.Component {
  componentDidMount () {
    console.log(this.props)

    this.props.dispatch({ type: 'GET_REGISTRATIONS', raidId: this.props.raidId })
  }

  render () {
    return (
      <div className='characters-registration-list'>
        <h2 className='subtitle'>Liste des inscrits</h2>
        {this.props.registrations.map((registration) => {
          return (
            <div key={registration._id} className='level'>

              <div className='level-left'>
                <div className='level-item'>
                  <figure className='image is-24x24'><WowClassImage keyClass={registration.class} keySpec={registration.spec}/></figure> {registration.name}
                </div>
              </div>
              <div className='level-right'>
                <div className='level-item'>
                  {registration.status}
                </div>
              </div>

            </div>
          )
        })}
      </div>

    )
  }
}
CharactersRegistrationList.propTypes = {
  dispatch: PropTypes.func,
  raidId: PropTypes.raidId,
  registrations: PropTypes.array
}

function mapStateToProps (state) {
  return {
    registrations: state.registrations
  }
}
export default connect(mapStateToProps)(CharactersRegistrationList)
