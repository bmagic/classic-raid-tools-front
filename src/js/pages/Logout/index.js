import React from 'react'
import Error from '../../components/Common/Error'
import LogoutButton from '../../components/Menu/LogoutButton'
const Logout = () =>

  <div className='hero is-fullheight'>
    <div className='hero-body'>
      <div className='column is-4 is-offset-4'>
        <Error/>
        <div className='box has-text-centered'>
          <LogoutButton/>
        </div>
      </div>
    </div>
  </div>

export default Logout
