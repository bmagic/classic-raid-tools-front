import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Error from '../Error'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <div className='crh-app site dark-mode'>
    <Header />

    <main className='site-content'>
      <div className='section'>
        <div className='container'>
          <Error />
          {children}
        </div>
      </div>
    </main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.any.isRequired
}

export default Layout
