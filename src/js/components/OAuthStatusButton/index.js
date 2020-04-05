import React from 'react'
import PropTypes from 'prop-types'

const OAuthStatusButton = ({ service, id }) => {
  return (
    <div className='level'>
      <div className='level-left'>
        <div className='level-item'>
          {service === 'discord' && <i className="fab fa-discord"/> }
          {service === 'github' && <i className="fab fa-github"/> }
        </div>
        {id &&
          <div className='level-item'>
            <span>Connected</span>
          </div>
        }
        {id === undefined &&
          <div className='level-item'>
            Disconnected
          </div>
        }
      </div>
    </div>
  )
}
OAuthStatusButton.propTypes = {
  service: PropTypes.string,
  id: PropTypes.number
}

export default OAuthStatusButton
