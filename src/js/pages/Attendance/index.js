import React from 'react'
import Layout from '../../components/Common/Layout'
import AttendanceList from '../../components/Attendance/AttendanceList'

class Attendance extends React.Component {
  render () {
    return (
      <Layout>
        <h1 className='title'>Présence / Buff</h1>
        <AttendanceList/>
      </Layout>
    )
  }
}

export default Attendance
