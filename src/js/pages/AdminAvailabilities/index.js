import React, { Fragment } from 'react'
import Layout from '../../components/Common/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WowClassImage from '../../components/Common/WowClassImage'

class AdminAvailabilitites extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_AVAILABILITIES' })
  }

  render () {
    const { availabilities } = this.props
    if (availabilities === null) return <div>Loading</div>

    const count = {
      monday: { ok: 0, maybe: 0, ko: 0 },
      tuesday: { ok: 0, maybe: 0, ko: 0 },
      wednesday: { ok: 0, maybe: 0, ko: 0 },
      thursday: { ok: 0, maybe: 0, ko: 0 },
      friday: { ok: 0, maybe: 0, ko: 0 },
      saturday: { ok: 0, maybe: 0, ko: 0 },
      sunday: { ok: 0, maybe: 0, ko: 0 }
    }
    for (const availability of availabilities) {
      if (availability && availability.userId && availability.userId.roles && !(availability.userId.roles.includes('member') || availability.userId.roles.includes('apply') || availability.userId.roles.includes('casu'))) continue

      if (availability.monday === 'ok') count.monday.ok++
      if (availability.monday === 'maybe') count.monday.maybe++
      if (availability.monday === 'ko') count.monday.ko++

      if (availability.tuesday === 'ok') count.tuesday.ok++
      if (availability.tuesday === 'maybe') count.tuesday.maybe++
      if (availability.tuesday === 'ko') count.tuesday.ko++

      if (availability.wednesday === 'ok') count.wednesday.ok++
      if (availability.wednesday === 'maybe') count.wednesday.maybe++
      if (availability.wednesday === 'ko') count.wednesday.ko++

      if (availability.thursday === 'ok') count.thursday.ok++
      if (availability.thursday === 'maybe') count.thursday.maybe++
      if (availability.thursday === 'ko') count.thursday.ko++

      if (availability.friday === 'ok') count.friday.ok++
      if (availability.friday === 'maybe') count.friday.maybe++
      if (availability.friday === 'ko') count.friday.ko++

      if (availability.saturday === 'ok') count.saturday.ok++
      if (availability.saturday === 'maybe') count.saturday.maybe++
      if (availability.saturday === 'ko') count.saturday.ko++

      if (availability.sunday === 'ok') count.sunday.ok++
      if (availability.sunday === 'maybe') count.sunday.maybe++
      if (availability.sunday === 'ko') count.sunday.ko++
    }
    return (
      <Layout>
        <div className='admin-availabilitites'>
          <h1 className='title'>Disponibilités</h1>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Username</th>
                <th>Lundi</th>
                <th>Mardi</th>
                <th>Mercredi</th>
                <th>Jeudi</th>
                <th>Vendredi</th>
                <th>Samedi</th>
                <th>Dimanche</th>

              </tr>
            </thead>
            <tbody>
              {availabilities.map((availability) => {
                if (availability && !availability.userId) return null
                if (availability && availability.userId && availability.userId.roles && !(availability.userId.roles.includes('member') || availability.userId.roles.includes('apply') || availability.userId.roles.includes('casu'))) return null
                return (
                  <tr key={availability._id}>
                    <td>{availability.userId.username}</td>
                    <td>
                      {availability.monday === 'ok' && <i className='fas fa-check has-text-success'/> }
                      {availability.monday === 'maybe' && <i className='fas fa-check has-text-warning'/> }
                      {availability.monday === 'ko' && <i className='fas fa-check has-text-danger'/> }
                    </td>
                    <td>
                      {availability.tuesday === 'ok' && <i className='fas fa-check has-text-success'/> }
                      {availability.tuesday === 'maybe' && <i className='fas fa-check has-text-warning'/> }
                      {availability.tuesday === 'ko' && <i className='fas fa-check has-text-danger'/> }
                    </td>
                    <td>
                      {availability.wednesday === 'ok' && <i className='fas fa-check has-text-success'/> }
                      {availability.wednesday === 'maybe' && <i className='fas fa-check has-text-warning'/> }
                      {availability.wednesday === 'ko' && <i className='fas fa-check has-text-danger'/> }
                    </td>
                    <td>
                      {availability.thursday === 'ok' && <i className='fas fa-check has-text-success'/> }
                      {availability.thursday === 'maybe' && <i className='fas fa-check has-text-warning'/> }
                      {availability.thursday === 'ko' && <i className='fas fa-check has-text-danger'/> }
                    </td>
                    <td>
                      {availability.friday === 'ok' && <i className='fas fa-check has-text-success'/> }
                      {availability.friday === 'maybe' && <i className='fas fa-check has-text-warning'/> }
                      {availability.friday === 'ko' && <i className='fas fa-check has-text-danger'/> }
                    </td>
                    <td>
                      {availability.saturday === 'ok' && <i className='fas fa-check has-text-success'/> }
                      {availability.saturday === 'maybe' && <i className='fas fa-check has-text-warning'/> }
                      {availability.saturday === 'ko' && <i className='fas fa-check has-text-danger'/> }
                    </td>
                    <td>
                      {availability.sunday === 'ok' && <i className='fas fa-check has-text-success'/> }
                      {availability.sunday === 'maybe' && <i className='fas fa-check has-text-warning'/> }
                      {availability.sunday === 'ko' && <i className='fas fa-check has-text-danger'/> }
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{count.monday.ok}<i className='fas fa-check has-text-success'/>  {count.monday.maybe}<i className='fas fa-check has-text-warning'/>  {count.monday.ko}<i className='fas fa-check has-text-danger'/></th>
                <th>{count.tuesday.ok}<i className='fas fa-check has-text-success'/>  {count.tuesday.maybe}<i className='fas fa-check has-text-warning'/>  {count.tuesday.ko}<i className='fas fa-check has-text-danger'/></th>
                <th>{count.wednesday.ok}<i className='fas fa-check has-text-success'/>  {count.wednesday.maybe}<i className='fas fa-check has-text-warning'/>  {count.wednesday.ko}<i className='fas fa-check has-text-danger'/></th>
                <th>{count.thursday.ok}<i className='fas fa-check has-text-success'/>  {count.thursday.maybe}<i className='fas fa-check has-text-warning'/>  {count.thursday.ko}<i className='fas fa-check has-text-danger'/></th>
                <th>{count.friday.ok}<i className='fas fa-check has-text-success'/>  {count.friday.maybe}<i className='fas fa-check has-text-warning'/>  {count.friday.ko}<i className='fas fa-check has-text-danger'/></th>
                <th>{count.saturday.ok}<i className='fas fa-check has-text-success'/>  {count.saturday.maybe}<i className='fas fa-check has-text-warning'/>  {count.saturday.ko}<i className='fas fa-check has-text-danger'/></th>
                <th>{count.sunday.ok}<i className='fas fa-check has-text-success'/>  {count.sunday.maybe}<i className='fas fa-check has-text-warning'/>  {count.sunday.ko}<i className='fas fa-check has-text-danger'/></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Layout>
    )
  }
}

AdminAvailabilitites.propTypes = {
  dispatch: PropTypes.func,
  availabilities: PropTypes.array
}

function mapStateToProps (state) {
  return {
    availabilities: state.availabilities
  }
}
export default connect(mapStateToProps)(AdminAvailabilitites)
