import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Error from '../Error'

const Layout = ({ children, fullWith }) => (
  <div className='crh-app site dark-mode'>
    <Header />

    <main className='site-content'>
      <div className='section'>
        <div className={!fullWith ? 'container' : ''}>
          <Error />
          {children}
        </div>
      </div>
    </main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  fullWith: PropTypes.bool
}

export default Layout
