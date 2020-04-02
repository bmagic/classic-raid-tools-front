import React from 'react'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class User extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_USER' })
  }

  render () {
    if (this.props.user === null) return <div>Loading</div>
    return (
      <Layout>
        <h1 className='title'>Welcome {this.props.user.username}</h1>
        {JSON.stringify(this.props.user)}

      </Layout>
    )
  }
}

User.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(User)
